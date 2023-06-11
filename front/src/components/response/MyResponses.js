import {Link, useNavigate} from "react-router-dom";
import {instance} from "../../App";
import {useEffect, useState} from "react";
import {PostMain} from "../post/PostMain";
import {MyResponse} from "./MyResponse";


export const MyResponses = () => {
    const [responses, setResponses] = useState([])
    const [author, setAuthor] = useState()
    const navigation = useNavigate()
    const getResponses = () => {
        try {
            instance.get(`/responses`).then(res => {
                setResponses(res.data)
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


    useEffect(() => {
        getResponses()
    }, [])

    return (
        <div>
            <nav>
                <label htmlFor="check" className="checkbtn">
                    <i className="fas fa-bars"></i>
                </label>
                <ul>
                    <li><Link to="/account">
                        Мій акаунт
                    </Link></li>
                    <li><Link to="/my-posts">
                        Мої пости
                    </Link></li>
                    <li>
                        <Link to="/posts">
                            Всі пости
                        </Link></li>
                    <li><Link className="active" to="/my-responses">
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
            <div style={{marginTop: "100px"}} className="feed">
                {
                    responses ?
                        responses.map((r) => (
                            <MyResponse key={r.ResponseId} response={Object.entries(r).slice(0, 6)}
                                        post={Object.entries(r).slice(6, r.length)}/>
                        )) : ""}
            </div>
        </div>
    )
}