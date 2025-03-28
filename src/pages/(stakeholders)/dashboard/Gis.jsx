import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, CircleMarker, LayersControl, LayerGroup } from "react-leaflet";
import Navbar from '../../../components/Navbar';
import DashboardLayout from '../../../components/dashboardLayouts/Dashboard';
import nigeriaGeoJson from '../../../geodata.json';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const healthIcon = new L.Icon({
  iconUrl: "https://th.bing.com/th/id/OIP.MPwEcSNvtMtQ79OVik-dagHaHa?w=162&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  iconSize: [25, 25],
});

const sampleHealthData = [
  { id: 1, name: "Lagos", lat: 6.5244, lon: 3.3792, cases: 200 },
  { id: 2, name: "Abuja", lat: 9.0578, lon: 7.4951, cases: 120 },
  { id: 3, name: "Kano", lat: 12.0022, lon: 8.5919, cases: 90 },
  { id: 4, name: "Port Harcourt", lat: 4.8156, lon: 7.0498, cases: 60 },
  { id: 5, name: "Uniben", lat: 6.3998, lon: 5.6099, cases: 1 },
];

function InteractiveMap() {
  // const [healthData, setHealthData] = useState([]);

  // useEffect(() => {
  //   setHealthData(sampleHealthData);
  // }, []);

  // const onEachFeature = (feature, layer) => {
  //   const { name } = feature.properties;
  //   layer.bindPopup(`<strong>${name}</strong>`);
  //   layer.on("mouseover", () => {
  //     layer.setStyle({ fillOpacity: 0.7, weight: 2, fillColor: "blue" });
  //   });
  //   layer.on("mouseout", () => {
  //     layer.setStyle({ fillOpacity: 1, weight: 1, fillColor: "white" });
  //   });
  // };

  const mapRef = useRef(null);
  const latitude = 51.505;
  const longitude = -0.09;


  return (
    <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} style={{height: "100vh", width: "100vw"}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* Additional map layers or components can be added here */}
  </MapContainer>
  );
}

export default InteractiveMap;
