import axios from "axios";
import React from "react";
import { Stack, TextField, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

function Login() {
    const handleLogin = useStoreActions((action) => action.handleLogin);

    const [info, setInfo] = useState({ name: '', pwd: '' });
    const navigate = useNavigate()

    function func(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInfo(prev => {
            return { ...prev, [name]: value };
        })
    }

    return (
        <Stack direction={'column'} justifyContent='center' alignItems={'center'} spacing={2}>
            <Grid container columns={1}>
                <Grid item md={2} xs={2} display='flex' flexDirection={'row'} alignItems='center' justifyContent={'center'}>
                    <h2 style={{ color: '#0A2647', textAlign: 'match-parent' }}>Enter your username and password to Login</h2>
                </Grid>
                <Grid item md={2} xs={2} display='flex' flexDirection={'row'} alignItems='center' justifyContent={'center'}>
                    <form onSubmit={async(e) => {
                        e.preventDefault();
                        await handleLogin(info);
                        await navigate('/')
                    }} style={{ backgroundColor: '#FCFFE7', color: '#000', width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '3%', borderRadius: '5px' }}>
                        <TextField id="outlined-basic" label='username' variant="outlined" onChange={func} name="name" type="text" value={info.name} style={{ width: '50%' }} />
                        <br />
                        <TextField id="outlined-basic" label='password' variant="outlined" onChange={func} name="pwd" type="password" value={info.pwd} style={{ width: '50%' }} />
                        <br />
                        <button type="submit" style={{ fontSize: 'large', cursor: 'pointer', backgroundColor: '#3C79F5', color: '#fff' }}>Submit</button>
                    </form>
                </Grid>

            </Grid>

        </Stack>
    )
}

export default Login;