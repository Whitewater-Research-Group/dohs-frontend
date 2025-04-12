import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/Navbar";
import DashboardLayout from "../../../components/dashboardLayouts/Dashboard";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  CircleMarker,
  LayersControl,
  LayerGroup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import nigeriaGeoJson from "../../../geodata.json"; // Make sure to adjust the path

const sampleHealthData = [
  { id: 1, name: "Lagos", lat: 6.5244, lon: 3.3792, cases: 200 },
  { id: 2, name: "Abuja", lat: 9.0578, lon: 7.4951, cases: 120 },
  { id: 3, name: "Kano", lat: 12.0022, lon: 8.5919, cases: 90 },
  { id: 4, name: "Port Harcourt", lat: 4.8156, lon: 7.0498, cases: 60 },
  { id: 5, name: "Uniben", lat: 6.3998, lon: 5.6099, cases: 1 },
];

const healthIcon = new L.Icon({
  iconUrl:
    "https://th.bing.com/th/id/OIP.MPwEcSNvtMtQ79OVik-dagHaHa?w=162&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  iconSize: [25, 25],
});

function InteractiveMap() {
  const [healthData, setHealthData] = useState([]);
  const [stateColor, setStateColor] = useState("#90ee90");

  const mapRef = useRef(null);

  useEffect(() => {
    setHealthData(sampleHealthData);
  }, []);

  // const nigeriaBounds = L.geoJSON(nigeriaGeoJson).getBounds();

  const onEachFeature = (feature, layer) => {
    const { state, cases, id } = feature.properties;
    layer.bindPopup(`<strong>${state}</strong><br>Cases: ${cases}`);
    layer.on("mouseover", () => {
      layer.setStyle({
        fillOpacity: 0.7,
        weight: 2,
        fillColor: "blue",
      });
    });
    layer.on("mouseout", () => {
      layer.setStyle(stateStyle(feature));
    });
  };

  const stateStyle = (feature) => ({
    fillColor: "transparent",
    color: "black",
    weight: 2,
    fillOpacity: 0.1,
    opacity: 1,
  });

  return (
    <DashboardLayout>
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 64px)",
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={[9.082, 8.6753]} // Nigeria
          zoom={6}
          minZoom={5}
          maxZoom={10}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
            const bounds = L.geoJSON(nigeriaGeoJson).getBounds();
            mapInstance.fitBounds(bounds);
          }}
        >
          <LayersControl position="topright">
            {/* ✅ Base Layer: OpenStreetMap (default) */}
            <LayersControl.BaseLayer name="OpenStreetMap" checked>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            {/* ✅ Base Layer: Google Satellite */}
            <LayersControl.BaseLayer name="Google Satellite">
              <LayerGroup>
                <TileLayer
                  url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                  attribution="&copy; <a href='https://www.google.com/maps'>Google</a>"
                />
                <TileLayer
                  url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}" // Labels
                />
              </LayerGroup>
            </LayersControl.BaseLayer>

            {/* ✅ Overlay: Nigeria GeoJSON */}
            <LayersControl.Overlay name="Nigeria Map" checked>
              <GeoJSON
                data={nigeriaGeoJson}
                style={stateStyle}
                onEachFeature={onEachFeature}
              />
            </LayersControl.Overlay>

            {/* ✅ Overlay: Health Facilities */}
            <LayersControl.Overlay name="Health Facilities">
              <LayerGroup>
                <Marker position={[6.5244, 3.3792]} icon={healthIcon}>
                  <Popup>Lagos Health Facility</Popup>
                </Marker>
              </LayerGroup>
            </LayersControl.Overlay>

            {/* ✅ Overlay: Disease Outbreaks */}
            <LayersControl.Overlay name="Disease Outbreaks">
              <LayerGroup>
                {healthData.map((location) => (
                  <CircleMarker
                    key={location.id}
                    center={[location.lat, location.lon]}
                    radius={Math.log(location.cases) * 2}
                    fillOpacity={0.5}
                    color="red"
                  >
                    <Popup>
                      <strong>{location.name}</strong>
                      <br />
                      Cases: {location.cases}
                    </Popup>
                  </CircleMarker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    </DashboardLayout>
  );
}

export default InteractiveMap;

// TODO: Add the following features to the map
//   1) Display information on Nigeria states when clicked/hovered on
//   2) Add a legend to the map to explain the color coding of states
//   3) Add a search functionality to find specific locations or states
//   4) Add a button to reset the map view to the default state
//   5) Add a button to toggle between different map layers (e.g., satellite, terrain)
//   6) Add a button to download the map as an image or PDF
//   7) Add a button to print the map
//   8) Add a button to share the map on social media
//   9) Add a button to export the map data as CSV or JSON
//   10) Add a button to import custom GeoJSON data
//   11) Add a button to clear all markers and layers from the map
//   12) Add a button to save the current map view (zoom level, center position) for future reference
