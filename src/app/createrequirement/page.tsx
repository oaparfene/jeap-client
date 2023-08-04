"use client";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

function Home() {
  const [operation, setOperation] = useState("");
  const [requester, setRequester] = useState("");
  const [CR_Rank, setCR_Rank] = useState("");
  const [justification, setJustification] = useState("");
  const [status, setStatus] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [targetID, setTargetID] = useState("");
  const [locationCategory, setLocationCategory] = useState("");
  const [collStartTime, setCollStartTime] = useState("");
  const [collEndTime, setCollEndTime] = useState("");

  console.log(collEndTime);

  return (
    <Box sx={{ p: 8 }}>
      <Typography
        variant="h5"
        component="h5"
        sx={{ textAlign: "left", mt: 0, mb: 3 }}
      >
        Create Requirement:
      </Typography>

      <Box sx={{display: "grid", gap: "12px", gridTemplateColumns: "auto auto auto"}}>
        <TextField
          id="operation"
          required
          label="Operation"
          variant="outlined"
          placeholder="TestOpSouth"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        />
        <TextField
          id="requester"
          required
          label="Requester"
          variant="outlined"
          placeholder="ACC"
          value={requester}
          onChange={(e) => setRequester(e.target.value)}
        />
        <TextField
          id="cr_rank"
          required
          label="CR Rank"
          variant="outlined"
          placeholder="CR Rank"
          value={CR_Rank}
          onChange={(e) => setCR_Rank(e.target.value)}
        />
        <TextField
          id="justification"
          required
          label="Justification"
          variant="outlined"
          placeholder="Supports PIR 1"
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        />
        <TextField
          id="status"
          required
          label="Status"
          variant="outlined"
          placeholder="Approved"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        {/* Location, Shape, LocationType */}
        <TextField
          id="coordinates"
          required
          label="Coordinates"
          variant="outlined"
          placeholder="46.220588N 24.108810E"
          value={coordinates}
          onChange={(e) => setCoordinates(e.target.value)}
        />
        <TextField
          id="target_id"
          required
          label="Target ID"
          variant="outlined"
          placeholder="1234AA0000"
          value={targetID}
          onChange={(e) => setTargetID(e.target.value)}
        />
        <TextField
          id="location_category"
          required
          label="Location Category"
          variant="outlined"
          placeholder="46.220588N 24.108810E"
          value={locationCategory}
          onChange={(e) => setLocationCategory(e.target.value)}
        />
        <TextField
          id="coll_start_time"
          required
          label=""
          variant="outlined"
          type={"datetime-local"}
          value={collStartTime}
          onChange={(e) => setCollStartTime(e.target.value)}
        />
        <TextField
          id="coll_end_time"
          required
          label=""
          variant="outlined"
          type={"datetime-local"}
          value={collEndTime}
          onChange={(e) => setCollEndTime(e.target.value)}
        />
      </Box>
    </Box>
  );
}

export default Home;
