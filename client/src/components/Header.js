import React, { useState } from "react";
import {
    AppBar,
    Avatar,
    Typography,
    Toolbar,
    Box,
    Button,
    Tabs,
    Tab,
    Alert
} from "@mui/material";

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useStyles } from "./utils";
import axios from "axios";
import { url } from "./Blogs";

const Header = ({ username }) => {
    const classes = useStyles();
    const dispath = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [user, setUser] = useState('');
    const [id, setid] = useState('logoutbutton')

    const userId = localStorage.getItem("userId");

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${url}/api/blog/user/${userId}`);
            const data = res.data;
            setUser(data.user.name)
            return data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    if (isLoggedIn) {
        fetchProfile();
    }

    const [value, setValue] = useState();

    return (
        <AppBar
            // position="sticky"
            sx={{
                // background: '#1a1a1b',
                color:'#d02330',
                background: '#fdee6f',
                // background:'black',
                // background: '#ff142d',
                position: 'fixed',  // fixed and sticky is key
                top: 0,
                left: 0,
                marginBottom: '20px',
                // boxShadow: '0px 0px 8px white',
                // width: '98%',
                margin: 'auto auto',
                // borderRadius: '5px',
                // marginTop: '7px'
            }}
        >
            <Toolbar>
                <Typography className={classes.font} variant="h4">
                    {/* <a id="logo" href="" style={{ color: '#551a8b' }}>Blogsy</a> */}
                    <h3 style={{ letterSpacing: '1px' }} id="logo">Blogsy</h3>
                    {/* <h3 style="letter-spacing: 1px; ">Blogsy</h3> */}
                </Typography>
                {isLoggedIn && (
                    <Box display="flex" marginLeft={"auto"} marginRight="auto">
                        <Tabs
                            textColor="white"
                            value={value}
                            onChange={(e, val) => setValue(val)}
                        >
                            <Tab
                                style={{ textTransform: 'capitalize' }}
                                LinkComponent={Link}
                                to="/blogs"
                                label="All Blogs"
                            />
                            <Tab
                                style={{ textTransform: 'capitalize' }}
                                LinkComponent={Link}
                                to="/myBlogs"
                                label="My Blogs"
                            />
                            <Tab
                                style={{ textTransform: 'capitalize' }}
                                LinkComponent={Link}
                                to="/blogs/add"
                                label="Add"
                            />
                        </Tabs>
                    </Box>
                )}
                <Box display="flex" marginLeft="auto">
                    {!isLoggedIn && (
                        <>
                            {" "}
                            <Button
                                LinkComponent={Link}
                                to="/auth"
                                variant="contained"
                                sx={{ margin: 1, borderRadius: 10, backgroundColor: '#1976d2' }}
                                color="warning"
                            >
                                <LoginRoundedIcon />
                            </Button>
                            <Button
                                LinkComponent={Link}
                                to="/auth"
                                variant="contained"
                                sx={{ margin: 1, borderRadius: 10, backgroundColor: '#1976d2' }}
                                color="warning"
                            >
                                Signup
                            </Button>
                        </>
                    )}
                    {isLoggedIn && (

                        <div className="profile">
                            <Link style={{textDecoration:'none'}} to={`/blogs/user/${userId}`}>
                                <Avatar onClick={() => { setid('dontshowlogout') }} id='profilepic' style={{ color: '#1a1a1b', width: '35px', height: '35px', cursor: 'pointer' }}>
                                    {user.charAt(0)}
                                </Avatar></Link>
                            <Button
                                id={id}
                                onClick={() => dispath(authActions.logout())}
                                LinkComponent={Link}
                                to="/auth"
                                variant="contained"
                                sx={{ margin: 1, borderRadius: 24, backgroundColor: '#white', boxShadow: '2px 2px 3px black' }}
                            >
                                <LogoutRoundedIcon className="logout" />
                            </Button>
                            {/* <Alert onClose={() => {}}>This is a success alert — check it out!</Alert> */}
                        </div>
                    )}
                </Box>
            </Toolbar>
        </AppBar >
    );
};

export default Header;
