import { Stack, Grid } from "@mui/material";
import React from "react";

function Contact() {
    return (
        <Stack direction='column' justifyContent={'center'} alignItems='center'>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent='center' alignItems={'center'}>
                <Grid item xs={6}>
                    <h1>First column</h1>
                </Grid>
                <Grid item xs={6}>
                    <h1>Second column</h1>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default Contact;