import React from "react";
import {Link} from 'react-router-dom';
import BlogCard from './BlogCard'
import parse from 'html-react-parser'

function Post(props)
{
    // console.log(props.post);
    const p = (props.blog.body[0]=='<')? props.blog.body.replace(/<[^>]+>/g, ''): props.blog.body;

    const p1 = (props.blog.body.length)>25 
    ?`${p.slice(0,25)}...`
    :p


    return (
        <div className="post" style={{width:'90%'}}>
            <BlogCard href={`/blogs/${props.blog.idee}`} title={props.blog.title} body={p1} type={props.type} image={props.image} tags={props.tags} ></BlogCard>
        </div>
    )
}

export default Post;