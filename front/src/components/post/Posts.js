import {Link, useNavigate} from "react-router-dom";
import {instance} from "../../App";
import {useEffect, useState} from "react";
import {Post} from "./Post";
import Select from "@mui/material/Select";
import {MenuItem} from "@mui/material";



export const Posts = () => {
    const [posts, setPosts] = useState([])
    const [category, setCategory] = useState("Усі")
    const [categories, setCategories] = useState([])
    const navigation = useNavigate()
    const getPosts = () => {
        try {
            instance.get(`/posts/ready`).then(res => {
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
            instance.get(`/posts/ready/${category.Id}`).then(res => {
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
                <ul>
                    <li><Link to="/account">
                        Мій акаунт
                    </Link></li>
                    <li><Link to="/my-posts">
                        Мої пости
                    </Link></li>
                    <li>
                        <Link className="active" to="/posts">
                            Всі пости
                        </Link></li>
                    <li><Link to="/my-responses">
                        Мої відгуки
                    </Link>
                    </li>
                    <li>
                        <button className="signout-button" onClick={() => {
                            window.localStorage.setItem("token", "")
                            navigation('/login')
                        }
                        }>Вийти
                        </button>
                    </li>
                </ul>
            </nav>
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
                {category !== "Усі" ? <p>{category.Details}</p> : ""}
                {
                    posts ?
                        posts.map((p) => (
                            <Post key={p} post={p}/>)) : ""}
            </div>
        </div>
    )
}