import { Grid } from '@mui/material';
import Post from './Post';
import { Link } from 'react-router-dom';

function Feed(props)
{
    const number = props.number;

    console.log(props.blogs)
    return (
        <Grid container spacing={2} >
            {props.blogs.slice(0,number).map((blog,index)=>(
                <Grid item xs={4}>
                    <Link to={`/blogs/${blog.idee}/${props.type}`} style={{textDecoration:'none'}}>
                        <Post key={blog.idee} type={props.type} blog={blog} image={blog.mainImage} tags={blog.tags}></Post>
                    </Link>
                </Grid>                
            ))}
        </Grid>
    )
}

export default Feed;