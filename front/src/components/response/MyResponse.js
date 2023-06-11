import {instance} from "../../App";
import {Link, useNavigate} from "react-router-dom";
import {PostMain} from "../post/PostMain";
import {useEffect, useState} from "react";


export const MyResponse = (props) => {
    const [post, setPost] = useState()
    const [response, setResponse] = useState()
    const navigation = useNavigate()
    const [user, setUser] = useState()
    const [date, setDate] = useState()

    const deleteResponse = () => {
        if (window.confirm("Are you sure you want to delete this response?")) {
            try {
                instance.delete(`/response/${response.ResponseId}`).then(() => {
                    window.location.reload()
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
    }

    const getUser = () => {
        try {
            instance.get(`/user/${response.Author}`).then(res => {
                setUser(res.data)
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
        let p = {}
        props.post.forEach(i => p[i[0]] = i[1])
        setPost(p)
        let r = {}
        props.response.forEach(i => r[i[0]] = i[1]);
        setResponse(r)
        setDate(new Date(r.ResponseDate))
    }, [])


    useEffect(() => {
        if (response) {
            if (response.Status === "accepted") {
                getUser()
            }
        }
    }, [response])


    return (<>
            {response && post ?
                <div>
                    <PostMain key={post.PostId} post={post}/>
                    <div className="response-container">
                        <div className="type-container">
                            <h3 className="type">{response.Type === "helping" ? "Надання допомоги" : "Прохання допомоги"}</h3>
                        </div>
                        <h3 className="post-date"> {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</h3>
                        <div style={{marginTop: "10px"}}>
                            <h3 className="post-text"> {response.ResponseText}</h3>
                        </div>
                        {user ?
                            <>

                                <img className="author-avatar" src={`http://localhost:8080${user.Avatar}`}
                                     style={{width: "70px", height: "70px", marginTop: "15px", objectFit: "cover", borderRadius: "100%"}}/>
                                <h3 style={{marginTop: "15px"}} className="author-name">{user.FirstName}</h3>
                                <h3 className="author-surname">{user.LastName}</h3>
                                <h3 className="post-date">{user.Email}</h3>
                                <h3 className="post-date">{user.Phone}</h3>
                            </> : ""}

                        <button className="edit-response-button" onClick={() => {
                            navigation(`/response-edit/${response.ResponseId}`)
                        }}>
                            Редагувати відгук
                        </button>
                        <button className="delete-post-button" onClick={deleteResponse}>Видалити відгук</button>
                    </div>
                </div> : ""}
        </>
    )
}