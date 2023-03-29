import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [arr, setArr] = useState([]);
    const [check,setCheck] = useState({tech:false,bus:false,gam:false});

    const handleFilters = async (e) => {
        console.log(arr);
        const name = e.target.name;
        const req = props.blogs.filter((blog,index)=>{
            // console.log(blog);
            let p;
            arr.forEach(item=>{
                if(blog.tags.includes(item.toLowerCase()))
                {
                    p=blog
                }
            })
            console.log(p);
            if(p) return p;
        })
        console.log(req);
        setArr([]);
        props.setSearchBlogs(req);
        handleClose();
    }

    function handleChange(e) {
        const name = e.target.name;
        setArr((prev => {
            return [...prev, e.target.value]
        }));
        setCheck(prev=>{
            const val = check[name];
            console.log(name,val);
            return {...prev,[name]:!val}
        });
    }

    return (
        <div>
            <Button onClick={handleOpen} style={{ backgroundColor: '#fff' }} startIcon={<FilterAltIcon />}>Filters</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} name='tech' value={'tech'} checked={(check.tech)} onChange={e => handleChange(e)} label="Technology" style={{ color: 'black' }} />
                        <FormControlLabel control={<Checkbox />} name='bus' value={'business'} checked={(check.bus)} label="Business" onChange={e => handleChange(e)} style={{ color: 'black' }} />
                        <FormControlLabel control={<Checkbox />} name='gam' value={'gaming'} checked={(check.gam)} label="Gaming" onChange={e => handleChange(e)} style={{ color: 'black' }} />
                        <Button variant='contained' onClick={(e) => handleFilters(e)}>Apply Filters</Button>
                    </FormGroup>
                </Box>
            </Modal>
        </div>
    );
}