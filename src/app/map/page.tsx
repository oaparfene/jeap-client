'use client'
import { Box, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useState } from "react";
import { LatLngExpression } from "leaflet";

function Home() {

    const location_data = [['Mannheim', [49.50004032, 8.50207514]],
    ['Karlsruhe', [49.0158491, 8.40953385]],
    ['Baden_Baden', [48.75732995, 8.21440805]],
    ['Buehl', [48.69282575, 8.14527]],
    ['Offenburg', [48.4747585, 7.94506255]],
    ['Lahr_Schwarzwald', [48.33432035, 7.88272955]],
    ['Loerrach', [48.33432035, 7.88272955]],
    ['Heidelberg', [49.4057284, 8.68361415]],
    ['Freiburg_im_Breisgau', [47.98731115, 7.79642005]]]

    const [location, setLocation] = useState<[number, number][]>([[0, 0]])

    const onSuccess = (pos: any) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        const accuracy = pos.coords.accuracy
        setLocation([lat, lng])
        console.log(location)
    }
    const onError = (err: any) => {
        console.error(err)
    }

    navigator.geolocation.watchPosition(onSuccess, onError);


    return (
        <>
            <Box sx={{ width: '95%', height: 1000, p: 3, m: 3 }}>
                <Typography
                    variant="h5"
                    component="h5"
                    sx={{ textAlign: 'left', mt: 0, mb: 3 }}
                >
                    Map View
                </Typography>
                <MapContainer style={{ height: '900px', width: '80wh' }} center={[48.69282575, 8.14527]} zoom={9} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {location_data.map((e) => {
                        return (
                            <Marker position={e[1] as LatLngExpression}>
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
        </>
    )
}

export default Home;