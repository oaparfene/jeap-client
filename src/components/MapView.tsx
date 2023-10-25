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
    pathData: [string, [number, number][]][]
}

function MapView({ title, locationData, pathData }: MapViewProps) {
    let DefaultIcon = L.icon({
        iconUrl: icon.src,
        shadowUrl: iconShadow.src
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    const colors = ["#5e97f6", "#db4437", "#f2a600", "#0f9d58", "#ab47bc", "#00acc1", "#ff7043", "#9e9d24", "#5c6bc0", "#f06292", "#00796b", "#c2185b"]

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
                                <Marker key={e.toString()} position={e[1] as LatLngExpression}
                                eventHandlers={{
                                    mouseover: (e) => {
                                        e.target.openPopup()
                                    },
                                    mouseout: (e) => {
                                        e.target.closePopup()
                                    }
                                }}>
                                    <Popup>
                                        <h4 style={{
                                            whiteSpace: "pre-wrap",
                                        }}>

                                            {e[0].toString().replace("_", " ")}
                                        </h4>
                                    </Popup>
                                </Marker>
                            )
                        })}
                        {pathData.map((e, i) => {
                            return (
                                <Polyline key={i} pathOptions={{ color: colors[i % colors.length] }} positions={e[1] as LatLngExpression[]}
                                    children={<Popup>{e[0]}</Popup>}
                                    eventHandlers={{
                                        mouseover: (e) => {
                                            e.target.openPopup()
                                        },
                                        mouseout: (e) => {
                                            e.target.closePopup()
                                        }
                                    }}
                                ></Polyline>
                            )
                        })}
                    </MapContainer>
                </Box>
            </Box>
        )
}

export default MapView;