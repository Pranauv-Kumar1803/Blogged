import React from "react";
import { Stack, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from "react";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DoneIcon from '@mui/icons-material/Done';
import Button from "@mui/material/Button";
import api from '../api/instance'
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useStoreActions,useStoreState } from "easy-peasy";
import { useEffect } from "react";

const ConvertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}

function Dashboard() {

    const user = useStoreState((state)=>state.userCred);
    const setUser = useStoreActions((action)=>action.setUserCred);

    const nav = useNavigate();

    const [x, setX] = useState(false);
    const [images, setImages] = useState(user.profile || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOaaBAY_yOcJXbL4jW0I_Y5sePbzagqN2aA&usqp=CAU');
    const [info, setInfo] = useState({ name: user.name, email: user.email });
    const [image,setImage] = useState(images);
    const [display,setDisplay] = useState(info);

    useEffect(()=>{
        console.log(user);
    },[])
    
    useEffect(()=>{
        async function func()
        {
            try {
                const res = await api.get(`user-details/${user.email}`);
                // console.log(res.data);
                setImage(images);
                setUser({name:res.data.name,email:res.data.email,profile:res.data.profilePic});
            } catch (err) {
                alert(err.data.message);
                nav('/dashboard');
            }
        }
        async function func1()
        {
            try {
                const res = await api.get(`isAuth`);
                setUser(res.data);
            } catch (err) {
                alert(err.data.message);
                nav('/dashboard');
            }
        }
        
        if(user.email) func();
        else
        {
            func1();
            func();
        }
    },[])
 

    // console.log(user)

    async function handleFile(e) {
        if (e.target.files) {
            const file = e.target.files[0];
            const base64 = await ConvertToBase64(file);
            setImages(base64);
        }
        setX(true);
    }

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInfo(prev => {
            return { ...prev, [name]: value };
        })
    }

    async function handleUpdate()
    {
        console.log(info,images);
        try {
            const obj = {info:info,images:images,email:user.email}
            const res = await api.post('/update-profile',(obj));
            setDisplay(info);
            setX(false);
            setUser({name:info.name,email:info.email,profile:images});
            setImage(images);
            nav('/dashboard');
        } catch (err) {
            alert(err.data.message);
            nav('/dashboard');
        }
    }

    return (
        <Stack direction={'column'} spacing={2}>
            <Grid container spacing={2} columns={12} paddingLeft='10px'>
                <Grid item xs={12} sm={4}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>Update Your Profile</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <h3>Change Your Profile Picture</h3>
                                <label style={{ cursor: "pointer" }}>
                                    <Stack style={{ height: "90px", width: "90px", border: "2px solid black" }} justifyContent="center" alignItems="center">
                                        {
                                            x ?
                                                <DoneIcon />
                                                :
                                                <CameraAltIcon />
                                        }
                                    </Stack>
                                    <input type="file" onChange={(e) => { handleFile(e) }} style={{ display: "none" }}></input>
                                </label>
                                <h3>Change Your Name or Email</h3>
                                <TextField type={"text"} label='Name' name="name" onChange={handleChange} value={info.name} color="info"></TextField>
                                <br />
                                <TextField type={"text"} label='Email' name="email" onChange={handleChange} value={info.email} color="info"></TextField>
                                <br />
                                <Button variant="contained" onClick={handleUpdate} >Submit</Button>
                            </form>
                        </div>

                    </div>
                </Grid>
                <Grid item xs={12} sm={8} justifyContent={'center'} alignItems='center'>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>Profile</h1>
                        <div style={{ margin: '20px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column   ' }}>
                            <img style={{ borderRadius: '50%',width:'200px',height:'100px' }} src={user.profile} alt="" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'right', alignItems: 'center' }}>
                        <Typography variant="h5" whiteSpace={2}>Name : {display.name}</Typography>
                        <Typography variant="h5">Email : {display.email}</Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'right', alignItems: 'center' }}>
                        <h2>Click To View Your Blogs</h2>
                        <Link to='/your-blogs' style={{textDecoration:'none'}}>
                            <Button variant="contained">Your Blogs</Button>
                        </Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'right', alignItems: 'center' }}>
                        <h2>Click To Create Your Blogs</h2>
                        <Link to='/new' style={{textDecoration:'none'}}>
                            <Button variant="contained">Create Blog</Button>
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default Dashboard;