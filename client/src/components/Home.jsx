import React, { useState } from "react";
import Feed from './Feed';
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Stack, Grid, TextField } from '@mui/material';
import { Button } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import BasicModal from "./Modal";

import api from '../api/instance'

function Home(props) {

	const blogs = useStoreState((state) => state.blogs);
	const setSearchBlogs = useStoreActions((action) => action.setSearchBlogs);
	const nav = useNavigate();
	const [num, setNum] = useState(3);

	const handleSearch = async (e) => {
		const val = e.target.value;
		const searchBlogs = blogs.filter((item, index) => {
			// console.log(item);
			if (item.title.toLowerCase().includes(val.toLowerCase())) {
				return item;
			}
		})

		console.log(searchBlogs);

		setSearchBlogs(searchBlogs);
	}

	const handleMore = async (e) => {
		setNum(num + 3);
	}

	const handleTags = async (e) => {

	}

	return (

		<Stack direction={'column'} justifyContent='center' alignItems={'center'} spacing={2} marginTop={'30px'}>

			<div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
				<TextField variant='outlined' onChange={(e) => handleSearch(e)} style={{ backgroundColor: '#fff' }} label='Search for blogs' color='secondary'></TextField>
				<div>
					<BasicModal blogs={props.blogs} setSearchBlogs={setSearchBlogs} handleTags={handleTags}></BasicModal>
				</div>
			</div>
			<div style={{ textAlign: 'center', marginBottom: '100px', maxWidth: '100%', width: '100%' }}>
				<h1 style={{color:'#fff'}}>Blogs</h1>
				{(props.blogs.length)
					? <Feed blogs={props.blogs} number={num} type='all' />
					: <p>No Posts to display</p>}
				<Button variant='contained' onClick={(e) => handleMore(e)}>Load More</Button>
			</div>

		</Stack>


	);
}

export default Home;
