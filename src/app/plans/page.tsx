'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Typography, Stack, Button, Divider } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import JCAPContext from '../context';
import { InformationRequirementType } from '@/types/main/informationRequirementType';

// interface Requirement {
//   active: boolean,
//   name: string,
//   level: string,
//   type: string,
//   gaoi: string,
//   orbat_type: string,
//   status: string,
//   requester: string,
//   ltiov: string,
//   _id: number
// }

// let requirements: Requirement[] = []

// for (let i = 1; i <= 47; i++) {
//   requirements.push({
//     active: false,
//     name: `generic req ${i}`,
//     level: '1',
//     type: 'EO',
//     gaoi: 'Europe',
//     orbat_type: 'Air',
//     status: 'Received',
//     requester: 'ACO',
//     ltiov: '12.12.2023 12:00',
//     _id: i
//   })
// }

// let reqsInPlan: Requirement[] = []

function Home() {
  const { CMPlans, setCMPlans, activePlan, requirements } = React.useContext(JCAPContext)
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState('0');
  const [reqsInPlan, setReqsInPlan] = useState<InformationRequirementType[]>([]);

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
        field: 'status',
        headerName: 'Status',
        width: 150,
        type: 'singleSelect',
        valueOptions: ['Received', 'Pending', 'Submitted', 'Cancelled', 'Complete'],
        editable: true,
      },
      {
        field: 'assigned_cell',
        headerName: 'Assigned Cell',
        width: 100,
        type: 'singleSelect',
        valueOptions: ['Cell 1', 'Cell 2', 'Cell 3',],
        editable: true
      },
    ],
    [rowId]
  );

  const addToPlanHandler = () => {
    // setReqsInPlan(requirements.filter((entry) => {
    //   entry.active == true
    // }))
    // console.log(reqsInPlan)
  }

  return (
    <>
      <Stack sx={{ p: 3 }}>
        {activePlan ? (
          <>
            <Box
              sx={{
                height: 730,
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
                  Plan Overview: {activePlan.Name}
                </Typography>
                <Stack direction='row' spacing={2}>
                  <RefreshIcon></RefreshIcon>
                  <DownloadIcon></DownloadIcon>
                  <MoreHorizIcon></MoreHorizIcon>
                </Stack>
              </Stack>
              {/*<Button variant='contained' sx={{ mb: 2 }} onClick={addToPlanHandler}>Add Selection to Plan</Button>*/}
              <Box sx={{ height: 630, width: '100%', overflow: 'auto' }}>

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
            <Stack direction='row' justifyContent='end'>
              <Button variant='outlined' sx={{ mr: 2 }} onClick={addToPlanHandler}>Request Automated Allocation</Button>
              <Button variant='outlined' sx={{ mr: 2 }} onClick={addToPlanHandler}>Save Draft Plan</Button>
              <Button variant='contained' sx={{ mr: 2 }} onClick={addToPlanHandler}>Publish Plan</Button>
            </Stack>
          </>
        ) : (
          <Typography
            variant="h5"
            component="h5"
            sx={{ textAlign: 'left', mt: 0, mb: 3 }}
          >
            No Plan Selected
          </Typography>
        )}
      </Stack>
    </>
  )
}
export default Home;