import {instance} from "../../App";
import {Link, useNavigate} from "react-router-dom";
import {PostMain} from "../post/PostMain";
import {useEffect, useState} from "react";


export const Response = (props) => {

    const response = props.response
    const date = new Date(response.ResponseDate)


    const answerResponse = () => {
        try {
            instance.patch(`/response/${response.ResponseId}`).then(() => {
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


    return (<>
            <div className="response-container">
                <div>
                    <div className="type-container">
                        <h3 className="type">{response.Type === "helping" ? "Надання допомоги" : "Прохання допомоги"}</h3>
                    </div>
                    <img className="author-avatar" src={`http://localhost:8080${response.Avatar}`}
                         style={{width: "70px", height: "70px", objectFit: "cover"}} alt={"Фото користувача"}/>
                    <h3 style={{float: "left"}} className="author-name">{response.FirstName}</h3>
                    <h3 className="author-surname">{response.LastName}</h3>
                    <h3 className="post-date"> {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</h3>
                    <h3 className="post-date"> {response.Email}</h3>
                    <h3 className="post-date"> {response.Phone}</h3>
                </div>
                <br/>
                <div style={{marginTop: "10px"}}>
                    <h3 className="post-text"> {response.ResponseText}</h3>
                </div>
                {response.Status === "unaccepted" ?
                    <button className="want-help-button" onClick={answerResponse}>Надати свої контакти</button> : ""}
            </div>
        </>
    )
}