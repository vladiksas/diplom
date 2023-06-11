import {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom"
import {instance} from "../../App"
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";


export const ResponseUpdate = () => {
        const {id} = useParams()
        const navigation = useNavigate()
        const [error, setError] = useState("")
        const [text, setText] = useState()



        const {handleSubmit} = useForm()

        const updateResponse = () => {
            try {
                instance.put(`/response/${id}`, {
                    text: text,
                }).then(res => {
                    navigation('/my-responses')
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


    const getResponse = () => {
        try {
            instance.get(`/response/${id}`).then(res => {
                setText(res.data.Text)
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
        getResponse()
    }, [])

    return (
            <div>
                <div className="back-button-container">
                    <Link className="back-button" to="/my-responses">
                        🡨 Мої відгуки
                    </Link>
                </div>

                <div className="login-form-container">
                    <form onSubmit={handleSubmit(updateResponse)}>
                        <h3>Відредагуйте відгук</h3>
                        <div>
                            <p className="email-input">Текст</p>
                            <TextField
                                required
                                type="text"
                                value={text}
                                placeholder="Введіть текст"
                                onChange={e => setText(e.target.value)}
                            />
                            <div className="submit-button-container">
                                <button className="submit-button" type="submit">
                                    Відредагувати
                                </button>
                            </div>
                            <div>
                                {error}
                            </div>
                        </div>
                    </form>
                </div>

                {/*<form onSubmit={handleSubmit(updateResponse)}>*/}
                {/*    <h3>Відредгуйте відгук</h3>*/}
                {/*    <div>*/}
                {/*        <label>Текст</label>*/}
                {/*        <TextField*/}
                {/*            required*/}
                {/*            type="text"*/}
                {/*            value={text}*/}
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