import {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom"
import {instance} from "../../App"
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";


export const ResponseForm = () => {
        const navigation = useNavigate()
        const [error, setError] = useState("")
        const [text, setText] = useState()
        const {type, id} = useParams()


        const {handleSubmit} = useForm()

        const createResponse = () => {
            try {
                instance.post('/response', {
                    text: text,
                    type: type,
                    post: id
                }).then(res => {
                    navigation('/posts')
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
                    <Link className="back-button" to="/posts">
                        🡨 Всі пости
                    </Link>
                </div>

                <div className="login-form-container">
                    <form onSubmit={handleSubmit(createResponse)}>
                        <h3>Створіть відгук</h3>
                        <div>
                            <p className="email-input">Текст</p>
                            <TextField
                                required
                                type="text"
                                placeholder="Введіть текст"
                                onChange={e => setText(e.target.value)}
                            />
                            <div className="submit-button-container">
                                <button className="submit-button" type="submit">
                                    Відправити
                                </button>
                            </div>
                            <div>
                                {error}
                            </div>
                        </div>
                    </form>
                </div>

                {/*<form onSubmit={handleSubmit(createResponse)}>*/}
                {/*    <h3>Створіть відгук</h3>*/}
                {/*    <div>*/}
                {/*        <label>Текст</label>*/}
                {/*        <TextField*/}
                {/*            required*/}
                {/*            type="text"*/}
                {/*            placeholder="Введіть текст"*/}
                {/*            onChange={e => setText(e.target.value)}*/}
                {/*        />*/}
                {/*        <button type="submit">*/}
                {/*            Submit*/}
                {/*        </button>*/}
                {/*        <div>*/}
                {/*            {error}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</form>*/}
            </div>
        );
    }
;