import React from "react";
import Feed from './Feed';
import { useStoreActions,useStoreState } from "easy-peasy";

function UserBlogs(props) {

    const user = useStoreState((state)=>state.userCred);

    const data = props.blogs.filter((item,index)=>{
        return item.editor == user.email;
    })

	return (
		<div style={{textAlign:'center',marginBottom:'100px',maxWidth:'100%'}}>
			<h1>Blogs</h1>
            {(props.blogs.length)
			? <Feed type='user' blogs={data}/>
			: <p>No Posts to display</p>}
		</div>
	);
}

export default UserBlogs;
