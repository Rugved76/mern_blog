import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { url } from './Blogs';
import { useNavigate } from "react-router-dom";
import { Avatar } from '@mui/material';
import gif from './giphy.gif';

export const Profile = () => {

	const userId = localStorage.getItem("userId");
	const [userdata, setUserdata] = useState();
	const id = useParams().id;

	const fetchProfile = async () => {
		try {
			const res = await axios.get(`${url}/api/blog/user/${userId}`);
			const data = res.data;
			console.log(data)
			return data;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
	const navigate = useNavigate();
	useEffect(() => {
		fetchProfile().then((data) => {
			setUserdata(data.user);
		});
	}, [id]);


	return (userdata) ? (
		<>
			<div className="profileuser">
				{userdata && (
					<ul>
						<Avatar
							onClick={fetchProfile}
							id='profilepic'
							sx={{ bgcolor: "white", color: "#030303", cursor: 'pointer', margin: '2px auto' }}
							aria-label="recipe"
						>
							{userdata.name.charAt(0)}
						</Avatar>
						<hr />
						<li>Name : {userdata.name} </li>
						<li>EmailID : {userdata.email}</li>
						<li>User Id : <small>{userdata._id}</small></li>
						<li> Posts : {userdata.blogs.length}</li>
						<li>Role : User</li>
					</ul>
				)}
			</div>
		</>
	) : (
		<img className="loading" src={gif} alt="Loading..." />
	);
}

