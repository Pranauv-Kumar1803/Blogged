import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser'

export default function MediaCard({ type, href, tags, title, body, image }) {
    return (
        <Card sx={{ maxWidth: '100%', marginBottom: '40px' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    {/* {console.log(body)} */}
                    {body}
                </Typography>
                <Typography variant='body2' color='GrayText' style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
                    {tags.map(tag=>{
                        return <div style={{backgroundColor:'#FB2576',color:'white',borderRadius:'3px',marginRight:'10px',marginTop:'10px',padding:'4px'}}>
                            {tag}
                        </div>
                    })}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={href + '/' + type} style={{ listStyleType: 'none', textDecoration: 'none' }}>
                    <Button variant='contained' size="small">Learn More</Button>
                </Link >
            </CardActions>
        </Card>
    );
}