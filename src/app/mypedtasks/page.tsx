'use client'

import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography, Stack, Button, Divider } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';

const getData = () => {
    fetch('')
}

interface Task {
    active: boolean,
    name: string,
    level: string,
    plan: string,
    type: string,
    gaoi: string,
    orbat_type: string,
    status: string,
    requester: string,
    ltiov: string,
    _id: number
}

let requirements: Task[] = []

for (let i = 1; i <= 47; i++) {
    requirements.push({
        active: false,
        name: `generic req ${i}`,
        level: '1',
        plan: 'AAA',
        type: 'EO',
        gaoi: 'Europe',
        orbat_type: 'Air',
        status: 'Received',
        requester: 'ACO',
        ltiov: '12.12.2023 12:00',
        _id: i
    })
}

let reqsInPlan: Task[] = []

function Home() {
    const [pageSize, setPageSize] = useState(5);
    const [rowId, setRowId] = useState('0');
    const [reqsInPlan, setReqsInPlan] = useState<Task[]>([]);

    const columns = useMemo(
        () => [
            { field: 'name', headerName: 'Name', width: 200 },
            { field: 'level', headerName: 'Level', width: 50 },
            {
                field: 'plan',
                headerName: 'Plan',
                width: 100,
            },
            {
                field: 'type',
                headerName: 'Type',
                width: 100,
                type: 'singleSelect',
                valueOptions: ['EO', 'IR', 'SAR', 'GMTI'],
                editable: true,
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
        ],
        [rowId]
    );

    const addToPlanHandler = () => {
        setReqsInPlan(requirements.filter((entry) => {
            entry.active == true
        }))
        console.log(reqsInPlan)
    }

    return (
        <>
            <Stack sx={{p:3}}>
                <Box
                    sx={{
                        height: 850,
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
                            My Ped Tasks
                        </Typography>
                        <Stack direction='row' spacing={2}>
                            <RefreshIcon></RefreshIcon>
                            <DownloadIcon></DownloadIcon>
                            <MoreHorizIcon></MoreHorizIcon>
                        </Stack>
                    </Stack>
                    {/*<Button variant='contained' sx={{ mb: 2 }} onClick={addToPlanHandler}>Add Selection to Plan</Button>*/}
                    <Box sx={{ height: 740, width: '100%', overflow: 'auto' }}>

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
            </Stack>
        </>
    )
}
export default Home;