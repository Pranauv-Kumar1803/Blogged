import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStoreActions,useStoreState } from 'easy-peasy';
import api from '../api/instance'

const drawerWidth = 240;

const Navbar = (props) => {
    const blogs = useStoreState((state)=>state.blogs);
    const user = useStoreState((state)=>state.userCred);
    const login = useStoreState((state)=>state.login);
    const setUser = useStoreActions((action)=>action.setUserCred);
    const setLogin = useStoreActions((action)=>action.setLogin);
    const nav = useNavigate();

    const [mobileOpen,setMobileOpen] = useState(false)

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

    const navItemsLogOut = [
        { name: 'All Blogs', to: "/", action: () => { } },
        { name: 'About Us', to: "/about", action: () => { } },
        { name: 'Contact Us', to: "/contact", action: () => { } },
        { name: 'Pricing', to: "/pricing", action: () => { } },
        { name: 'Register', to: "/register", action: () => { } },
        { name: 'Login', to: "/login", action: () => { } }
    ];
    const navItemsLogIn = [
        { name: 'All Blogs', to: "/", action: () => { } },
        { name: 'About Us', to: "/about", action: () => { } },
        { name: 'Contact Us', to: "/contact", action: () => { } },
        { name: 'Pricing', to: "/pricing", action: () => { } },
        { name: "DashBoard", to: "/dashboard" , action: () => { } },
        { name: "Logout", to: "", action: handleLogout }
    ];
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>Blogged</NavLink>
            </Typography>
            <Divider />
            <List>
                {login === true ? navItemsLogIn.map((item) => (
                    <NavLink key={item.name} to={item.to} style={{ textDecoration: "none" }}>
                        <ListItem disablePadding onClick={item.action}>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>))
                    :
                    navItemsLogOut.map((item) => (
                        <NavLink key={item.name} to={item.to} style={{ textDecoration: "none" }}>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    ))}
            </List>
            {/* <TextField variant='outlined' onChange={(e)=>handleSearch(e)} label='Search'></TextField> */}
        </Box>
    );

    const container =  undefined;

    return (
        <nav>
            <AppBar component="nav" style={{ position: "static", backgroundColor: "#3C79F5" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>Blogged</NavLink>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {login === true ? navItemsLogIn.map((item) => (
                            <NavLink key={item.name} to={item.to} style={{ textDecoration: "none" }}>
                                <Button className='font-link' sx={{ color: '#fff' }} onClick={item.action}>
                                    {item.name}
                                </Button>
                            </NavLink>
                        )) : navItemsLogOut.map((item) => (
                            <NavLink key={item.name} to={item.to} style={{ textDecoration: "none" }}>
                                <Button className='font-link' sx={{ color: '#fff' }}>
                                    {item.name}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                    {/* <TextField variant='outlined' onChange={(e)=>handleSearch(e)} style={{backgroundColor:'#fff'}} label='Search' color='secondary'></TextField> */}
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    className='font-link'
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,backgroundColor:"#000" },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </nav>
    )
}


export default Navbar;