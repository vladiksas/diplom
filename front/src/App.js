import './App.css';

import {Routes, Route} from 'react-router-dom';
import axios from "axios"
import {Main} from "./components/post/Main";
import {Login} from "./components/user/Login";
import {Registration} from "./components/user/Registration";
import {Profile} from "./components/user/Profile";
import {ProfileUpdate} from "./components/user/ProfileUpdate";
import {PasswordUpdate} from "./components/user/PasswordUpdate";
import {MyPosts} from "./components/post/MyPosts";
import {PostForm} from "./components/post/PostForm";
import {PostUpdate} from "./components/post/PostUpdate";
import {Posts} from "./components/post/Posts";
import {ResponseForm} from "./components/response/ResponseFrom";
import {MyResponses} from "./components/response/MyResponses";
import {ResponseUpdate} from "./components/response/ResponseUpdate";
import {PostResponses} from "./components/response/PostResponses";

export const instance = axios.create({
    baseURL: "http://localhost:8080"
});

instance.interceptors.request.use(function (config) {
    const token = window.localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});


function App() {

    return (<Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route
            path="/account"
            element={<Profile/>}
        />
        <Route
            path="/account-update"
            element={<ProfileUpdate/>}
        />
        <Route
            path="/password-update"
            element={<PasswordUpdate/>}
        />
        <Route
            path="/my-posts"
            element={<MyPosts/>}
        />
        <Route
            path="/post-create"
            element={<PostForm/>}
        />
        <Route
            path="/response-create/:id/:type"
            element={<ResponseForm/>}
        />
        <Route
            path="/post-edit/:id"
            element={<PostUpdate/>}
        />
        <Route
            path="/posts"
            element={<Posts/>}
        />
        <Route
            path="/post-responses/:id"
            element={<PostResponses/>}
        />
        <Route
            path="/my-responses"
            element={<MyResponses/>}
        />
        <Route
            path="/response-edit/:id"
            element={<ResponseUpdate/>}
        />

    </Routes>);
}

export default App;