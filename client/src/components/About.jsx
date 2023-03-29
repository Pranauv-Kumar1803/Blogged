import React from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function About()
{
    return (
        <Stack direction={'column'} spacing={2} justifyContent='center' alignItems='center' margin={15}>
            <Container maxWidth='md'>
                <Box sx={{width:'100%',bgcolor:'GrayText',height:'auto',color:'',justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',padding:'10px'}}>
                    <h1>This is About Section</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum dolorum, tenetur cumque praesentium eius quae quo vel modi deleniti asperiores id! Quos natus nihil incidunt et culpa amet eius nobis animi aliquam velit provident quidem, illo distinctio nesciunt debitis laudantium, molestias fuga? Est voluptatum temporibus expedita ipsa unde enim velit.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit recusandae autem architecto perferendis animi, optio blanditiis placeat quasi iste, tempore consectetur ut similique odit perspiciatis quas. Quia eveniet voluptatum pariatur consequatur laudantium nulla nam. Sequi culpa ipsam aut. Eligendi ipsa placeat velit magnam consectetur, nulla iusto, numquam, maiores debitis inventore asperiores? Praesentium quae odio laboriosam qui cupiditate ipsam tempora. Odio quos velit in excepturi, veritatis quia architecto eligendi beatae. Commodi molestiae culpa hic quo consectetur rerum rem impedit distinctio? Beatae, natus magni quod alias voluptatum voluptate, tempora tenetur maxime amet iusto explicabo iste incidunt perspiciatis ipsa expedita culpa! Atque, itaque!
                    </p>
                </Box>
            </Container>
        </Stack>
    )
}

export default About;