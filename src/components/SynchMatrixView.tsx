'use client'

import { Box, Typography } from '@mui/material';
import { Chart } from "react-google-charts"

interface SynchMatrixViewProps {
    title: string
    data: ((string | Date)[] | {
        type: string
        id: string
    }[])[][]
}

function SynchMatrixView({ title, data }: SynchMatrixViewProps) {

  return (
    <Box sx={{ p: 0 }}>

      <Box sx={{ display: "flex", flexDirection: "column", m: 3, alignItems: "center" }}>

        <Typography
          variant="h5"
          component="h5"
          sx={{ textAlign: 'center', mt: 0, mb: 3 }}
        >
          {title}
        </Typography>
        {data.map((e, i) => {
            return (
                <Chart key={i} chartType="Timeline" data={e} width="100%" height="500px" options={{ timeline: { groupByRowLabel: true } }} />
            )
        })}
      </Box>
    </Box>
  )
}

export default SynchMatrixView;