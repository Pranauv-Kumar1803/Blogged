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
                // console.log(res.data);
                const d = res.data.filter((item, index) => {
                    console.log(item)
                    return item.idee == params.id;
                })
                console.log(d)
                setData(d);
            } catch (err) {
                console.log(err);
            }
        }

        fetchItems();
    },[])

    useEffect(() => {
        console.log(data);
    }, [data])

    const handleDel = async()=>{
        console.log(data[0].idee);
        await handleDelete(data[0].idee);
        await nav('/your-blogs')
    }

    return (
        <Stack direction={'row'} spacing={2} marginBottom={25}>
            <Container maxWidth='md' style={{ backgroundColor: 'inherit', color: '#000' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        data ?
                        <>
                            <header>
                                <h1>{data[0].title}</h1>
                                <p>By : {data[0].editor}</p>
                                <p>{new Date(data[0].dateTime).toLocaleString()}</p>
                            </header>

                            <article style={{ fontSize: '20px',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={data[0].mainImage} alt="" width={'50%'} />
                                {parse(data[0].body)}
                            </article>

                            <Button variant="contained" color="warning" onClick={ () => {handleDel()}}>Delete Post</Button>
                            <Link to={`/edit/${data[0].idee}`}>
                                <Button variant="contained" color="info" >Edit Post</Button>
                            </Link>
                        </>
                            : null
                    }
                </div>
            </Container>

        </Stack>
    )
}

export default PostInfo;