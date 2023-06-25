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
import { addTasksToCMPlan, createCMPlan, getReqsFromPlan, removeTasksFromCMPlan } from '@/lib/helpers';
import { InformationRequirementType } from '@/types/main/informationRequirementType';
import { uuid } from 'uuidv4';

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
    const { CMPlans, setCMPlans, activePlan, setActivePlan, requirements, setRequirements } = useContext(JCAPContext)
    const [localActivePlan, setLocalActivePlan] = useState<CollectionExploitationPlanType>(activePlan!)
    const [pageSize, setPageSize] = useState(5);
    const [rowId, setRowId] = useState('0');
    const [openPlan, setOpenPlan] = useState(false);
    const handleOpenPlan = () => setOpenPlan(true);
    const handleClosePlan = () => setOpenPlan(false);
    const [openNewPlan, setOpenNewPlan] = useState(false);
    const handleOpenNewPlan = () => setOpenNewPlan(true);
    const handleCloseNewPlan = () => setOpenNewPlan(false);
    const [newPlanName, setNewPlanName] = useState('');

    const [selectionModel, setSelectionModel] = useState([]);
    const [selectionModelBot, setSelectionModelBot] = useState([]);

    useEffect(() => {
        setLocalActivePlan(activePlan!)
    }, [activePlan])


    const handleNewPlan = (name: string) => {
        if (!name) return;
        const newPlan = createCMPlan(name);
        setCMPlans([...CMPlans, newPlan]);
        setActivePlan(newPlan);
    }

    const columns = useMemo(
        () => [
            { field: 'Name', headerName: 'Name', width: 150 },
            { field: 'Priority', headerName: 'Priority', width: 100 },
            {
                field: 'RequiredInformation',
                headerName: 'Description',
                width: 300,
            },
            {
                field: 'IntelCollectionDiscipline',
                headerName: 'Intel Type',
                width: 100,
            },
            {
                field: 'RequiredProduct',
                headerName: 'Product',
                width: 100,
                valueGetter: (params: any) => {
                    return params.value[0].Product.ProductTypeType;
                }
            },
            {
                field: 'GeographicAreaOfInterestReference',
                headerName: 'GAOI',
                width: 300,
                valueGetter: (params: any) => {
                    if (!params.value) return
                    return params.value[0].GeographicAreaOfInterest.Identifier;
                }
            },
            {
                field: 'Status',
                headerName: 'Status',
                width: 150,
            },
            {
                field: 'Originator',
                headername: 'Requestor',
                width: 100,
                valueGetter: (params: any) => {
                    return params.value.Requestor;
                }
            },
            {
                field: 'LatestDateTimeZuluOfInformationValue',
                headerName: 'LTIOV',
                width: 200,
                valueGetter: (params: any) => {
                    return params.value.EndDateTimeZulu.Value;
                }
            },
            { field: 'Identifier', headerName: 'Id', width: 300 },
        ],
        [rowId]
    );

    const addToPlanHandler = () => {
        if (!selectionModel) return
        console.log('model:', selectionModel)
        // @ts-ignore
        const newPlan = addTasksToCMPlan(localActivePlan!, requirements.filter((e) => selectionModel.includes(e.Identifier)))
        // @ts-ignore
        setRequirements(requirements.filter((e) => !selectionModel.includes(e.Identifier)))
        //setLocalActivePlan(newPlan)
        setActivePlan(newPlan)
        console.log(newPlan)
    }

    const removeFromPlanHandler = () => {
        if (!selectionModelBot) return
        // @ts-ignore
        setRequirements(requirements.concat(localActivePlan?.InformationRequirements.filter((e) => selectionModelBot.includes(e.InformationRequirement.Identifier))))
        // @ts-ignore
        const newPlan = removeTasksFromCMPlan(localActivePlan, localActivePlan?.InformationRequirements.filter((e) => selectionModelBot.includes(e.InformationRequirement.Identifier)))
        setActivePlan(newPlan)
        console.log('check')
    }

    const rowsBot = localActivePlan ? getReqsFromPlan(localActivePlan) : []

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
                    <Button variant='contained' sx={{ mb: 2 }} disabled={!localActivePlan} onClick={addToPlanHandler}>Add Selection to Plan</Button>
                    <Box sx={{ height: 340, width: '100%', overflow: 'auto' }}>

                        <DataGrid
                            checkboxSelection
                            onSelectionModelChange={(newSelectionModel) => {
                                // @ts-ignore
                                setSelectionModel(newSelectionModel);
                            }}
                            selectionModel={selectionModel}
                            columns={columns}
                            rows={requirements}
                            getRowId={(row) => row.Identifier}
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
                            {localActivePlan?.Name}
                        </Typography>
                        {/* <Button variant='contained' sx={{ mb: 2 }} disabled={!localActivePlan} onClick={removeFromPlanHandler}>Remove Selection from Plan</Button> */}

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
                            checkboxSelection
                            onSelectionModelChange={(newSelectionModel) => {
                                // @ts-ignore
                                setSelectionModelBot(newSelectionModel);
                            }}
                            selectionModel={selectionModelBot}
                            columns={columns}
                            rows={rowsBot}
                            getRowId={(row) => row.Identifier}
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