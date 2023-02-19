'use client'

import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

const requirements: any = [
    {
        active: true,
        name: 'generic req',
        level: '1',
        type: 'EO',
        gaoi: 'Europe',
        orbat_type: 'Air',
        status: 'Received',
        requester: 'ACO',
        ltiov: '12.12.2023 12:00',
        _id: 1
    }
]

function Home() {
    const [pageSize, setPageSize] = useState(5);
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
            { field: 'name', headerName: 'Name', width: 170 },
            { field: 'level', headerName: 'Level', width: 200 },
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
                width: 100,
                type: 'singleSelect',
                valueOptions: ['Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania'],
                editable: true,
            },
            {
                field: 'orbat_type',
                headerName: 'ORBAT Type',
                width: 100,
                type: 'singleSelect',
                valueOptions: ['Air', 'Ground', 'Navy', 'Air Defense'],
                editable: true,
            },
            {
                field: 'status',
                headerName: 'Status',
                width: 100,
                type: 'singleSelect',
                valueOptions: ['Received', 'Pending', 'Submitted', 'Cancelled', 'Complete'],
                editable: true,
            },
            { field: 'requester', headerName: 'Requester', width: 170 },
            { field: 'ltiov', headerName: 'LTIOV', width: 170 },
            { field: '_id', headerName: 'Id', width: 220 },
        ],
        [rowId]
    );

    return (
        <>
            <Box
                sx={{
                    height: 400,
                    width: '100%',
                }}
            >
                <Typography
                    variant="h3"
                    component="h3"
                    sx={{ textAlign: 'center', mt: 3, mb: 3 }}
                >
                    Manage Users
                </Typography>
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
        </>
    )
}
export default Home;