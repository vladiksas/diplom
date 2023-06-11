import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import {instance} from "../../App"
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";


export const PostForm = () => {
        const navigation = useNavigate()
        const [error, setError] = useState("")
        const [title, setTitle] = useState()
        const [category, setCategory] = useState()
        const [text, setText] = useState()
        const [avatar, setAvatar] = useState("/postsAv/default.png")
        const inputFileRef = useRef(null);
        const [categories, setCategories] = useState([])

        const {handleSubmit} = useForm()

        const createPost = () => {
            try {
                instance.post('/post', {
                    title: title,
                    text: text,
                    category: category.Id,
                    avatar: avatar,
                }).then(res => {
                    navigation('/my-posts')
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

        const inputFile = async (event) => {
            try {
                const formData = new FormData();
                const file = event.target.files[0];
                formData.append("img", file);
                const {data} = await instance.post("/upload/post", formData)
                setAvatar(data.url)
            } catch
                (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                }
            }
        }

        const getCategories = () => {
            try {
                instance.get(`/categories`).then(res => {
                    setCategories(res.data)
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
            getCategories()
        }, [])

        return (
            <div>
                <div className="back-button-container">
                    <Link className="back-button" to="/my-posts">
                        🡨 Мої пости
                    </Link>
                </div>

                <div className="login-form-container">
                    <form onSubmit={handleSubmit(createPost)}>
                        <h3>Створіть пост</h3>
                        <div>
                            <p className="email-input">Заголовок</p>
                            <TextField
                                required
                                type="text"
                                placeholder="Введіть заголовок"
                                onChange={e => setTitle(e.target.value)}
                            />
                            <p className="email-input">Текст</p>
                            <TextField
                                required
                                type="text"
                                className="form-control mt-1"
                                placeholder="Введіть текст"
                                onChange={e => setText(e.target.value)}
                            />
                            <p className="email-input">Категорія</p>
                            <Select
                                required
                                type="text"
                                style={{width: "225px"}}
                                onChange={e => setCategory(e.target.value)}
                                placeholder="Оберіть категорію"
                            >
                                <MenuItem value={"Усі"}>{"Усі"} </MenuItem>
                                {categories ? categories.map((c) => (
                                    <MenuItem value={c}>{c.Name} </MenuItem>)) : ""}
                            </Select>
                            <input ref={inputFileRef} type="file" accept="image/*" onChange={inputFile} hidden/>
                            <div>
                                <img className="registration-avatar" src={`http://localhost:8080${avatar}`}
                                     style={{width: "100px", height: "100px", objectFit: "cover"}}/>
                            </div>
                            <div className="image-button-container">
                                <button type={"button"} onClick={() => inputFileRef.current.click()} className="submit-button">
                                    Завантажити фото
                                </button>
                            </div>
                            <div className="submit-button-container">
                                <button className="submit-button" type="submit">
                                    Відправити
                                </button>
                            </div>
                        </div>
                        <div style={{position: "absolute", textAlign: "center", color: "red"}}>
                            {error}
                        </div>
                    </form>
                </div>



                {/*<form onSubmit={handleSubmit(createPost)}>*/}
                {/*    <h3>Створіть пост</h3>*/}
                {/*    <div>*/}
                {/*        <label>Заголовок</label>*/}
                {/*        <TextField*/}
                {/*            required*/}
                {/*            type="text"*/}
                {/*            placeholder="Введіть заголовок"*/}
                {/*            onChange={e => setTitle(e.target.value)}*/}
                {/*        />*/}
                {/*        <div>*/}
                {/*            <label>Текст</label>*/}
                {/*            <TextField*/}
                {/*                required*/}
                {/*                type="text"*/}
                {/*                className="form-control mt-1"*/}
                {/*                placeholder="Введіть текст"*/}
                {/*                onChange={e => setText(e.target.value)}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <label>Категорія</label>*/}
                {/*        <Select*/}
                {/*            required*/}
                {/*            type="text"*/}
                {/*            style={{width: "225px"}}*/}
                {/*            onChange={e => setCategory(e.target.value)}*/}
                {/*            placeholder="Оберіть категорію"*/}
                {/*        >*/}
                {/*            <MenuItem value={"Усі"}>{"Усі"} </MenuItem>*/}
                {/*            {categories ? categories.map((c) => (*/}
                {/*                <MenuItem value={c.Id}>{c.Name} </MenuItem>)) : ""}*/}
                {/*        </Select>*/}
                {/*        <div>*/}
                {/*            <button type="button" onClick={() => inputFileRef.current.click()}>*/}
                {/*                Завантажити фото*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <input ref={inputFileRef} type="file" accept="image/*" onChange={inputFile} hidden/>*/}
                {/*        <div>*/}
                {/*            <img src={`http://localhost:8080${avatar}`}*/}
                {/*                 style={{width: "100px", height: "100px", objectFit: "cover"}}/>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <button type="submit">*/}
                {/*                Submit*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            {error}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</form>*/}
            </div>
        );
    }
;