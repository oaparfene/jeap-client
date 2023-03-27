'use client'
import { Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useState } from "react";
import { LatLngExpression } from "leaflet";

function Home() {

    const [location, setLocation] = useState<[number, number][]>([[0,0]])

    const onSuccess = (pos: any) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        const accuracy = pos.coords.accuracy
        setLocation([lat,lng])
        console.log(location)
    }
    const onError = (err: any) => {
        console.error(err)
    }

    navigator.geolocation.watchPosition(onSuccess, onError);


    return (
        <>
            <Box sx={{ width: '95%', height: 900, p: 3, m: 3, border: '1px solid red'}}>
                <MapContainer style={{ height: '800px', width: '80wh' }} center={[52.10112, 4.3122688]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[52.10112, 4.3122688]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>
        </>
    )
}

export default Home;