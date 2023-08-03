'use client'
import { Box, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useContext, useState } from "react";
import { LatLngExpression } from "leaflet";
import { JAPContext } from "../context";
import { PlanSelector } from "@/components/PlanSelector";

function Home() {

    const { plans, activePlanIndex, setActivePlanIndex, newPlan } = useContext(JAPContext)



    const location_data = [] as [string, [number, number]][]

    plans[activePlanIndex].allocation.forEach((task, i) => {
        location_data.push(['CR' + task.Requirement_to_Collect, [Number(task.Coordinates.split("N")[0]), Number(task.Coordinates.split(" ")[1].split("E")[0])]])
    })


    if (typeof window == 'undefined') {
        return <></>
    } else
        return (
            <Box sx={{ p: 8 }}>
                <Typography
                    variant="h4"
                    component="h4"
                    sx={{ textAlign: 'left', mt: 0, mb: 3 }}
                >Allocations:</Typography>

                <PlanSelector plans={plans} newPlan={newPlan} activePlanIndex={activePlanIndex} setActivePlanIndex={setActivePlanIndex} />
                <Box sx={{ width: '95%', height: 1000, p: 0, m: 3 }}>
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{ textAlign: 'center', mt: 0, mb: 3 }}
                    >
                        Map View:
                    </Typography>
                    <MapContainer style={{ height: '900px', width: '80wh' }} center={[48.69282575, 8.14527]} zoom={9} scrollWheelZoom={true}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {location_data.map((e) => {
                            return (
                                <Marker key={e.toString()} position={e[1] as LatLngExpression}>
                                    <Popup>
                                        {e[0].toString().replace("_", " ")}
                                    </Popup>
                                </Marker>
                            )
                        })}
                        <Polyline pathOptions={{ color: "yellow" }} positions={[[48.33432035, 7.88272955], [47.98731115, 7.79642005]]}></Polyline>
                        <Polyline pathOptions={{ color: "green" }} positions={[[49.0158491, 8.40953385], [47.98731115, 7.79642005]]}></Polyline>
                        <Polyline pathOptions={{ color: "blue" }} positions={[[48.4747585, 7.94506255], [49.4057284, 8.68361415]]}></Polyline>
                        <Polyline pathOptions={{ color: "orange" }} positions={[[48.33432035, 7.88272955], [49.4057284, 8.68361415]]}></Polyline>
                        <Polyline pathOptions={{ color: "red" }} positions={[[48.75732995, 8.21440805], [49.4057284, 8.68361415], [49.50004032, 8.50207514]]}></Polyline>
                    </MapContainer>
                </Box>
            </Box>
        )
}

export default Home;