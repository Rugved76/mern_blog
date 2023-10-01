import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { url } from "./Blogs";
import Alert from '@mui/material/Alert';

const Auth = () => {
    const navigate = useNavigate();
    const dispath = useDispatch();

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [isSignup, setIsSignup] = useState(false);
    const [err, setErr] = useState(false);
    const [msg,setmsg] = useState('');

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async (type = "login") => {
        try {
            const res = await axios.post(`${url}/api/user/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
            });
            setErr(false);
            setmsg('');
            const data = res.data;
            console.log(data);
            return data;
        } catch (error) {
            console.error("An error occurred:", error);
            setErr(true);
            setmsg('Wrong email or password!')
            // Handle the error or show an appropriate message to the user
            return null; // or throw the error again if needed
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);

        try {
            const data = await sendRequest(isSignup ? "signup" : undefined);
            if (data) {
                localStorage.setItem("userId", data.user._id);
                dispath(authActions.login());
                navigate("/blogs"); // Assuming this was a typo and you meant `navigate`
                setErr(false);
                setmsg('');
            } else {
                console.log(`Data not available for some reason!`)
                setmsg('Email already exists!')
                setErr(true);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setmsg('Wrong email or password!')
            setErr(true);
        }
    };

    return (

        <div id="formbox">
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={300}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                    // boxShadow="10px 10px 10px black"
                    boxShadow='rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'
                    // boxShadow= 'rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px'
                    padding={2}
                    margin="auto"
                    marginTop={11}
                    borderRadius={2}
                    backgroundColor='wheat'
                >
                    <Typography variant="h2" padding={3} textAlign="center" style={{ color: '#1976d2' }}>
                        {isSignup ? "Sign In" : "Login"}
                    </Typography>
                    {isSignup && (
                        <TextField
                            margin="normal"
                            required
                            value={inputs.name}
                            onChange={handleChange}
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                    )}{" "}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        type="email"
                        autoFocus
                        onChange={handleChange}
                        value={inputs.email}
                    />
                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={inputs.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={() => setIsSignup(!isSignup)}
                        sx={{ borderRadius: 3, marginTop: 3, textTransform: 'none' }}
                    >
                        {/* Change To {isSignup ? "Login" : "Signup"} */}
                        {isSignup ? "Log in" : "Don't have an account? Signup"}

                    </Button>
                </Box>
            </form>
            {err && (
                <Alert style={{ width: '50%', margin: '5px auto', color: 'red' }} severity="error">{msg}</Alert>
            )}
        </div>
    );
};

export default Auth;
