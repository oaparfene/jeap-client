'use client'

import { PlanSelector } from "@/components/PlanSelector"
import { generateDataFromORBAT, Asset, crs } from "@/constants"
import { useContext } from "react"
import { JAPContext } from "../context"
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid"
import { useState } from "react"

const columns: GridColDef[] = [
    {
        field: 'ID',
        headerName: 'ID',
        width: 20,
    },
    {
        field: 'Operation',
        headerName: 'Operation',
        width: 200,
    },
    {
        field: 'Requester',
        headerName: 'Requester',
        width: 100,
    },
    {
        field: 'CR_Rank',
        headerName: 'CR Rank',
        width: 20,
    },
    {
        field: 'Justification',
        headerName: 'Justification',
        width: 200,
    },
    {
        field: 'Status',
        headerName: 'Status',
        width: 120,
    },
    {
        field: 'Location',
        headerName: 'Location',
        width: 200,
    },
    {
        field: 'Shape',
        headerName: 'Shape',
        width: 100,
    },
    {
        field: 'Location_Type',
        headerName: 'Location Type',
        width: 150,
    },
    {
        field: 'Coordinates',
        headerName: 'Coordinates',
        width: 200,
    },
    {
        field: 'Circle_Radius',
        headerName: 'Circle Radius',
        width: 100,
    },
    {
        field: 'Target_ID',
        headerName: 'Target ID',
        width: 150,
    },
    {
        field: 'Location_Category',
        headerName: 'Location Category',
        width: 200,
    },
    {
        field: 'Coll_Start_Date',
        headerName: 'Coll Start Date',
        width: 100,
    },
    {
        field: 'Coll_End_Date',
        headerName: 'Coll End Date',
        width: 100,
    },
    {
        field: 'Coll_Start_Time',
        headerName: 'Coll Start Time',
        width: 100,
    },
    {
        field: 'Coll_End_Time',
        headerName: 'Coll End Time',
        width: 100,
    },
    {
        field: 'Recurrance',
        headerName: 'Recurrance',
        width: 100,
    },
    {
        field: 'ISR_Role',
        headerName: 'ISR Role',
        width: 100,
    },
    {
        field: 'Sensor_Visibility',
        headerName: 'Sensor Visibility',
        width: 100,
    },
    {
        field: 'Required_Information',
        headerName: 'Required Information',
        width: 700,
    },
    {
        field: 'Intel_Discipline',
        headerName: 'Intel Discipline',
        width: 100,
    },
    {
        field: 'Exploitation_Requirement',
        headerName: 'Exploitation Requirement',
        width: 200,
    },
    {
        field: 'ER_Remarks',
        headerName: 'ER Remarks',
        width: 200,
    },
    {
        field: 'ER_Report_Frequency',
        headerName: 'ER Report Frequency',
        width: 200,
    },
    {
        field: 'Required_Product',
        headerName: 'Required Product',
        width: 200,
    },
    {
        field: 'RP_Remarks',
        headerName: 'RP Remarks',
        width: 200,
    },
    {
        field: 'RP_Report_Frequency',
        headerName: 'RP Report Frequency',
        width: 200,
    },
    {
        field: 'LTIOV',
        headerName: 'LTIOV',
        width: 200,
    },
    {
        field: 'Latest_Report_Time',
        headerName: 'Latest Report Time',
        width: 200,
    },
    {
        field: 'Reporting_Instructions',
        headerName: 'Reporting Instructions',
        width: 200,
    },
];

export default function Home() {
    const { addCRsToPlan, plans, newPlan, activePlanIndex, setActivePlanIndex } = useContext(JAPContext)
    const [pageSize, setPageSize] = useState(10);
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [amountOfAssetsAdded, setAmountOfAssetsAdded] = useState<number>(0)
    const [open, setOpen] = useState(false);

    const rows = crs.filter((cr) => !plans[activePlanIndex]?.requirements.find(req => req.ID === cr.ID ))

    const addToPlanHandler = () => {
        addCRsToPlan(selectedRows.map((id) => rows.find(asset => asset.ID.toString() === id)!))
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
            >Collection Requirements:</Typography>

            <PlanSelector plans={plans} newPlan={newPlan} activePlanIndex={activePlanIndex} setActivePlanIndex={setActivePlanIndex} />

            <Button variant='contained' sx={{ mb: 2 }} onClick={addToPlanHandler}>Add Selection to Plan</Button>

            <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    getRowId={(row) => row.ID}
                    columns={columns}
                    onSelectionModelChange={(newSelectedRows) => {
                        console.log(newSelectedRows)
                        setSelectedRows(newSelectedRows.map((e) => e.toString()))
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
                    Added {amountOfAssetsAdded} Requirements to Plan {plans[activePlanIndex]?.name}
                </Alert>
            </Snackbar>
        </Box>
    )
}