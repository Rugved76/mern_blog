import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { CircularProgress } from "@mui/material";


export const url = `https://blogbackend-ievj.onrender.com`
// export const url = `http://localhost:5001`

const Blogs = () => {

    const [blogs, setBlogs] = useState();
    const [profile, setProfile] = useState(false);
    const [card, setCard] = useState('')

    const sendRequest = async () => {
        try {
            const res = await axios.get(`${url}/api/blog`);
            const data = res.data;
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {
        sendRequest().then((data) => {
            setBlogs(data.blogs)
        });
    }, []);

    return (blogs) ? (
        <div style={{ marginTop: '80px' }} id="grid" >
            {blogs.map((blog) => (
                // {blogs.slice().sort((a, b) => b.createdAt - a.createdAt).map((blog, index) => (
                <Blog
                    id={blog._id}
                    className="post"
                    style={{ backgroundColor: 'lightgray', padding: '10px' }} // Example styles
                    isUser={localStorage.getItem("userId") === blog.user._id}
                    title={blog.title}
                    description={blog.description}
                    imageURL={blog.image}
                    userName={blog.user.name}
                    email={blog.user.email}
                    creator={blog.user._id}
                    blogcount={blog.user.blogs}
                    role={blog.user.role}
                    onLike={blog.likeCount}
                />
            ))}
        </div>
    ) : (
        <CircularProgress className="loading" />
    )
};

export default Blogs;
