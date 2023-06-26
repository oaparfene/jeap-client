'use client'

import { PlanSelector } from "@/components/PlanSelector"
import { generateDataFromORBAT, Asset } from "@/constants"
import { useContext } from "react"
import { JAPContext } from "../context"
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid"
import { useState } from "react"

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
        width: 100,
    },
    {
        field: 'Location',
        headerName: 'Location',
        width: 200,
    },
    {
        field: 'Sensor',
        headerName: 'Sensor',
        width: 100,
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
export default function Home() {
    const { addAssetsToPlan, plans, newPlan, activePlanIndex, setActivePlanIndex } = useContext(JAPContext)
    const [pageSize, setPageSize] = useState(10);
    const [selectedRows, setSelectedRows] = useState<any[]>([])
    const [amountOfAssetsAdded, setAmountOfAssetsAdded] = useState<number>(0)
    const [open, setOpen] = useState(false);

    const rows = generateDataFromORBAT()!

    const addToPlanHandler = () => {
        addAssetsToPlan(selectedRows.map((id) => rows.find(asset => asset.ID === id)!))
        console.log('plans', plans)
        setAmountOfAssetsAdded(selectedRows.length)
        setOpen(true);
        setSelectedRows([])
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <Box sx={{ p: 8 }}>

            <Typography
                variant="h5"
                component="h5"
                sx={{ textAlign: 'left', mt: 0, mb: 3 }}
            >Collection Assets:</Typography>

            <PlanSelector plans={plans} newPlan={newPlan} activePlanIndex={activePlanIndex} setActivePlanIndex={setActivePlanIndex} />

            <Button variant='contained' sx={{ mb: 2 }} onClick={addToPlanHandler}>Add Selection to Plan</Button>

            <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    getRowId={(row) => row.ID}
                    columns={columns}
                    onSelectionModelChange={(newSelectedRows) => {
                        console.log(newSelectedRows)
                        setSelectedRows(newSelectedRows)
                        console.log(selectedRows)
                        //setSelectedRows(newSelectedRows);
                    }}
                    selectionModel={selectedRows}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    checkboxSelection
                />
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Added {amountOfAssetsAdded} Assets to Plan {plans[activePlanIndex]?.name}
                </Alert>
            </Snackbar>
        </Box>
    )
}