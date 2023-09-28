import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { url } from "./Blogs";
import { CircularProgress } from "@mui/material";

const UserBlogs = () => {
    const [user, setUser] = useState();
    const id = localStorage.getItem("userId");

    const sendRequest = async () => {
        const res = await axios.get(`${url}/api/blog/user/${id}`).catch((err) => {
            console.log(err)
        });
        const data = await res.data;
        return data;
    };

    useEffect(() => {
        sendRequest().then((data) => {
            setUser(data.user)
        });
    }, []);


    return (user && user.blogs) ? (
        <div style={{marginTop:'80px'}} id="grid">
            {
                user.blogs.map((blog, index) => (
                    <Blog
                        id={blog._id}
                        key={index}
                        isUser={true}
                        title={blog.title}
                        description={blog.description}
                        imageURL={blog.image}
                        userName={user.name}
                    />
                ))}
        </div>
    ) : (
        <CircularProgress className="loading"/>
    )
};

export default UserBlogs;
