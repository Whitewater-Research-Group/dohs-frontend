import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import DashboardLayout from '../../../components/dashboardLayouts/Dashboard';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, CircleMarker, LayersControl, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import nigeriaGeoJson from '../../../geodata.json'; // Make sure to adjust the path

const sampleHealthData = [
  { id: 1, name: "Lagos", lat: 6.5244, lon: 3.3792, cases: 200 },
  { id: 2, name: "Abuja", lat: 9.0578, lon: 7.4951, cases: 120 },
  { id: 3, name: "Kano", lat: 12.0022, lon: 8.5919, cases: 90 },
  { id: 4, name: "Port Harcourt", lat: 4.8156, lon: 7.0498, cases: 60 },
  { id: 5, name: "Uniben", lat: 6.3998, lon: 5.6099, cases: 1 },
];

const healthIcon = new L.Icon({
  iconUrl: "https://th.bing.com/th/id/OIP.MPwEcSNvtMtQ79OVik-dagHaHa?w=162&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  iconSize: [25, 25],
});

function InteractiveMap() {
  const [healthData, setHealthData] = useState([]);
  const [stateColor, setStateColor] = useState('#90ee90');

  useEffect(() => {
    setHealthData(sampleHealthData);
  }, []);

  const nigeriaBounds = [
    [4.2406, 2.6917],
    [13.8659, 14.6801],
  ];

  const onEachFeature = (feature, layer) => {
    const { state, cases, id } = feature.properties;
    layer.bindPopup(`<strong>${state}</strong><br>Cases: ${cases}`);
    layer.on('mouseover', () => {
      layer.setStyle({
        fillOpacity: 0.7,
        weight: 2,
        fillColor: "blue",
      });
    });
    layer.on('mouseout', () => {
      layer.setStyle({
        fillOpacity: 1,
        weight: 1,
        fillColor: "white"
      });
    });
  };

  const stateStyle = (feature) => ({
    fillColor: 'white',
    color: feature.properties.stroke,
    weight: feature.properties['stroke-width'],
    fillOpacity: 1,
    opacity: feature.properties['stroke-opacity']
  });

  return (
    <DashboardLayout>
      <div style={{ width: "100%", height: "calc(100vh - 64px)", overflow: "hidden" }}>
        <MapContainer 
          bounds={nigeriaBounds} 
          minZoom={5} 
          maxZoom={10} 
          style={{ height: "100%", width: "100%", backgroundColor: "#E5E4E2" }}
        >
          <GeoJSON data={nigeriaGeoJson} style={stateStyle} onEachFeature={onEachFeature} />

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

          <LayersControl position="topright">
            <LayersControl.Overlay name="Health Facilities">
              <LayerGroup>
                <Marker position={[6.5244, 3.3792]} icon={healthIcon}>
                  <Popup>Lagos Health Facility</Popup>
                </Marker>
              </LayerGroup>
            </LayersControl.Overlay>

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