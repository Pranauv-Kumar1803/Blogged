import React from "react";
import {useNavigate} from 'react-router-dom';
import { actionOn, useStoreActions,useStoreState } from "easy-peasy";
import { useState } from "react";

function NewPost(props)
{
    const handlePost = useStoreActions((action)=>action.handlePost)

    const [info,setInfo] = useState({title:'',body:''});

    function func(e)
    {   
        const name = e.target.name;
        const value = e.target.value;
        setInfo(prev=>{
            return {...prev,[name]:value}
        })
    }
    
    const navigate = useNavigate();

    return (
        <main className="form">
            <form onSubmit={(e)=>{e.preventDefault();
                handlePost(info);
                setInfo({title:'',body:''})
                navigate('/');
                }}>
                <label htmlFor="title">Title</label>
                <input onChange={func} id="title" name="title" type="text" placeholder="enter the title" value={info.title} />
                <br />
                <label htmlFor="content">Body</label>
                <input onChange={func} id="body" name="body" type="text" placeholder="enter the body" value={info.body} />
                <br />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost;