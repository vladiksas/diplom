import {Link} from "react-router-dom";
import {instance} from "../../App";
import {useEffect, useState} from "react";
import {PostMain} from "./PostMain";
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";


export const Main = () => {
    const [posts, setPosts] = useState([])
    const [category, setCategory] = useState("Усі")
    const [categories, setCategories] = useState([])
    const getPosts = () => {
        try {
            instance.get(`/posts`).then(res => {
                setPosts(res.data)
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

    const getCategoryPosts = () => {
        try {
            instance.get(`/posts/${category.Id}`).then(res => {
                setPosts(res.data)
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

    useEffect(() => {
        if (category !== "Усі") {
            getCategoryPosts()
        } else {
            getPosts()
        }
    }, [category])

    return (
        <div>
            <nav>
                <label htmlFor="check" className="checkbtn">
                    <i className="fas fa-bars"></i>
                </label>
                <label className="logo">Volunteeers</label>
                <ul>
                    <li><Link to="/" className="active" href="/">Головна</Link></li>
                    <li><Link to="/login">
                        Увійти
                    </Link></li>
                    <li><Link to="/registration">
                        Зареєструватись
                    </Link></li>
                </ul>
            </nav>
            <div className="description">
                <h6>Шукаєте волонтерську допомогу або хочете допомогти? Обирайте категорію та дивіться пости від волонтерів!</h6>
            </div>
            <div className="feed">
                <p className="choose-category">Оберіть категорію:</p>
                <div className="wrap">
                    <div className="select">
                        <Select
                            required
                            type="text"
                            onChange={e => setCategory(e.target.value)}
                            className="select-text"
                            placeholder="Оберіть категорію"
                        >
                            <MenuItem value={"Усі"}>{"Усі"} </MenuItem>
                            {categories ? categories.map((c) => (
                                <MenuItem value={c}>{c.Name} </MenuItem>)) : ""}
                        </Select>
                    </div>
                </div>
                {
                    category !== "Усі" ? <p>{category.Details}</p> : ""
                }
                {
                    posts ?
                        posts.map((p) => (
                            <PostMain key={p} post={p}/>)) : ""
                }
            </div>
        </div>
    )
}