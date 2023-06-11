import {instance} from "../../App";
import {useNavigate} from "react-router-dom";


export const Post = (props) => {
    const navigation = useNavigate()
    const post = props.post
    const date = new Date(post.Date)


    return (
        <div>
            <div className="post-container">
                <div>
                    <div className="post-category">
                        <h3>{post.Name}</h3>
                    </div>
                    <img className="author-avatar" src={`http://localhost:8080${post.Avatar}`}
                         style={{width: "60px", height: "60px", objectFit: "cover"}} alt={"Фото користувача"}/>
                    <h3 className="author-name">{post.FirstName}</h3>
                    <h3 className="author-surname">{post.LastName}</h3>
                    <h3 className="post-date">{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</h3>
                </div>
                <br/>
                <br/>
                <div>
                    <h3 style={{float: "none", marginBottom: "5px"}} className="post-title">{post.Title}</h3>
                    <h3 className="post-text">{post.Text}</h3>
                </div>
                <button className="want-help-button" onClick={() => {navigation(`/response-create/${post.PostId}/helping`)}}>
                    Хочу допомогти
                </button>
                <button className="want-help-button" onClick={() => {navigation(`/response-create/${post.PostId}/needing`)}}>
                    Потребую допомоги
                </button>
            </div>

        </div>
    )
}