import React, { useState } from "react";
import Header from './Header'
import Footer from './Footer'
import About from './About'
import Contact from './Contact'
import NewPost from './NewPost';
import NewBlog from './NewBlog';
import PostInfo from './PostInfo';
import UserInfo from './UserInfo';
import EditPost from './EditPost';
import Navbar from './Navbar';
import Navbar1 from './Navbar1';
import Home from './Home';
import UserBlogs from './UserBlogs';
import Register from "./Register";
import DashBoard from "./DashBoard";
import Login from "./Login";
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStoreActions,useStoreState } from "easy-peasy";
import api from '../api/instance';

api.defaults.withCredentials=true;
function App() {
	const blogs = useStoreState((state)=>state.blogs);  
	const searchBlogs = useStoreState((state)=>state.searchBlogs);  
	const userCred = useStoreState((state)=>state.userCred);  
	const setBlogs = useStoreActions((action)=>action.setBlogs)
	const setUserCred = useStoreActions((action)=>action.setUserCred)
	const setLogin = useStoreActions((action)=>action.setLogin)

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const res = await api.get('/blogs');
				console.log(res);
				setBlogs(res.data);
			} catch (err) {
				console.log(err);
			}
		}

		fetchItems();
	}, [])

	useEffect(()=>{
		console.log(blogs);
	},[blogs])

	useEffect(()=>{
		console.log(searchBlogs);
	},[searchBlogs])

	useEffect(()=>{
		const f = async()=>{
			try {
				const res = await api.get('/isAuth');
				console.log(res.data);
				setUserCred(res.data);
				setLogin(true);
			} catch (err) {	
				console.log('some error occured');
			}
		}
		f();
	},[])

	return (
		<div className="font-link">
			<Navbar1 />
			<Routes>
				<Route path="/" element={<Home blogs={ (searchBlogs.length==blogs.length || searchBlogs.length==0)? blogs : searchBlogs} />}></Route>
				<Route path="/your-blogs" element={<UserBlogs blogs={blogs} />}></Route>
				<Route path="/about" element={<About />}></Route>
				<Route path="/contact" element={<Contact />}></Route>
				<Route path="/edit/:id" element={<EditPost blogs={blogs} />}></Route>
				<Route path="/blogs/:id/user" element={<UserInfo blogs={blogs} />}></Route>
				<Route path="/blogs/:id/all" element={<PostInfo blogs={blogs} />}></Route>
				<Route path="/new" element={<NewBlog/>}></Route>
				<Route path="/login" element={<Login/>}></Route>
				<Route path="/register" element={<Register/>}></Route>
				<Route path="/dashboard" element={<DashBoard/>}></Route>

			</Routes>
			<Footer />
		</div>
	);
}

export default App;
