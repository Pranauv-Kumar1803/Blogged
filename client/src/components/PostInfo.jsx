import React from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useStoreActions, useStoreState } from "easy-peasy";
import { Stack, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import parse from 'html-react-parser'
import { useEffect } from "react";
import { useState } from "react";
import api from '../api/instance'


function PostInfo(props) {
    const params = useParams();
    const nav = useNavigate();
    const blogs = useStoreState((state) => state.blogs);
    const setBlogs = useStoreActions((action) => action.setBlogs);
    const handleDelete = useStoreActions((action) => action.handleDelete);
    const [data, setData] = useState(null)

    useEffect(() => {
        console.log('hi')
        const fetchItems = async () => {
            try {
                const res = await api.get('/blogs');
                console.log(res.data);
                const d = res.data.filter((item, index) => {
                    return item.idee == params.id;
                })
                console.log(d)
                setData(d);
            } catch (err) {
                console.log(err);
            }
        }

        fetchItems();
    }, [])

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <Stack direction={'column'} spacing={2}>
            <Grid container spacing={2} columns={16} paddingLeft='10px'>
                <Grid item xs={16} sm={11}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-end',marginBottom:'50px' }}>
                        {
                            data ?
                                <>
                                    <article style={{ fontSize: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',backgroundColor:'#fff',margin:'40px',marginBottom:'50px',paddingTop:'20px',color:'#000',borderRadius:'10px' }}>
                                        <img src={data[0].mainImage} alt="" width={'80%'} />
                                        {parse(data[0].body)}
                                            <h1>Tags</h1>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',alignItems:'flex-start'}}>
                                            {data[0].tags.map(tag => {
                                                return (
                                                    <span style={{ padding: '10px', backgroundColor: 'red', color: '#fff', margin: '10px' }}>{tag}</span>
                                                )
                                            })}
                                        </div>
                                    </article>
                                </>
                                : null
                        }
                    </div>
                </Grid>
                <Grid item xs={16} sm={5} display='flex' flexDirection={'column'}  alignItems='flex-start' marginRight={0} marginTop='30px'>
                    {
                        data?
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#fff',color:'#000',margin:'10px 60px',marginRight:'100px',padding:'20px',width:'60%',borderRadius:'10px'}}>
                            <img src={data[0].img} width={'50%'} style={{borderRadius:'50%'}} alt="profilePic" />
                            <p>By : {data[0].editor}</p>
                            <p> Last Edited: {new Date(data[0].dateTime).toLocaleString()}</p>
                        </div>
                        :null
                    }
                </Grid>
            </Grid>
        </Stack>
    )
}

export default PostInfo;