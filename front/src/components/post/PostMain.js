import {instance} from "../../App";


export const PostMain = (props) => {
    const post = props.post
    const date = new Date(post.Date)


    return (
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
        </div>
    )
}