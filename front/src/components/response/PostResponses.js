import {Link, useParams} from "react-router-dom";
import {instance} from "../../App";
import {useEffect, useState} from "react";
import {Response} from "./Response";
import {MyPost} from "../post/MyPost";


export const PostResponses = (props) => {
    const [post, setPost] = useState()
    const [responses, setResponses] = useState([])
    const {id} = useParams()

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
    const getPost = () => {
        try {
            instance.get(`/post/${id}`).then(res => {
                setPost(res.data)
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
        getPost()
    }, [])

    useEffect(() => {
        if (post) {
            getResponses()
            console.log(responses)
        }
    }, [post])


    return (<>
            {post && responses ?
                <div>
                    <div className="back-button-container">
                        <Link className="back-button" to="/my-posts">
                            🡨 Мої пости
                        </Link>
                    </div>
                    <div className="feed">
                        <MyPost key={post.PostId} post={post}/>
                        {
                            responses ?
                                responses.map((r) => (
                                    <Response key={r.ResponseId} response={r}
                                    />
                                )) : ""}
                    </div>
                </div> : ""}
        </>
    )
}