'use client'

import { useEffect, useMemo, useState, useContext } from 'react';
import { Avatar, Box, Typography, Stack, Button, Divider, Modal, List, ListItemButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import MailIcon from '@mui/icons-material/Mail';
import JCAPContext, { Plan } from '../context';

const getData = () => {
    fetch('')
}

export interface Requirement {
    active: boolean,
    name: string,
    type: string,
    location: string,
    gaoi: string,
    orbat_type: string,
    status: string,
    requester: string,
    ltiov: string,
    _id: number
}

let requirements: Requirement[] = []

for (let i = 1; i <= 47; i++) {
    requirements.push({
        active: false,
        name: `generic req ${i}`,
        type: 'EO',
        location: '12.345N 45.678E',
        gaoi: 'Europe',
        orbat_type: 'Air',
        status: 'Received',
        requester: 'ACO',
        ltiov: '12.12.2023 12:00',
        _id: i
    })
}

let reqsInPlan: Requirement[] = []

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Home() {
    const { plans, setPlans } = useContext(JCAPContext)
    const [pageSize, setPageSize] = useState(5);
    const [rowId, setRowId] = useState('0');
    const [reqsInPlan, setReqsInPlan] = useState<Requirement[]>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [activePlan, setActivePlan] = useState('AAA')

    const columns = useMemo(
        () => [
            {
                field: 'active',
                headerName: 'Active',
                width: 100,
                type: 'boolean',
                editable: true,
            },
            { field: 'name', headerName: 'Name', width: 200 },
            {
                field: 'type',
                headerName: 'Type',
                width: 100,
                type: 'singleSelect',
                valueOptions: ['EO', 'IR', 'SAR', 'GMTI'],
                editable: true,
            },
            {
                field: 'location',
                headername: 'Location',
                width: 200
            },
            {
                field: 'gaoi',
                headerName: 'GAOI',
                width: 200,
                type: 'singleSelect',
                valueOptions: ['Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania'],
                editable: true,
            },
            {
                field: 'orbat_type',
                headerName: 'ORBAT Type',
                width: 200,
                type: 'singleSelect',
                valueOptions: ['Air', 'Ground', 'Navy', 'Air Defense'],
                editable: true,
            },
            {
                field: 'status',
                headerName: 'Status',
                width: 150,
                type: 'singleSelect',
                valueOptions: ['Received', 'Pending', 'Submitted', 'Cancelled', 'Complete'],
                editable: true,
            },
            { field: 'requester', headerName: 'Requester', width: 100 },
            { field: 'ltiov', headerName: 'LTIOV', width: 200 },
            { field: '_id', headerName: 'Id', width: 100 },
        ],
        [rowId]
    );

    const addToPlanHandler = () => {
        setReqsInPlan(requirements.filter((entry) => {
            entry.active == true
        }))
        console.log(reqsInPlan)
        var tempPlans = plans
        var tempPlan: Plan | undefined = plans.find(e => e.name === activePlan)
        if (!tempPlan) {
            tempPlan = {
                name: activePlan,
                entries: reqsInPlan
            }
            tempPlans.push(tempPlan)
            setPlans(tempPlans)
        }
        else {
            tempPlan.entries.push(reqsInPlan)
            tempPlan = {
                name: activePlan,
                entries: Array( new Set( ...tempPlan.entries))
            }
            tempPlans.push(tempPlan)
            setPlans(tempPlans)
        }
    }

    return (
        <>
            <Stack sx={{ p: 3 }}>
                <Box
                    sx={{
                        height: 450,
                        width: '100%',
                        overflow: 'hidden'
                    }}
                >
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography
                            variant="h5"
                            component="h5"
                            sx={{ textAlign: 'left', mt: 0, mb: 3 }}
                        >
                            Collection Requirement Overview
                        </Typography>
                        <Stack direction='row' spacing={2}>
                            <RefreshIcon></RefreshIcon>
                            <DownloadIcon></DownloadIcon>
                            <MoreHorizIcon></MoreHorizIcon>
                        </Stack>
                    </Stack>
                    <Button variant='contained' sx={{ mb: 2 }} onClick={addToPlanHandler}>Add Selection to Plan</Button>
                    <Box sx={{ height: 340, width: '100%', overflow: 'auto' }}>

                        <DataGrid
                            columns={columns}
                            rows={requirements}
                            getRowId={(row) => row._id}
                            rowsPerPageOptions={[5, 10, 20]}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            getRowSpacing={(params) => ({
                                top: params.isFirstVisible ? 0 : 5,
                                bottom: params.isLastVisible ? 0 : 5,
                            })}
                            onCellEditCommit={(params) => setRowId(params.id.toString())}
                        />
                    </Box>
                </Box>
                <Divider sx={{ mb: 2, mt: 2, border: '1px blue solid' }}></Divider>
                <Box
                    sx={{
                        height: 400,
                        width: '100%',
                        overflow: 'hidden'
                    }}
                >
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography
                            variant="h5"
                            component="h5"
                            sx={{ textAlign: 'left', mt: 0, mb: 3 }}
                        >
                            {activePlan}
                        </Typography>
                        <Button variant='contained' sx={{ mb: 2 }} onClick={handleOpen}>Open Plan</Button>
                        <Button variant='contained' sx={{ mb: 2 }}>New Plan</Button>
                        <Stack direction='row' spacing={2}>
                            <RefreshIcon></RefreshIcon>
                            <DownloadIcon></DownloadIcon>
                            <MoreHorizIcon></MoreHorizIcon>
                        </Stack>
                    </Stack>

                    <Box sx={{ height: 340, width: '100%', overflow: 'auto' }}>

                        <DataGrid
                            columns={columns}
                            rows={plans.find(e => e.name === activePlan) ? plans.find(e => e.name === activePlan)?.entries! : []}
                            getRowId={(row) => row._id}
                            rowsPerPageOptions={[5, 10, 20]}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            getRowSpacing={(params) => ({
                                top: params.isFirstVisible ? 0 : 5,
                                bottom: params.isLastVisible ? 0 : 5,
                            })}
                            onCellEditCommit={(params) => setRowId(params.id.toString())}
                        />
                    </Box>
                </Box>

            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Select Plan:
                    </Typography>

                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {setActivePlan('AAA'); handleClose()}}>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary={'AAA'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {setActivePlan('AAB'); handleClose()}}>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary={'AAB'} />
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Box>
            </Modal>
        </>
    )
}
export default Home;