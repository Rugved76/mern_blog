import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "./Blogs";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {

    const navigate = useNavigate();
    const [blog, setBlog] = useState();
    const id = useParams().id;

    console.log(id);

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const fetchDetails = async () => {
        const res = await axios.get(`${url}/api/blog/${id}`)
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };

    useEffect(() => {
        fetchDetails().then((data) => {
            setBlog(data.blog);
            setInputs({
                title: data.blog.title,
                description: data.blog.description,
            });
        });
    }, [id]);

    const sendRequest = async () => {
        const res = await axios.put(`${url}/api/blog/update/${id}`, {
            title: inputs.title,
            description: inputs.description,
        })
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    };
    console.log(blog);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then((data) => console.log(data))
            .then(() => navigate("/myBlogs/"));
    };

    return (
        <div>
            {inputs && (
                <form onSubmit={handleSubmit}>
                    <Box
                        // border={3}
                        backgroundColor='white'
                        // borderColor="black"
                        borderRadius={2}
                        // boxShadow="10px 10px 10px black"
                        boxShadow='rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'
                        padding={3}
                        margin={"auto"}
                        marginTop={15}
                        display="flex"
                        flexDirection={"column"}
                        width={"80%"}
                    >
                        <Typography variant="h2" padding={3} textAlign="center" style={{ color: '#1976d2' }}>
                            Edit
                        </Typography>
                        
                        <TextField
                            margin="normal"
                            // className={classes.font}
                            required
                            value={inputs.title}
                            onChange={handleChange}
                            fullWidth
                            label="Title"
                            name="title"
                            autoComplete="name"
                            autoFocus
                        />
                        
                        <TextField
                            margin="normal"
                            // className={classes.font}
                            required
                            value={inputs.description}
                            onChange={handleChange}
                            fullWidth
                            label="Description"
                            name="description"
                            autoComplete="description"
                            autoFocus
                        />
                        <Button
                            sx={{ mt: 2, borderRadius: 4, width: 100, backgroundColor: 'black' }}
                            variant="contained"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            )}
        </div>
    );
};

export default BlogDetail;
