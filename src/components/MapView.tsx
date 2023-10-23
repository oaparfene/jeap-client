'use client'
import { Box, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
//import './style.css';

interface MapViewProps {
    title: string
    locationData: [string, [number, number]][]
    pathData: [number, number][][]
}

function MapView({ title, locationData, pathData }: MapViewProps) {
    let DefaultIcon = L.icon({
        iconUrl: icon.src,
        shadowUrl: iconShadow.src
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    const colors = ["yellow", "green", "blue", "orange", "red", "purple", "black", "white", "brown", "pink", "gray"]

    if (typeof window === 'undefined') {
        return <></>
    } else
        return (
            <Box sx={{ p: 0 }}>

                <Box sx={{ width: '95%', height: 1000, p: 0, m: 3 }}>
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{ textAlign: 'center', mt: 0, mb: 3 }}
                    >
                        {title}
                    </Typography>
                    <MapContainer style={{ height: '900px', width: '80wh' }} center={[48.69282575, 8.14527]} zoom={5} scrollWheelZoom={true}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {locationData.map((e) => {
                            return (
                                <Marker key={e.toString()} position={e[1] as LatLngExpression}>
                                    <Popup>
                                        {e[0].toString().replace("_", " ")}
                                    </Popup>
                                </Marker>
                            )
                        })}
                        {pathData.map((e, i) => {
                            return (
                                <Polyline key={i} pathOptions={{ color: colors[i % colors.length] }} positions={e}></Polyline>
                            )
                        })}
                    </MapContainer>
                </Box>
            </Box>
        )
}

export default MapView;