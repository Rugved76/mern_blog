import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";
import { url } from "./Blogs";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";

const Blog = ({ title, description, imageURL, userName, isUser, id, email, creator, blogcount, role, onLike }) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(false);
    const [card, setCard] = useState('');
    const userId = localStorage.getItem("userId");
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const handleEdit = () => {
        navigate(`/myBlogs/${id}`);
    };

    const handleback = () => {
        navigate('/myBlogs');
    }

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${url}/api/blog/user/${userId}`);
            const data = res.data;
            setProfile(!profile);
            setCard('invisible');
            console.log(data);
            return data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };  //hello

    const deleteRequest = async () => {
        try {
            const res = await axios.delete(`${url}/api/blog/${id}`);
            const data = await res.data;
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        await deleteRequest();
        navigate('/');
        navigate("/blogs");
    };

    const handleLike = async () => {
        try {
            console.log("Request URL:", `${url}/api/blog/like/${id}`);
            console.log("Request Data:", { userId });
            const res = await axios.post(`${url}/api/blog/like/${id}`, { userId });
            const data = res.data;
            setIsLiked(data.isLiked);
            setLikeCount(data.likeCount);
        } catch (error) {
            console.log("Error:", error);
        }
    };


    useEffect(() => {
        // Update like count initially when component mounts
        setLikeCount(onLike);
    }, [onLike]);

    return (!profile) ? (
        <Card className={card}
            id="card"
            sx={{
                width: "90%",
                maxHeight: '25rem',
                height: '80%',
                margin: "10px",
                padding: 2,
                backgroundColor: 'wheat',
                // backgroundColor: 'peach',
                ":hover": {
                    transition: '0.3s ease-in-out',
                    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
                },
            }}
        >

            {isUser && (
                <Box>
                    <IconButton onClick={handleEdit} sx={{
                        border: '.5px solid wheat', ":hover": {
                            borderRadius: '50%',
                            border: '.5px solid #1976d2',
                            transition: '0.3s ease-in-out'
                        }
                    }}>
                        <ModeEditOutlineIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={handleDelete} sx={{
                        border: '.5px solid wheat', ":hover": {
                            borderRadius: '50%',
                            border: '.5px solid #d32f2f',
                            transition: '0.3s ease-in-out'
                        }
                    }}>
                        <DeleteForeverRoundedIcon color="error" />
                    </IconButton>
                </Box>
            )}

            <CardHeader
                avatar={
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <Avatar
                            onClick={fetchProfile}
                            className={classes.font}
                            sx={{ bgcolor: "#bdbdbd", color: '#2c323e', cursor: 'pointer',width: '32px', height: '32px'}}
                            aria-label="recipe"
                        >
                            {userName ? userName.charAt(0) : "X"}
                        </Avatar>
                        <button onClick={fetchProfile} className="avatarname"><h3 style={{color:'#2c323e'}}>{userName}</h3></button>
                        <button  className="likebutton" onClick={handleLike} disabled={isLiked} style={{cursor:'pointer'}}>
                            {isLiked ? <FavoriteRounded sx={{ color: "#e94d5b" }}></FavoriteRounded> :
                                <FavoriteRounded sx={{ color: '#2c323e' }}></FavoriteRounded>}<span style={{ color: '#2c323e' }}>{likeCount}</span>
                        </button>
                    </div>
                }
                // title={title}
                style={{ fontWeight: 'bolder', fontSize: '20px', color: '#2c323e' }}
            />

            <Link style={{ textDecoration: 'none' }} to={`/blogs/${id}`}>
                <CardMedia
                    component="img"
                    image={imageURL}
                    alt="Paella dish"
                    style={{ borderRadius: '5px', width: '50%', height: 'auto', backgroundSize: 'contain', margin: '0px auto', imageRendering: 'auto',color:'#2c323e'}}
                />

                <CardContent>
                    <hr />
                    <br />
                    <Typography
                        className={classes.font}
                        variant="body2"
                        color="#2c323e"
                    >
                        <h3>{title}</h3>
                        <small>Read more ...</small>
                    </Typography>
                </CardContent>
            </Link>
            
        </Card>

    ) : (
        <div className="userinfo">
            <ul>
                <li><Avatar
                    onClick={fetchProfile}
                    className={classes.font}
                    sx={{ bgcolor: "red", cursor: 'pointer', margin: '2px auto' }}
                    aria-label="recipe"
                >
                    {userName ? userName.charAt(0) : "X"}
                </Avatar></li>
                <li>Name : {userName}</li>
                <li>EmailID : {email}</li>
                <li>User Id : {creator}</li>
                {blogcount.length && <li>Posts : {blogcount.length}</li>}
                <li>Role : User</li>
            </ul>

            <button style={{ marginTop: '5px' }} onClick={handleback}><ArrowBackRoundedIcon color="primary" /></button>
        </div>
    )
};

export default Blog;
