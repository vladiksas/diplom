import {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom"
import {instance} from "../../App"
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";


export const PostUpdate = () => {
        const navigation = useNavigate()
        const {id} = useParams()
        const [error, setError] = useState("")
        const [title, setTitle] = useState()
        const [category, setCategory] = useState()
        const [text, setText] = useState()
        const [avatar, setAvatar] = useState("/postsAv/default.png")
        const [categories, setCategories] = useState([])
        const [categoryChange, setCategoryChange] = useState(false)
        const {handleSubmit} = useForm()

        const updatePost = () => {
            try {
                instance.put(`/post/${id}`, {
                    title: title,
                    text: text,
                    category: category,
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

        const getPost = () => {
            try {
                instance.get(`/post/${id}`).then(res => {
                    setTitle(res.data.Title)
                    setAvatar(res.data.Avatar)
                    setText(res.data.Text)
                    setCategory(res.data.CategoryId)
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
            getPost()
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
                    <form onSubmit={handleSubmit(updatePost)}>
                        <h3>Змінити пост</h3>
                        <p className="email-input">Заголовок</p>
                        <TextField
                            required
                            type="text"
                            value={title}
                            placeholder="Введіть заголовок"
                            onChange={e => setTitle(e.target.value)}
                        />
                        <p className="password-input">Текст</p>
                        <TextField
                            required
                            type="text"
                            value={text}
                            className="form-control mt-1"
                            placeholder="Введіть текст"
                            onChange={e => setText(e.target.value)}
                        />
                        <p className="password-input">Категорія</p>
                        {!categoryChange && categories.length !== 0 && category ?
                            <h3> {categories[category - 1].Name}</h3> :
                            <div>
                                <div>
                                    <Select
                                        required
                                        type="text"
                                        style={{width: "225px"}}
                                        onChange={e => setCategory(e.target.value)}
                                        placeholder="Оберіть категорію"
                                    >
                                        <MenuItem value={"Усі"}>{"Усі"} </MenuItem>
                                        {categories ? categories.map((c) => (
                                            <MenuItem value={c.Id}>{c.Name} </MenuItem>)) : ""}
                                    </Select>
                                </div>
                            </div>}
                        {!categoryChange ?
                            <div className="submit-button-container">
                            <button className="submit-button" onClick={() => {
                                setCategoryChange(true)
                            }} type="button">
                                Змінити категорію
                            </button> </div>: ""}
                        <div className="submit-button-container">
                            <button className="submit-button" type="submit">
                                Змінити дані
                            </button>
                        </div>
                        <div>
                            {error}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
;