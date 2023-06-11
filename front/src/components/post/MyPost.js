import {instance} from "../../App";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


export const MyPost = (props) => {
    const post = props.post
    const navigation = useNavigate()
    const date = new Date(post.Date)
    const [responses, setResponses] = useState([])
    const deletePost = () => {
        if (window.confirm("Ви точно хочете видалити цей пост?")) {
            try {
                instance.delete(`/post/${post.PostId}`).then(() => {window.location.reload()}).catch(error => {
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

    const getResponses = () => {
        try {
            instance.get(`/responses/${post.PostId}`).then(res => {
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
        console.log(post)
    }, [])


    return (
        <div>
            <div className="post-container">
                <div>
                    <div className="post-category">
                        <h3>{post.Name}</h3>
                    </div>
                    <img className="author-avatar" src={`http://localhost:8080${post.Avatar}`}
                         style={{width: "60px", height: "60px", objectFit: "cover"}} alt={"Фото користувача"}/>
                    <h3 className="post-date">{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</h3>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <h3 style={{float: "none", marginBottom: "5px"}} className="post-title">{post.Title}</h3>
                    <h3 className="post-text">{post.Text}</h3>
                </div>
                {
                    responses.length !== 0 ?  <button className="see-responses-button" onClick={() => {navigation(`/post-responses/${post.PostId}`)}}>
                        Подивитись відгуки
                    </button> : ""
                }
                <button style={{float: "left"}} className="see-responses-button" onClick={() => {navigation(`/post-edit/${post.PostId}`)}}>
                    Редагувати
                </button>
                <button className="delete-post-button" onClick={deletePost}>Видалити</button>
            </div>
        </div>

    )
}