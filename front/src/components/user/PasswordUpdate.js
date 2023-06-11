import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import {instance} from "../../App"
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";


export const PasswordUpdate = () => {
        const navigation = useNavigate()
        const [error, setError] = useState("")
        const [password, setPassword] = useState()

        const {handleSubmit} = useForm()

        const updatePassword = () => {
            try {
                instance.patch('/user', {
                    password: password,
                }).then(res => {
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
                <div className="back-button-container">
                    <Link className="back-button" to="/account">
                        🡨 Мій акаунт
                    </Link>
                </div>
                <div className="login-form-container">
                    <form onSubmit={handleSubmit(updatePassword)}>
                        <h3>Змінити пароль</h3>
                        <div>
                            <p className="password-input">Новий пароль</p>
                            <TextField
                                required
                                type="password"
                                placeholder="*********"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="submit-button-container">
                                <button className="submit-button" type="submit">
                                    Змінити
                                </button>
                            </div>
                            <div>
                                {error}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
;