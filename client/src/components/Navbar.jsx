import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from "../api/instance";
import { useStoreState,useStoreActions } from "easy-peasy";

function Nav()
{
    const user = useStoreState((state)=>state.userCred);
    const login = useStoreState((state)=>state.login);
    const setUser = useStoreActions((action)=>action.setUserCred);
    const setLogin = useStoreActions((action)=>action.setLogin);
    const nav = useNavigate();

    const handleLogout = async()=>
    {
        try {
            const res = await api.get('/logout');
            setUser([]);
            setLogin(false);
            alert('logout successful');
            nav('/')
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        console.log(login);
    },[login])

    return (
        <nav style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignContent:'center',backgroundColor:'#FF8787'}}>
            <h1>Navbar</h1>
            {(login)?
                <ul style={{listStyleType:'none',display:'flex',flexDirection:'row',justifyContent:'space-between',alignContent:'center'}}>
                    <li> <Link to="/" style={{listStyleType:'none',fontSize:'large',color:'black',textDecoration:'none',marginRight:'20px'}}>Home</Link> </li>
                    <li> <Link to="/about" style={{listStyleType:'none',fontSize:'large',color:'black',textDecoration:'none',marginRight:'20px'}}>About</Link> </li>
                    <li> <Link to="/new" style={{listStyleType:'none',fontSize:'large',color:'black',textDecoration:'none',marginRight:'15px'}}>New Post</Link> </li>
                    <li> <button onClick={()=>handleLogout()} style={{listStyleType:'none',fontSize:'17px',color:'black',textDecoration:'none',marginRight:'15px',backgroundColor:'transparent',borderColor:'transparent',cursor:'pointer'}}>Logout</button> </li>
                </ul>
                :
                <ul style={{listStyleType:'none',display:'flex',flexDirection:'row',justifyContent:'space-between',alignContent:'center'}}>
                    <li> <Link to="/" style={{listStyleType:'none',fontSize:'large',color:'black',textDecoration:'none',marginRight:'20px'}}>Home</Link> </li>
                    <li> <Link to="/about" style={{listStyleType:'none',fontSize:'large',color:'black',textDecoration:'none',marginRight:'20px'}}>About</Link> </li>
                    <li> <Link to="/new" style={{listStyleType:'none',fontSize:'large',color:'black',textDecoration:'none',marginRight:'15px'}}>New Post</Link> </li>
                    <li> <Link to="/register" style={{listStyleType:'none',fontSize:'large',color:'black',textDecoration:'none',marginRight:'15px'}}>Register</Link> </li>
                    <li> <Link to="/login" style={{listStyleType:'none',fontSize:'large',color:'black',textDecoration:'none',marginRight:'15px'}}>Login</Link> </li>
                </ul>
            }
        </nav>
    )
}

export default Nav;
