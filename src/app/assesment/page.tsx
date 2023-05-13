'use client'

import { Inter } from '@next/font/google'
import { Box, Typography } from '@mui/material';
import { Chart } from "react-google-charts"


function Home() {

  const data = [
    [
      { type: "string", id: "Requirement" },
      { type: "string", id: "Asset" },
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
    ],
    ["CR1", "RQ-1A Predator", new Date(2023, 4, 1, 14), new Date(2023, 4, 1, 15)],
    ["CR2", "U-2 Dragon Lady", new Date(2023, 4, 1, 15), new Date(2023, 4, 1, 17)],
    ["CR3", "F-16", new Date(2023, 4, 1, 15), new Date(2023, 4, 1, 16)],
    ["CR4", "MQ-9 Reaper", new Date(2023, 4, 1, 16), new Date(2023, 4, 1, 17)],
    ["CR5", "E-8 JSTARS", new Date(2023, 4, 1, 18), new Date(2023, 4, 1, 20)],
    ["CR6", "RC-135 Rivet Joint", new Date(2023, 4, 1, 19), new Date(2023, 4, 1, 20)],
    ["CR7", "MQ-9 Reaper", new Date(2023, 4, 1, 20), new Date(2023, 4, 1, 21)],
    ["CR8", "RQ-1A Predator", new Date(2023, 4, 1, 17), new Date(2023, 4, 1, 19)],
    ["CR9", "U2 Dragon Lady", new Date(2023, 4, 1, 22), new Date(2023, 4, 1, 23)],
    ["CR10", "F-16", new Date(2023, 4, 1, 20), new Date(2023, 4, 1, 22)],
  ];

  const data_inv = [
    [
      { type: "string", id: "Asset" },
      { type: "string", id: "Requirement" },
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
    ],
    ["RQ-1A Predator", "CR1", new Date(2023, 4, 1, 14), new Date(2023, 4, 1, 15)],
    ["U-2 Dragon Lady", "CR2", new Date(2023, 4, 1, 15), new Date(2023, 4, 1, 17)],
    ["F-16", "CR3", new Date(2023, 4, 1, 15), new Date(2023, 4, 1, 16)],
    ["MQ-9 Reaper", "CR4", new Date(2023, 4, 1, 16), new Date(2023, 4, 1, 17)],
    ["E-8 JSTARS", "CR5", new Date(2023, 4, 1, 18), new Date(2023, 4, 1, 20)],
    ["RC-135 Rivet Joint", "CR6", new Date(2023, 4, 1, 19), new Date(2023, 4, 1, 20)],
    ["MQ-9 Reaper", "CR7", new Date(2023, 4, 1, 20), new Date(2023, 4, 1, 21)],
    ["RQ-1A Predator", "CR8", new Date(2023, 4, 1, 17), new Date(2023, 4, 1, 19)],
    ["U-2 Dragon Lady", "CR9", new Date(2023, 4, 1, 22), new Date(2023, 4, 1, 23)],
    ["F-16", "CR10", new Date(2023, 4, 1, 20), new Date(2023, 4, 1, 22)],
  ];

  const data_availability = [
    [
      { type: "string", id: "Asset" },
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
    ],
    ["RQ-1A Predator", new Date(2023, 4, 1, 4), new Date(2023, 4, 1, 20)],
    ["U-2 Dragon Lady", new Date(2023, 4, 1, 12), new Date(2023, 4, 1, 23)],
    ["F-16", new Date(2023, 4, 1, 14), new Date(2023, 4, 1, 18)],
    ["MQ-9 Reaper", new Date(2023, 4, 1, 16), new Date(2023, 4, 1, 22)],
    ["E-8 JSTARS", new Date(2023, 4, 1, 8), new Date(2023, 4, 1, 22)],
    ["RC-135 Rivet Joint", new Date(2023, 4, 1, 18), new Date(2023, 4, 1, 23)]
  ];

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", p: 3, px: 20, m: 3, alignItems: "center" }}>
        <Typography
          variant="h5"
          component="h5"
          sx={{ textAlign: 'left', mt: 0, mb: 3 }}
        >
          Temporal View
        </Typography>
        <Chart chartType="Timeline" data={data} width="100%" height="500px" options={{ timeline: { groupByRowLabel: true }}} />
        <Chart chartType="Timeline" data={data_inv} width="100%" height="300px" options={{ timeline: { groupByRowLabel: true }}} />
        <Typography variant="h6" sx={{ textAlign: 'left', mt: 0, mb: 3 }}>Asset availability:</Typography>
        <Chart chartType="Timeline" data={data_availability} width="100%" height="800px" options={{ timeline: { groupByRowLabel: true }}} />
      </Box>
    </>
  )
}

export default Home;