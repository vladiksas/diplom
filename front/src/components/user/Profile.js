import {useEffect, useState} from "react";
import {instance} from "../../App";
import {Link, useNavigate} from "react-router-dom";

export const Profile = () => {
    const navigation = useNavigate()
    const [email, setEmail] = useState()
    const [firstName, setFirstName] = useState()
    const [phone, setPhone] = useState()
    const [lastName, setLastName] = useState()
    const [avatar, setAvatar] = useState()

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

    const onDelete = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                instance.delete("/user").then(res => {
                    window.localStorage.setItem("token", "")
                    navigation('/login')
                })
                    .catch(error => {
                        console.log(error.response.data.message);
                    })
            } catch
                (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                }
            }
        }
    }


    useEffect(() => {
        getUser()
    }, [])

    return (<div>
        <nav>
            <label htmlFor="check" className="checkbtn">
                <i className="fas fa-bars"></i>
            </label>
            <ul>
                <li><Link className="active" to="/account">
                    Мій акаунт
                </Link></li>
                <li><Link to="/my-posts">
                    Мої пости
                </Link></li>
                <li>
                    <Link to="/posts">
                        Всі пости
                    </Link></li>
                <li><Link to="/my-responses">
                    Мої відгуки
                </Link>
                </li>
                <li>
                    <button className="signout-button" onClick={() => {
                        window.localStorage.setItem("token", "")
                        navigation('/login')
                    }
                    }>Вийти
                    </button>
                </li>
            </ul>
        </nav>
        {avatar ?
            <div>
                <img className="profile-avatar" src={`http://localhost:8080${avatar}`}
                     style={{width: "150px", height: "150px", objectFit: "cover"}}/>
            </div> : ""}
        <div>
            <div className="profile-name-surname">
                <h3 style={{marginRight: "5px"}}>{firstName}</h3>
                <h3>{lastName}</h3>
            </div>
            <div className="profile-email-phone">
                <h3 className="profile-email">{email}</h3>
                <h3 className="profile-phone">{phone}</h3>
            </div>
        </div>
        <button className="update-account-button" onClick={() => {
            navigation('/account-update')
        }
        }>Редагувати дані акаунту
        </button>
        <button className="update-account-button" onClick={() => {
            navigation('/password-update')
        }
        }>Змінити пароль
        </button>
        <button className="delete-account-button" onClick={onDelete}
        >Видалити акаунт
        </button>
    </div>)
}