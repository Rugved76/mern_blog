import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useStyles } from "./utils";
import { url } from "./Blogs";


const AddBlog = () => {

    // const classes = useStyles();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        imageURL: "",
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async () => {
        try {
            const res = await axios.post(`${url}/api/blog/add`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.imageURL,
                user: localStorage.getItem("userId"),
            })
            const data = await res.data;
            return data;
        } catch (err) {
            console.log(err)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then((data) => {
            console.log(data)
        }).then(() => navigate("/blogs"));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    borderRadius={2}
                    boxShadow='rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'
                    padding={3}
                    margin={"auto"}
                    marginTop={15}
                    display="flex"
                    backgroundColor='white'
                    flexDirection={"column"}
                    width={"80%"}
                >
                    <Typography variant="h2" padding={3} textAlign="center" style={{ color: '#1976d2' }}>
                        Create
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
                    <TextField
                        margin="normal"
                        // className={classes.font}
                        required
                        value={inputs.imageURL}
                        onChange={handleChange}
                        fullWidth
                        label="Image URL"
                        name="imageURL"
                        autoComplete="description"
                        autoFocus
                    />
                    <Button
                        sx={{ mt: 2, borderRadius: 4, width: 100, backgroundColor: '#1976d2' }}
                        variant="contained"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default AddBlog;
