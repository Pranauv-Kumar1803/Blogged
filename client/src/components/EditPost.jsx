import React, { useState, useRef, useMemo, useEffect } from 'react';
import {useParams} from 'react-router'
import JoditEditor from 'jodit-react';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useStoreActions,useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router';

function EditPost(props) {
    const nav = useNavigate();
    const handleEdit = useStoreActions((action)=>action.handleEdit);

    const params = useParams();
    const id = params.id;

    const [editinfo,setEditinfo] = useState({editTitle:'',editBody:''});

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [tags, setTags] = useState([]);
    
    useEffect(() => {
        const data = props.blogs.filter((item, index) => {
            return item.idee == params.id;
        })
        setContent(data[0].body);
        setTitle(data[0].title)
        setTags(data[0].tags)
        setImage(data[0].mainImage)
    }, [id])
    
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
            return [...prev,e.target.value]
        })
    }

    const handleEd = async()=>{
        await handleEdit({id:id,title:title,body:content,image:image,tags:tags});
        await nav('/your-blogs')
    }

    return (
        <Stack direction='column' width={'100%'} marginTop='10px' marginBottom={'100px'} justifyContent='center' alignItems='center'>
        <h1>Edit your Blog Using the below editor</h1>
    <Stack sx={{width:{xs:'100%',md:'100%',lg:'80%'}}}>
        <form style={{ fontSize: 'large', height: 'auto',marginBottom:'100px', margin: '10px',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center',gap:'10px' }}>
            <TextField sx={{width:{xs:'80%',md:'80%',lg:'80%'}}} variant='outlined'  label='Title' value={title} onChange={handleTitle} style={{ color: '#fff', backgroundColor: '#fff' }}></TextField>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <label htmlFor="">Main Image</label>
                <input type="file" name="main-img" id="" onChange={handleFile}/>
                <img src={image} alt="" width={'50%'}/>
            </div>
            <JoditEditor
                className='editor'
                ref={editor}
                value={content}
                tabIndex={1}
                onBlur={newContent => setContent(newContent)}
                onChange={newContent => { }}
            />
            <select name="tag" id="" value={'tech'} onChange={handleTags}>
                <option value="tech" defaultChecked={true}>Technology</option>
                <option value="gaming">Gaming</option>
                <option value="business">Business</option>
            </select>
            {(tags.length>=1)?tags.forEach(tag=>{
                <p style={{color:"#fff"}}>{tag}</p>
            }):<p>No Tags</p>}
            <Button variant='contained' onClick={()=>{handleEd()}}>Submit Changes</Button>
        </form>
    </Stack>

</Stack>

    )
}

export default EditPost;