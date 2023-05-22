'use client'

import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography, Stack, Button, Divider } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';

interface Cell {
    active: boolean,
    name: string,
    level: string,
    type: string,
    gaoi: string,
    orbat_type: string,
    capacity: string,
    owner: string,
    schedule: string,
    _id: number
}

let cells: Cell[] = []

for (let i = 1; i <= 47; i++) {
    cells.push({
        active: false,
        name: `generic cell ${i}`,
        level: '1',
        type: 'EO',
        gaoi: 'Europe',
        orbat_type: 'Air',
        capacity: '2/4',
        owner: 'John Doe',
        schedule: 'Mon-Fri 0800-1600',
        _id: i
    })
}


function Home() {
    const [pageSize, setPageSize] = useState(10);
    const [rowId, setRowId] = useState('0');

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
            { field: 'level', headerName: 'Level', width: 50 },
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
                field: 'capacity',
                headerName: 'Capacity',
                width: 150,
            },
            { field: 'owner', headerName: 'Owner', width: 100 },
            { field: 'schedule', headerName: 'Schedule', width: 200 },
            { field: '_id', headerName: 'Id', width: 200 },
        ],
        [rowId]
    );

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
                            PED Cell Overview
                        </Typography>
                        <Stack direction='row' spacing={2}>
                            <RefreshIcon></RefreshIcon>
                            <DownloadIcon></DownloadIcon>
                            <MoreHorizIcon></MoreHorizIcon>
                        </Stack>
                    </Stack>
                    <Button variant='contained' sx={{ mb: 2 }}>Add Selection to Plan</Button>
                    <Box sx={{ height: 740, width: '100%', overflow: 'auto' }}>

                        <DataGrid
                            columns={columns}
                            rows={cells}
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