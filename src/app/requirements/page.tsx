'use client'

import { useEffect, useMemo, useState, useContext } from 'react';
import { Avatar, Box, Typography, Stack, Button, Divider, Modal, List, ListItemButton, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import MailIcon from '@mui/icons-material/Mail';
import JCAPContext from '../context';
import { CollectionExploitationPlanType } from '@/types/main/collectionExploitationPlanType';
import { createCMPlan } from '@/lib/helpers';

const getData = () => {
    fetch('')
}

// export interface Requirement {
//     active: boolean,
//     name: string,
//     type: string,
//     location: string,
//     gaoi: string,
//     orbat_type: string,
//     status: string,
//     requester: string,
//     ltiov: string,
//     _id: number
// }

// let requirements: Requirement[] = []

// for (let i = 1; i <= 47; i++) {
//     requirements.push({
//         active: false,
//         name: `generic req ${i}`,
//         type: 'EO',
//         location: '12.345N 45.678E',
//         gaoi: 'Europe',
//         orbat_type: 'Air',
//         status: 'Received',
//         requester: 'ACO',
//         ltiov: '12.12.2023 12:00',
//         _id: i
//     })
// }

// let reqsInPlan: Requirement[] = []

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
    const { CMPlans, setCMPlans, activePlan, setActivePlan, requirements } = useContext(JCAPContext)
    const [pageSize, setPageSize] = useState(5);
    const [rowId, setRowId] = useState('0');
    const [openPlan, setOpenPlan] = useState(false);
    const handleOpenPlan = () => setOpenPlan(true);
    const handleClosePlan = () => setOpenPlan(false);
    const [openNewPlan, setOpenNewPlan] = useState(false);
    const handleOpenNewPlan = () => setOpenNewPlan(true);
    const handleCloseNewPlan = () => setOpenNewPlan(false);
    const [newPlanName, setNewPlanName] = useState('');

    const handleNewPlan = (name: string) => {
        if (!name) return;
        const newPlan = createCMPlan(name);
        setCMPlans([...CMPlans, newPlan]);
        setActivePlan(newPlan);
    }

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
                            getRowId={(row) => row.SerialNumber}
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
                            {activePlan?.Name}
                        </Typography>
                        <Button variant='contained' sx={{ mb: 2 }} onClick={handleOpenPlan}>Open Plan</Button>
                        <Button variant='contained' sx={{ mb: 2 }} onClick={handleOpenNewPlan}>New Plan</Button>
                        <Stack direction='row' spacing={2}>
                            <RefreshIcon></RefreshIcon>
                            <DownloadIcon></DownloadIcon>
                            <MoreHorizIcon></MoreHorizIcon>
                        </Stack>
                    </Stack>

                    <Box sx={{ height: 340, width: '100%', overflow: 'auto' }}>

                        <DataGrid
                            columns={columns}
                            rows={activePlan?.InformationRequirements ? activePlan.InformationRequirements : []}
                            getRowId={(row) => row.InformationRequirement?.SerialNumber!}
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
                open={openNewPlan}
                onClose={handleCloseNewPlan}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack gap={2}>

                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Type a Name for the new Plan:
                        </Typography>

                        <TextField
                            id="outlined-basic"
                            label="Plan Name"
                            variant="outlined"
                            onChange={(e) => { setNewPlanName(e.target.value) }}
                        />
                        <Button variant='contained' sx={{ mb: 2 }} onClick={() => {
                            handleNewPlan(newPlanName)
                            handleCloseNewPlan()
                        }}>Create Plan</Button>
                    </Stack>


                </Box>
            </Modal>

            <Modal
                open={openPlan}
                onClose={handleClosePlan}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Select Plan:
                    </Typography>

                    <List>
                        {CMPlans.map((plan) => (
                            <ListItem key={plan.Identifier} disablePadding>
                                <ListItemButton onClick={() => { setActivePlan(plan); handleClosePlan() }}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={plan.Name} />
                                </ListItemButton>
                            </ListItem>))
                        }
                    </List>

                </Box>
            </Modal>
        </>
    )
}
export default Home;