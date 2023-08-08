'use client'

import { PlanSelector } from "@/components/PlanSelector"
import { generateDataFromORBAT, Asset, crs } from "@/constants"
import { useContext, useEffect } from "react"
import { JAPContext } from "../context"
import { Alert, Box, Button, CircularProgress, Snackbar, Stack, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid"
import { useState } from "react"
import { Requirement } from "@/hooks/usePlan"
import { useMiniZinc } from "@/hooks/useMiniZinc"

const reqColumns: GridColDef[] = [
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
const assetColumns: GridColDef[] = [
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
    const { addFlightPlansToPlan, addTasksToPlan, plans, newPlan, activePlanIndex, setActivePlanIndex, removeAssetsFromPlan, removeCRsFromPlan } = useContext(JAPContext)
    const { prepareAllocation, loading, allocation, flightPlans } = useMiniZinc()
    const [pageSize, setPageSize] = useState(10);
    const [selectedCRRows, setSelectedCRRows] = useState<string[]>([])
    const [selectedAssetRows, setSelectedAssetRows] = useState<string[]>([])
    const [amountOfAssetsRemoved, setAmountOfAssetsRemoved] = useState<number>(0)
    const [amountOfCRsRemoved, setAmountOfCRsRemoved] = useState<number>(0)
    const [openCR, setOpenCR] = useState(false);
    const [openAsset, setOpenAsset] = useState(false);
    const [openAllocation, setOpenAllocation] = useState(false);

    console.log('plans', plans)

    const planReqs = plans[activePlanIndex] ? plans[activePlanIndex].requirements : []
    const planAssets = plans[activePlanIndex] ? plans[activePlanIndex].assets : []

    const removeReqsFromPlanHandler = () => {
        if (!plans[activePlanIndex]) return
        if (selectedCRRows.length === 0) return
        const CRsToRemove = selectedCRRows.map((id) => planReqs.find(asset => asset.ID.toString() === id)) as Requirement[]
        console.log('CRsToRemove', CRsToRemove)
        removeCRsFromPlan(CRsToRemove)
        setAmountOfCRsRemoved(selectedCRRows.length)
        setOpenCR(true);
        setSelectedCRRows([])
    }

    const removeAssetsFromPlanHandler = () => {
        if (!plans[activePlanIndex]) return
        if (selectedAssetRows.length === 0) return
        const assetsToRemove = selectedAssetRows.map((id) => planAssets.find(asset => asset.ID.toString() === id)) as Asset[]
        console.log('assetsToRemove', assetsToRemove)
        removeAssetsFromPlan(assetsToRemove)
        setAmountOfAssetsRemoved(selectedAssetRows.length)
        setOpenAsset(true);
        setSelectedAssetRows([])
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenCR(false);
        setOpenAsset(false);
        setOpenAllocation(false);
    };

    const handleRequestAllocation = () => {
        console.log('handleRequestAllocation')
        if (!plans[activePlanIndex]) return
        prepareAllocation(plans[activePlanIndex]).then(() => {
            setOpenAllocation(true)
        }
        )
    }

    useEffect(() => {
        if (allocation.length > 0) {
            console.log('allocation', allocation)
            addTasksToPlan(allocation)
        }
    }, [allocation])

    useEffect(() => {
        if (flightPlans.length > 0) {
            console.log('flightPlans', flightPlans)
            addFlightPlansToPlan(flightPlans)
        }
    }, [flightPlans])

    return (
        <Box sx={{ p: 8 }}>

            <Typography
                variant="h4"
                component="h4"
                sx={{ textAlign: 'left', mt: 0, mb: 3 }}
            >Collection Plans:</Typography>

            <PlanSelector plans={plans} newPlan={newPlan} activePlanIndex={activePlanIndex} setActivePlanIndex={setActivePlanIndex} />

            <Box sx={{ display: 'flex', flexDir: 'row', justifyContent: 'space-between' }}>

                <Typography
                    variant="h6"
                    component="h6"
                    sx={{ textAlign: 'left', mt: 0, mb: 3 }}
                >Plan Requirements:</Typography>

                <Button variant='contained' sx={{ mb: 2 }} onClick={removeReqsFromPlanHandler}>Remove Selected Requirements</Button>

            </Box>

            <Box sx={{ height: 650, width: '100%', mb: 8 }}>
                <DataGrid
                    rows={planReqs}
                    getRowId={(row) => row.ID}
                    columns={reqColumns}
                    onSelectionModelChange={(newSelectedRows) => {
                        console.log(newSelectedRows)
                        setSelectedCRRows(newSelectedRows.map((e) => e.toString()))
                        console.log(selectedCRRows)
                        //setSelectedRows(newSelectedRows);
                    }}
                    selectionModel={selectedCRRows}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    checkboxSelection
                />
            </Box>
            
            <Box sx={{ display: 'flex', flexDir: 'row', justifyContent: 'space-between' }}>

                <Typography
                    variant="h6"
                    component="h6"
                    sx={{ textAlign: 'left', mt: 0, mb: 3 }}
                >Plan Assets:</Typography>

                <Button variant='contained' sx={{ mb: 2 }} onClick={removeAssetsFromPlanHandler}>Remove Selected Assets</Button>

            </Box>

            <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={planAssets}
                    getRowId={(row) => row.ID}
                    columns={assetColumns}
                    onSelectionModelChange={(newSelectedRows) => {
                        console.log(newSelectedRows)
                        setSelectedAssetRows(newSelectedRows.map((e) => e.toString()))
                        console.log(selectedAssetRows)
                        //setSelectedRows(newSelectedRows);
                    }}
                    selectionModel={selectedAssetRows}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    checkboxSelection
                />
            </Box>

            <Stack direction='row' justifyContent='end' sx={{ mt: 2 }}>
              <Button variant='outlined' sx={{ mr: 2 }} onClick={handleRequestAllocation}>Generate Plan{loading && <CircularProgress sx={{p:1}} />}</Button>
              <Button variant='outlined' sx={{ mr: 2 }} onClick={() => {}}>Save Draft Plan</Button>
              <Button variant='contained' sx={{ mr: 2 }} onClick={() => {}}>Publish Plan</Button>
            </Stack>
            <Snackbar open={openCR} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Removed {amountOfCRsRemoved} Requirements from Plan {plans[activePlanIndex]?.name}
                </Alert>
            </Snackbar>
            <Snackbar open={openAsset} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Removed {amountOfAssetsRemoved} Assets from Plan {plans[activePlanIndex]?.name}
                </Alert>
            </Snackbar>
            <Snackbar open={openAllocation} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Received Allocation for Plan {plans[activePlanIndex]?.name}
                </Alert>
            </Snackbar>
        </Box>
    )
}