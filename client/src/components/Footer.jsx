import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import {Link} from 'react-router-dom';

function Footer()
{
    return (
        <footer style={{position:'fixed',bottom:0,width:'100%',height:'85px',backgroundColor:'#3C4048'}}>
            <div className="footer">
                <p style={{fontSize:'large'}}>CopyRights &copy; 2022</p>
                <div>
                    <a href='https://www.facebook.com' target={"_blank"} style={{textDecoration:'none',listStyleType:'none',color:'white'}}>
                        <FacebookIcon/>
                    </a>
                    <a href='https://www.twitter.com' target={'_blank'} style={{textDecoration:'none',listStyleType:'none',color:'white'}}>
                        <TwitterIcon/>
                    </a>
                    <a href='https://www.instagram.com' target={'_blank'} style={{textDecoration:'none',listStyleType:'none',color:'white'}}>
                        <InstagramIcon/>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;