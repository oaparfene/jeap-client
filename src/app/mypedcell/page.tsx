'use client'

import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography, Stack, Button, Divider, TextField } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';

function Home() {

    return (
        <>
            <Stack sx={{ p: 3 }}>
                <Box
                    sx={{
                        height: 730,
                        width: '100%',
                        overflow: 'hidden'
                    }}
                >
                    <Typography
                            variant="h5"
                            component="h5"
                            sx={{ textAlign: 'left', mt: 0, mb: 3 }}
                        >
                            My Ped Cell
                        </Typography>
                    <TextField sx={{ m: '1em' }} variant='outlined' label='Name' ></TextField>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ m: '1em' }} variant='outlined' label='Owner' ></TextField>
                        <TextField sx={{ m: '1em' }} variant='outlined' label='Email' ></TextField>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ m: '1em' }} variant='outlined' label='Country' ></TextField>
                        <TextField sx={{ m: '1em' }} variant='outlined' label='Level' ></TextField>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ m: '1em' }} variant='outlined' label='Exploitation Type' ></TextField>
                        <TextField sx={{ m: '1em' }} variant='outlined' label='ORBAT Specialization' ></TextField>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ m: '1em' }} variant='outlined' label='GAOI' ></TextField>
                        <TextField sx={{ m: '1em' }} variant='outlined' label='Capacity' ></TextField>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ m: '1em' }} variant='outlined' label='Work Days' ></TextField>
                        <TextField sx={{ m: '1em' }} variant='outlined' label='Working Schedule' ></TextField>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                        <Button variant='contained' sx={{ mb: 2 }}>Save</Button>
                    </Box>
                </Box>
            </Stack>
        </>
    )
}
export default Home;