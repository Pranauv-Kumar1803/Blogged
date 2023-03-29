import { createStore, action, thunk, computed } from 'easy-peasy';
import { useNavigate } from 'react-router';
import { createBrowserHistory } from 'history';
import api from './api/instance'

export default createStore(
    {
        blogs: [],
        setBlogs: action((state, payload) => {
            state.blogs = payload;
        }),
        login: false,
        setLogin: action((state, payload) => {
            state.login = payload;
        }),
        userCred: [],
        setUserCred: action((state, payload) => {
            state.userCred = payload;
        }),
        userBlogs: [],
        setUserBlogs: action((state, payload) => {
            state.userBlogs = payload;
        }),
        searchBlogs:[],
        setSearchBlogs : action((state,payload)=>{
            state.searchBlogs = payload;
        }),
        handleLogin: thunk(async (actions, data, helpers) => {
            console.log(data);
            try {
                const res = await api.post('/login', data);
                // console.log(res.data);
                actions.setLogin(true)
                actions.setUserCred(res.data);
                alert('Login Successful');
            } catch (err) {
                console.log(err);
                if(err.response.status==404)
                {
                    alert('enter valid credentials');
                }
                else alert('some error occured');
            }
        }),
        handleRegister: thunk(async (actions, data, helpers) => {
            try {
                const res = await api.post('/register', data);
                alert('registration successful');
            } catch (err) {
                console.log(err);
                alert(err.data.message);

            }
        }),
        handleLogout: thunk(async (actions, data, helpers) => {
            try {
                const res = await api.post('/logout');
                actions.setLogin(false)
                actions.setUserCred([]);
                alert('logout successful');
            } catch (err) {
                console.log(err);
                alert('some error occured');
            }
        }),
        handlePost: thunk(async (actions, data, helpers) => {
            try {
                const { blogs,userCred } = helpers.getState();
                // console.log('in', blogs);
                data.idee = (blogs.length >= 1) ? blogs[blogs.length - 1].idee + 1 : 1;
                const d = new Date();
                data.dateTime = `${d.getFullYear()}/${d.getMonth()}/${d.getDay()} - ${d.getHours()}:${d.getMinutes()}`;
                data.editor = userCred.email;
                console.log(data);
                const res = await api.post('/blogs', data);
                const newBlogs = [...blogs, res.data];
                actions.setBlogs(newBlogs)
            } catch (err) {
                if (err) {
                    alert('please login/register first');
                }
            }
        }),
        handleDelete: thunk(async (actions, data, helpers) => {
            console.log(data);
            const id = data;
            const {blogs} = helpers.getState();
            console.log(blogs);
            try {
                console.log(`/blogs/${id}`)
                const res = await api.delete(`/blogs/${id}`);
                alert('delete successful');
                const d = blogs.filter((item,index)=>{
                    return item.idee!==id
                })
                actions.setBlogs(d);
            } catch (err) {
                alert('please login');
            }
        }),
        handleEdit: thunk(async (actions, data, helpers) => {
            const { blogs } = helpers.getState();
            console.log(data);
            const { id,title,body,image,tags } = data;
            try {
                const d = new Date();
                const res = await api.put(`/blogs/${id}`, {title:title,body:body,tags:tags,image:image,dateTime:`${d.getFullYear()}/${d.getMonth()}/${d.getDay()} - ${d.getHours()}:${d.getMinutes()}`});
                const data = blogs.map(blog => {
                    return (blog.idee == id) ? { ...res.data } : blog;
                })  
                actions.setBlogs(data);
                alert('edit successful');
            } catch (err) {
                alert('please login');
                console.log(err.message);
            }
        })
    })