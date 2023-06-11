import {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import {instance} from "../../App"
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";


export const Registration = () => {
        const navigation = useNavigate()
        const [error, setError] = useState("")
        const [email, setEmail] = useState()
        const [password, setPassword] = useState()
        const [firstName, setFirstName] = useState()
        const [phone, setPhone] = useState()
        const [lastName, setLastName] = useState()
        const [avatar, setAvatar] = useState("/usersAv/default.png")
        const inputFileRef = useRef(null);

        const {handleSubmit} = useForm()

        const signUp = () => {
            try {
                instance.post('/user/register', {
                    email: email,
                    password: password,
                    phone: phone,
                    avatar: avatar,
                    firstName: firstName,
                    lastName: lastName
                }).then(res => {
                    window.localStorage.setItem("token", res.data.token)
                    navigation('/login')
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

    const inputFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append("img", file);
            const {data} = await instance.post("/upload/user", formData)
            setAvatar(data.url)
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
                        <li><Link to="/login">
                            Увійти
                        </Link></li>
                        <li><Link className="active" to="/registration">
                            Зареєструватись
                        </Link></li>
                    </ul>
                </nav>
                <div className="login-form-container">
                    <form onSubmit={handleSubmit(signUp)}>
                        <h3>Створіть акаунт</h3>
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
                                className="form-control mt-1"
                                placeholder="*********"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <p className="password-input">Ім'я</p>
                            <TextField
                                required
                                type="text"
                                className="form-control mt-1"
                                placeholder="Введіть ім'я"
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <p className="password-input">Прізвище</p>
                            <TextField
                                required
                                type="text"
                                placeholder="Введіть прізвище"
                                onChange={e => setLastName(e.target.value)}
                            />
                            <p className="password-input">Телефон</p>
                            <TextField
                                required
                                type="text"
                                placeholder="0XXXXXXXXX"
                                onChange={e => setPhone(e.target.value)}
                            />
                            <div >
                                <img className="registration-avatar" src={`http://localhost:8080${avatar}`}
                                     style={{ width: "100px", height: "100px", objectFit: "cover"}}/>
                            </div>
                            <div className="image-button-container">
                                <button className="submit-button" type="submit" onClick={() => inputFileRef.current.click()}>
                                    Завантажити фото
                                </button>
                            </div>
                            <input ref={inputFileRef} type="file" accept="image/*" onChange={inputFile} hidden/>
                            <div className="submit-button-container">
                                <button className="submit-button" type="submit">
                                    Зареєструватись
                                </button>
                            </div>
                            <div>
                                {error}
                            </div>
                            <p> Вже маєте акаунт? <Link
                                to={"/login"}> Увійдіть </Link></p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
;