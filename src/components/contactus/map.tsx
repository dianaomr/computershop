
"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position: [number, number] = [35.6892, 51.389];

export default function map() {
  return (
    <MapContainer center={position as [number, number]} zoom={12} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>تهران</Popup>
      </Marker>
    </MapContainer>
  );
}
