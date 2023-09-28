import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { url } from './Blogs';
import CircularProgress from '@mui/material/CircularProgress';

const monthNumberToName = {
	1: "January",
	2: "February",
	3: "March",
	4: "April",
	5: "May",
	6: "June",
	7: "July",
	8: "August",
	9: "September",
	10: "October",
	11: "November",
	12: "December"
};


export const Singlepage = () => {

	const [blog, setBlog] = useState(null);
	const id = useParams().id;

	const fetchDetails = async () => {
		try {
			const res = await axios.get(`${url}/api/blog/${id}`);
			const data = res.data;
			console.log(data)
			return data;
		} catch (err) {
			console.log(err);
			throw err; // Re-throwing the error to let the caller handle it
		}
	};

	useEffect(() => {
		fetchDetails().then((data) => {
			setBlog(data.blog);
		});
	}, [id]);

	if (blog) {
		// var month = monthNumberToName[{blog.createdAt.slice(5,7)}]
		var month = parseInt(blog.createdAt.slice(5, 7))
	}

	return blog ? (
		<>
			{blog && (
				<div id='singlepage'>
					<div id='innerpage' style={{ margin: '0 2rem' }}>
						<h1 style={{ letterSpacing: '1px' }}>{blog.title}</h1>
						<hr style={{ marginBottom: '.75rem' }} />
						<img
							style={{ marginBottom: '0.75rem', borderRadius: '5px' }}
							src={blog.image}
							alt="Blog Cover"
						/>
						<hr style={{ marginBottom: '.75rem', color: 'black' }} />
						<p style={{ marginBottom: '.75rem' }}>{blog.description}</p>
						<hr style={{ marginBottom: '.75rem' }} />
						<h5 style={{ marginBottom: '.75rem' }}>
						{monthNumberToName[month]} {blog.createdAt.slice(8, 10)}, {blog.createdAt.slice(0, 4)}
						</h5>
					</div>
				</div>
			)}
		</>
	) : (
		<CircularProgress className='loading' />
	);

}
