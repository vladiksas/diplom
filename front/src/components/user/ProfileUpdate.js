import {useRef, useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom"
import {instance} from "../../App"
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";


export const ProfileUpdate = () => {
        const navigation = useNavigate()
        const [error, setError] = useState("")
        const [email, setEmail] = useState()
        const [firstName, setFirstName] = useState()
        const [phone, setPhone] = useState()
        const [lastName, setLastName] = useState()
        const [avatar, setAvatar] = useState()
        const inputFileRef = useRef(null);

        const {handleSubmit} = useForm()

        const updateProfile = () => {
            try {
                instance.put('/user', {
                    email: email,
                    phone: phone,
                    avatar: avatar,
                    firstName: firstName,
                    lastName: lastName
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

        useEffect(() => {
            getUser()
        }, [])

        const getUser = () => {
            try {
                instance.get(`/user`).then(res => {
                    setEmail(res.data.Email)
                    setAvatar(res.data.Avatar)
                    setPhone(res.data.Phone)
                    setFirstName(res.data.FirstName)
                    setLastName(res.data.LastName)
                }).catch(error => {
                    console.log(error.response.data.message);
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
                    <form onSubmit={handleSubmit(updateProfile)}>
                        <h3>Змінити дані акаунта</h3>
                        <div>
                            <p className="email-input">Пошта</p>
                            <TextField
                                required
                                type="email"
                                value={email}
                                placeholder="Введіть пошту"
                                onChange={e => setEmail(e.target.value)}
                            />
                            <p className="password-input">Ім'я</p>
                            <TextField
                                required
                                type="text"
                                value={firstName}
                                placeholder="Введіть ім'я"
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <p className="password-input">Прізвище</p>
                            <TextField
                                required
                                type="text"
                                value={lastName}
                                placeholder="Введіть прізвище"
                                onChange={e => setLastName(e.target.value)}
                            />
                            <p className="password-input">Телефон</p>
                            <TextField
                                required
                                type="text"
                                value={phone}
                                placeholder="Введіть телефон"
                                onChange={e => setPhone(e.target.value)}
                            />
                            <input ref={inputFileRef} type="file" accept="image/*" onChange={inputFile} hidden/>
                            <div>
                                <img className="registration-avatar" src={`http://localhost:8080${avatar}`}
                                     style={{width: "100px", height: "100px", objectFit: "cover"}}/>
                            </div>
                            <div className="image-button-container">
                                <button onClick={() => inputFileRef.current.click()} className="submit-button">
                                    Завантажити фото
                                </button>
                            </div>
                            <div className="submit-button-container">
                                <button className="submit-button" type="submit">
                                    Змінити дані
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