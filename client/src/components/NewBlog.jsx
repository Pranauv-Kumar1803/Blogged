import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useStoreActions,useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router';

const NewBlog = ({ placeholder }) => {
    const nav = useNavigate();
    const handlePost = useStoreActions((action)=>action.handlePost);

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [tags, setTags] = useState([]);

    useEffect(() => {
        console.log(content);
    }, [content])

    useEffect(() => {
        console.log(tags);
    }, [tags])

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }   

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
    
    const handleFile = async (e)=>{
        if (e.target.files) {
            const file = e.target.files[0];
            const base64 = await ConvertToBase64(file);
            setImage(base64);
        }
    }

    const handleTags = async(e)=>{
        setTags(prev=>{
            // console.log(e.target.value)
            return [...prev,e.target.value]
        })
    }

    return (
        <Stack direction='column' width={'100%'} marginTop='10px' marginBottom={'100px'} justifyContent='center' alignItems='center'>
                <h1>Create a New Blog Using the below editor</h1>
            <Stack sx={{width:{xs:'100%',md:'100%',lg:'80%'}}}>
                <form style={{ fontSize: 'large', height: 'auto',marginBottom:'100px', margin: '10px',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center',gap:'10px' }}>
                    {/* <label htmlFor="Title">Title</label> */}
                    <TextField sx={{width:{xs:'80%',md:'80%',lg:'80%'}}} variant='outlined'  label='Title' value={title} onChange={handleTitle} style={{ color: '#fff', backgroundColor: '#fff' }}></TextField>
                    <label htmlFor="">Main Image</label>
                    <input type="file" name="main-img" id="" onChange={handleFile}/>
                    <JoditEditor
                        className='editor'
                        ref={editor}
                        value={content}
                        tabIndex={1}
                        onBlur={newContent => setContent(newContent)}
                        onChange={newContent => { }}
                    />
                    <select name="tag" id="" onChange={handleTags}>
                        <option value="tech" defaultChecked={true}>Technology</option>
                        <option value="gaming">Gaming</option>
                        <option value="business">Business</option>
                    </select>
                    <div>
                        {(tags.length>=1)?tags.forEach(tag=>{
                            {console.log(tag)}
                            <p style={{color:"#fff"}}>{tag}</p>
                        }):<p>No Tags</p>}
                    </div>
                    <Button variant='contained' onClick={(e)=>{e.preventDefault();handlePost({title:title,body:content,image:image,tags:tags});nav('/')}}>Submit</Button>
                </form>
            </Stack>

        </Stack>

    );
};

export default NewBlog;