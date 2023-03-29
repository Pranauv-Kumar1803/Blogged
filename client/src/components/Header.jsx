import React from "react";

function Header(props)
{
    return (
        <header style={{width:'100%',backgroundColor:'#3C4048',color:'white',margin:0,padding:0,textAlign:'center'}}>
            <h1 style={{margin:0,padding:0}}>{props.title}</h1>
        </header>
    )
}

export default Header;