'use client'

import { PlanSelector } from "@/components/PlanSelector"
import { generateDataFromORBAT } from "@/constants"
import { Box, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useState } from "react"

export default function Home() {
    const [pageSize, setPageSize] = useState(10);

    const columns: GridColDef[] = [
        {
            field: 'UniquePlatformID',
            headerName: 'ID',
            width: 200,
        },
        {
            field: 'Description',
            headerName: 'Description',
            width: 200,
        },
        {
            field: 'Capacity',
            headerName: 'Capacity',
            width: 200,
        },
        {
            field: 'Location',
            headerName: 'Location',
            width: 200,
        },
        {
            field: 'Sensor',
            headerName: 'Sensor',
            width: 200,
        },
        {
            field: 'Unit',
            headerName: 'Unit',
            width: 200,
        },
        {
            field: 'AvailableFrom',
            headerName: 'AvailableFrom',
            width: 200,
        },
    ]
    const rows = generateDataFromORBAT()!



    return (
        <Box sx={{ p: 8 }}>

            <Typography
                variant="h5"
                component="h5"
                sx={{ textAlign: 'left', mt: 0, mb: 3 }}
            >Collection Assets:</Typography>

            <PlanSelector></PlanSelector>

            <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    getRowId={(row) => row.UniquePlatformID}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    checkboxSelection
                />
            </Box>
        </Box>
    )
}