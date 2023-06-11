import {useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import {instance} from "../../App"
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";


export const Login = () => {
        const navigation = useNavigate()
        const [error, setError] = useState("")
        const [email, setEmail] = useState()
        const [password, setPassword] = useState()

        const {handleSubmit} = useForm()

        const login = () => {
            try {
                instance.post('/user/login', {
                    email: email,
                    password: password
                }).then(res => {
                    window.localStorage.setItem("token", res.data.token)
                    navigation('/account')
                }).catch(error => {
                    if (error.response.status === 422) {
                        const msg = error.response.data[0];
                        setError(msg.msg);
                    } else {
                        setError(error.response.data.message);
                    }
                })
            } catch
                (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                }
            }
        }


        return (
            <div>
                <nav>
                    <label htmlFor="check" className="checkbtn">
                        <i className="fas fa-bars"></i>
                    </label>
                    <label className="logo">Volunteeers</label>
                    <ul>
                        <li><Link to="/">Головна</Link></li>
                        <li><Link className="active" to="/login">
                            Увійти
                        </Link></li>
                        <li><Link to="/registration">
                            Зареєструватись
                        </Link></li>
                    </ul>
                </nav>
                <div className="login-form-container">
                    <form onSubmit={handleSubmit(login)}>
                        <h3>Увійдіть в акаунт</h3>
                        <div>
                            <p className="email-input">Пошта</p>
                            <TextField
                                required
                                type="email"
                                placeholder="example@gmail.com"
                                onChange={e => setEmail(e.target.value)}
                            />
                            <p className="password-input">Пароль</p>
                            <TextField
                                required
                                type="password"
                                placeholder="*********"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="submit-button-container">
                                <button className="submit-button" type="submit">
                                    Увійти
                                </button>
                            </div>
                            <div>
                                {error}
                            </div>
                            <p> Немає акаунту? <Link
                                to={"/registration"}> Зареєструйтесь </Link></p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
;