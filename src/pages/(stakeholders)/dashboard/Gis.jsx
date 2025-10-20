import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/Navbar";
import DashboardLayout from "../../../components/dashboardLayouts/Dashboard";
import axios from "axios";
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
  Tooltip,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import nigeriaGeoJson from "../../../geodata.json";
import {
  Search,
  Filter,
  RefreshCw,
  Users,
  PawPrint,
  Leaf,
  BarChart3,
  Eye,
  EyeOff,
} from "lucide-react";

// Multi-layer case data for One Health surveillance
// Human cases will be fetched from API

const animalCasesData = [
  {
    id: 5,
    name: "Green Valley Farm - FMD",
    lat: 6.6018,
    lon: 3.3515,
    cases: 45,
    disease: "Foot and Mouth Disease",
    species: "Cattle",
    severity: "high",
    type: "animal",
    farmOwner: "Ahmed Hassan",
    reportedDate: "2024-08-18",
    status: "quarantined",
  },
  {
    id: 6,
    name: "Sunrise Poultry - Avian Flu",
    lat: 7.1475,
    lon: 3.3619,
    cases: 2000,
    disease: "Avian Influenza H5N1",
    species: "Poultry",
    severity: "critical",
    type: "animal",
    farmOwner: "Grace Adebayo",
    reportedDate: "2024-08-19",
    status: "culling",
  },
  {
    id: 7,
    name: "Northern Livestock - PPR",
    lat: 11.5804,
    lon: 8.9971,
    cases: 120,
    disease: "Peste des Petits Ruminants",
    species: "Goats",
    severity: "medium",
    type: "animal",
    farmOwner: "Musa Ibrahim",
    reportedDate: "2024-08-16",
    status: "treatment",
  },
  {
    id: 8,
    name: "Coastal Fish Farm - VHS",
    lat: 5.2058,
    lon: 6.7013,
    cases: 500,
    disease: "Viral Hemorrhagic Septicemia",
    species: "Fish",
    severity: "high",
    type: "animal",
    farmOwner: "Johnson Okoro",
    reportedDate: "2024-08-17",
    status: "isolation",
  },
];

const environmentalCasesData = [
  {
    id: 9,
    name: "Victoria Island Water Contamination",
    lat: 6.4281,
    lon: 3.4219,
    cases: 5000,
    contaminant: "Lead",
    incidentType: "Water Contamination",
    severity: "critical",
    type: "environmental",
    affectedRadius: 2000, // meters
    reportedDate: "2024-08-14",
    status: "remediation",
  },
  {
    id: 10,
    name: "Ikeja Industrial Air Pollution",
    lat: 6.5924,
    lon: 3.3374,
    cases: 3200,
    contaminant: "PM2.5",
    incidentType: "Air Pollution",
    severity: "high",
    type: "environmental",
    affectedRadius: 1500,
    reportedDate: "2024-08-13",
    status: "monitoring",
  },
  {
    id: 11,
    name: "Niger River Oil Spill",
    lat: 4.9247,
    lon: 6.2712,
    cases: 8000,
    contaminant: "Crude Oil",
    incidentType: "Water Body Contamination",
    severity: "critical",
    type: "environmental",
    affectedRadius: 5000,
    reportedDate: "2024-08-11",
    status: "cleanup",
  },
  {
    id: 12,
    name: "Kaduna Soil Contamination",
    lat: 10.5105,
    lon: 7.4165,
    cases: 1200,
    contaminant: "Heavy Metals",
    incidentType: "Soil Contamination",
    severity: "medium",
    type: "environmental",
    affectedRadius: 800,
    reportedDate: "2024-08-09",
    status: "assessment",
  },
];

function InteractiveMap() {
  const [healthData, setHealthData] = useState([]);
  const [humanCasesData, setHumanCasesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stateColor, setStateColor] = useState("#90ee90");
  const [showControls, setShowControls] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    caseType: "all", // all, human, animal, environmental
    severity: "all", // all, low, medium, high, critical
    status: "all", // all, active, contained, monitoring, etc.
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleLayers, setVisibleLayers] = useState({
    human: true,
    animal: true,
    environmental: true,
  });

  const mapRef = useRef(null);

  // Fetch human cases from API
  const fetchHumanCases = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        "https://backend.onehealth-wwrg.com/api/v1/reports/health",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
            page_size: 100,
            sort_by: "created_at",
            sort_order: "desc",
          },
        }
      );

      console.log("Human cases API response:", response.data);

      if (response.data && response.data.items) {
        // Transform API data to match expected structure
        const transformedHumanCases = response.data.items.map(
          (item, index) => ({
            id: item.id || index + 1,
            name: `${item.case_id} - ${item.disease}`,
            lat: item.latitude,
            lon: item.longitude,
            cases: 1, // Each item is one case
            disease: item.disease,
            severity: getSeverityFromClassification(item.classification),
            type: "human",
            reportedDate: item.reported_at
              ? new Date(item.reported_at).toISOString().split("T")[0]
              : null,
            status: getStatusFromOutcome(item.outcome),
            // Additional fields from API
            caseId: item.case_id,
            personID: item.personID,
            age: item.age,
            sex: item.sex,
            state: item.state,
            lga: item.lga,
            region: item.region,
            healthFacility: item.health_facility,
            reportingSource: item.reporting_source,
            symptoms: item.symptoms,
            riskFactors: item.risk_factors,
            classification: item.classification,
            outcome: item.outcome,
            dateOfOnset: item.date_of_onset,
            dateOfConfirmation: item.date_of_confirmation,
            occupation: item.occupation,
          })
        );

        setHumanCasesData(transformedHumanCases);
        console.log("Transformed human cases:", transformedHumanCases);
      } else {
        setHumanCasesData([]);
      }
    } catch (error) {
      console.error("Error fetching human cases:", error);
      setError(error.response?.data?.message || "Failed to fetch human cases");
      setHumanCasesData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to map classification to severity
  const getSeverityFromClassification = (classification) => {
    switch (classification?.toLowerCase()) {
      case "confirmed":
        return "critical";
      case "probable":
        return "high";
      case "suspect":
        return "medium";
      default:
        return "low";
    }
  };

  // Helper function to map outcome to status
  const getStatusFromOutcome = (outcome) => {
    switch (outcome?.toLowerCase()) {
      case "deceased":
        return "critical";
      case "recovered":
        return "contained";
      case "under treatment":
        return "active";
      default:
        return "monitoring";
    }
  };

  useEffect(() => {
    fetchHumanCases();
  }, []);

  // Combine all case data when human cases are loaded
  useEffect(() => {
    const allCasesData = [
      ...humanCasesData,
      ...animalCasesData,
      ...environmentalCasesData,
    ];
    setHealthData(allCasesData);
  }, [humanCasesData]);

  // Filter data based on active filters and search
  const filteredData = healthData.filter((item) => {
    const typeMatch =
      activeFilters.caseType === "all" || item.type === activeFilters.caseType;
    const severityMatch =
      activeFilters.severity === "all" ||
      item.severity === activeFilters.severity;
    const statusMatch =
      activeFilters.status === "all" || item.status === activeFilters.status;
    const searchMatch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.disease &&
        item.disease.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.contaminant &&
        item.contaminant.toLowerCase().includes(searchTerm.toLowerCase()));

    return typeMatch && severityMatch && statusMatch && searchMatch;
  });

  // Calculate statistics
  const stats = {
    total: filteredData.length,
    human: filteredData.filter((item) => item.type === "human").length,
    animal: filteredData.filter((item) => item.type === "animal").length,
    environmental: filteredData.filter((item) => item.type === "environmental")
      .length,
    critical: filteredData.filter((item) => item.severity === "critical")
      .length,
    active: filteredData.filter((item) => item.status === "active").length,
  };

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

  // Enhanced icon system with case-type specific colors and severity indicators
  const createCaseIcon = (caseType, severity) => {
    let baseColor = "blue";
    let size = [25, 41]; // Default size

    // Primary color based on case type
    switch (caseType) {
      case "human":
        baseColor = "blue";
        break;
      case "animal":
        baseColor = "green";
        break;
      case "environmental":
        baseColor = "violet"; // Using violet for environmental
        break;
      default:
        baseColor = "grey";
    }

    // Adjust marker size based on severity for additional visual cue
    switch (severity) {
      case "critical":
        size = [35, 51]; // Larger for critical cases
        break;
      case "high":
        size = [30, 46]; // Medium-large for high severity
        break;
      case "medium":
        size = [25, 41]; // Standard size
        break;
      case "low":
        size = [20, 31]; // Smaller for low severity
        break;
    }

    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${baseColor}.png`,
      iconSize: size,
      iconAnchor: [size[0] / 2, size[1]],
      popupAnchor: [1, -size[1] + 10],
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      shadowSize: [size[0] + 16, size[1]],
    });
  };

  // Create impact radius circles for environmental cases with case-type specific colors
  const createImpactCircle = (environmentalCase) => {
    let color = "#8e44ad"; // Purple for environmental consistency
    let opacity = 0.3;

    switch (environmentalCase.severity) {
      case "critical":
        opacity = 0.5;
        break;
      case "high":
        opacity = 0.4;
        break;
      case "medium":
        opacity = 0.3;
        break;
      case "low":
        opacity = 0.2;
        break;
    }

    return {
      center: [environmentalCase.lat, environmentalCase.lon],
      radius: environmentalCase.affectedRadius || 1000,
      pathOptions: {
        color: color,
        fillColor: color,
        fillOpacity: opacity,
        weight: 3,
      },
    };
  };

  // Show loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Map Data
          </h2>
          <p className="text-gray-600">
            Fetching real-time health surveillance data...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-semibold text-red-900 mb-2">
              Error Loading Data
            </h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={fetchHumanCases}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        {/* Enhanced Control Panel */}
        {showControls && (
          <div className="bg-white shadow-lg border-b border-gray-200 p-4 z-10">
            {/* Statistics Dashboard */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex gap-4">
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">
                    Total Cases
                  </div>
                  <div className="text-xl font-bold text-blue-800">
                    {stats.total}
                  </div>
                  <div className="text-xs text-blue-500 mt-1">
                    {humanCasesData.length > 0 ? "Live Data" : "No Data"}
                  </div>
                </div>
                <div className="bg-red-50 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Users className="w-4 h-4 text-red-600" />
                  <div>
                    <div className="text-sm text-red-600 font-medium">
                      Human
                    </div>
                    <div className="text-xl font-bold text-red-800">
                      {stats.human}
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-lg flex items-center gap-2">
                  <PawPrint className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="text-sm text-green-600 font-medium">
                      Animal
                    </div>
                    <div className="text-xl font-bold text-green-800">
                      {stats.animal}
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-purple-600" />
                  <div>
                    <div className="text-sm text-purple-600 font-medium">
                      Environmental
                    </div>
                    <div className="text-xl font-bold text-purple-800">
                      {stats.environmental}
                    </div>
                  </div>
                </div>
                <div className="bg-red-100 px-4 py-2 rounded-lg">
                  <div className="text-sm text-red-700 font-medium">
                    Critical
                  </div>
                  <div className="text-xl font-bold text-red-900">
                    {stats.critical}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={fetchHumanCases}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  title="Refresh Human Cases Data"
                  disabled={isLoading}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                  />
                  Refresh Data
                </button>
                <button
                  onClick={() => setShowControls(false)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <EyeOff className="w-4 h-4" />
                  Hide Panel
                </button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cases, diseases, contaminants..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={activeFilters.caseType}
                onChange={(e) =>
                  setActiveFilters((prev) => ({
                    ...prev,
                    caseType: e.target.value,
                  }))
                }
              >
                <option value="all">All Case Types</option>
                <option value="human">Human Cases</option>
                <option value="animal">Animal Cases</option>
                <option value="environmental">Environmental Cases</option>
              </select>

              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={activeFilters.severity}
                onChange={(e) =>
                  setActiveFilters((prev) => ({
                    ...prev,
                    severity: e.target.value,
                  }))
                }
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={activeFilters.status}
                onChange={(e) =>
                  setActiveFilters((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="contained">Contained</option>
                <option value="monitoring">Monitoring</option>
                <option value="quarantined">Quarantined</option>
                <option value="remediation">Remediation</option>
              </select>

              <button
                onClick={() => {
                  setActiveFilters({
                    caseType: "all",
                    severity: "all",
                    status: "all",
                  });
                  setSearchTerm("");
                }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* Layer Visibility Controls */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Visible Layers:
              </span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={visibleLayers.human}
                  onChange={(e) =>
                    setVisibleLayers((prev) => ({
                      ...prev,
                      human: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <Users className="w-4 h-4 text-red-600" />
                <span className="text-sm">Human Cases</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={visibleLayers.animal}
                  onChange={(e) =>
                    setVisibleLayers((prev) => ({
                      ...prev,
                      animal: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <PawPrint className="w-4 h-4 text-green-600" />
                <span className="text-sm">Animal Cases</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={visibleLayers.environmental}
                  onChange={(e) =>
                    setVisibleLayers((prev) => ({
                      ...prev,
                      environmental: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <Leaf className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Environmental Cases</span>
              </label>
            </div>

            {/* Enhanced Legend */}
            <div className="mt-4 border-t pt-3 space-y-3">
              <div className="flex items-center gap-6 text-sm">
                <div className="font-medium text-gray-700">
                  Case Type Colors:
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Human Cases</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <PawPrint className="w-4 h-4 text-green-600" />
                  <span>Animal Cases</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <Leaf className="w-4 h-4 text-purple-600" />
                  <span>Environmental Cases</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="font-medium text-gray-700">
                  Severity Indicators:
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                  <span>Critical (Large)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                  </div>
                  <span>High (Medium)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-gray-400 rounded flex items-center justify-center">
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                  <span>Medium (Standard)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 border-2 border-gray-400 rounded"></div>
                  <span>Low (Small)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Show Controls Button */}
        {!showControls && (
          <button
            onClick={() => setShowControls(true)}
            className="absolute top-4 left-4 z-[1000] flex items-center gap-2 px-3 py-2 bg-white shadow-lg rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Show Controls
          </button>
        )}

        {/* Enhanced Map */}
        <div
          style={{
            width: "100%",
            height: showControls ? "calc(100vh - 280px)" : "calc(100vh - 64px)",
            overflow: "hidden",
          }}
        >
          <MapContainer
            center={[9.082, 8.6753]}
            zoom={6}
            minZoom={5}
            maxZoom={15}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <LayersControl position="topright">
              {/* Base Layers */}
              <LayersControl.BaseLayer name="OpenStreetMap" checked>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="Google Satellite">
                <LayerGroup>
                  <TileLayer
                    url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                    attribution="&copy; <a href='https://www.google.com/maps'>Google</a>"
                  />
                  <TileLayer url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}" />
                </LayerGroup>
              </LayersControl.BaseLayer>

              {/* Nigeria Boundaries */}
              <LayersControl.Overlay name="Nigeria Boundaries" checked>
                <GeoJSON
                  data={nigeriaGeoJson}
                  style={stateStyle}
                  onEachFeature={onEachFeature}
                />
              </LayersControl.Overlay>

              {/* Human Cases Layer */}
              <LayersControl.Overlay name="Human Health Cases" checked>
                <LayerGroup>
                  {filteredData
                    .filter(
                      (item) => item.type === "human" && visibleLayers.human
                    )
                    .map((caseData) => (
                      <Marker
                        key={caseData.id}
                        position={[caseData.lat, caseData.lon]}
                        icon={createCaseIcon(caseData.type, caseData.severity)}
                      >
                        <Popup maxWidth={350}>
                          <div className="p-3">
                            <h3 className="font-bold text-lg mb-2 text-red-800">
                              <Users className="w-5 h-5 inline mr-2" />
                              {caseData.name}
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div>
                                <strong>Disease:</strong> {caseData.disease}
                              </div>
                              <div>
                                <strong>Cases:</strong>{" "}
                                {caseData.cases.toLocaleString()}
                              </div>
                              <div>
                                <strong>Severity:</strong>
                                <span
                                  className={`ml-1 px-2 py-1 rounded text-xs font-bold ${
                                    caseData.severity === "critical"
                                      ? "bg-red-100 text-red-800"
                                      : caseData.severity === "high"
                                      ? "bg-orange-100 text-orange-800"
                                      : caseData.severity === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {caseData.severity.toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <strong>Status:</strong>
                                <span className="ml-1 px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                                  {caseData.status.toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <strong>Reported:</strong>{" "}
                                {caseData.reportedDate}
                              </div>
                              <div className="text-gray-500">
                                <strong>Coordinates:</strong>{" "}
                                {caseData.lat.toFixed(4)},{" "}
                                {caseData.lon.toFixed(4)}
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                </LayerGroup>
              </LayersControl.Overlay>

              {/* Animal Cases Layer */}
              <LayersControl.Overlay name="Animal Health Cases" checked>
                <LayerGroup>
                  {filteredData
                    .filter(
                      (item) => item.type === "animal" && visibleLayers.animal
                    )
                    .map((caseData) => (
                      <Marker
                        key={caseData.id}
                        position={[caseData.lat, caseData.lon]}
                        icon={createCaseIcon(caseData.type, caseData.severity)}
                      >
                        <Popup maxWidth={350}>
                          <div className="p-3">
                            <h3 className="font-bold text-lg mb-2 text-green-800">
                              <PawPrint className="w-5 h-5 inline mr-2" />
                              {caseData.name}
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div>
                                <strong>Disease:</strong> {caseData.disease}
                              </div>
                              <div>
                                <strong>Species:</strong> {caseData.species}
                              </div>
                              <div>
                                <strong>Affected Animals:</strong>{" "}
                                {caseData.cases.toLocaleString()}
                              </div>
                              <div>
                                <strong>Farm Owner:</strong>{" "}
                                {caseData.farmOwner}
                              </div>
                              <div>
                                <strong>Severity:</strong>
                                <span
                                  className={`ml-1 px-2 py-1 rounded text-xs font-bold ${
                                    caseData.severity === "critical"
                                      ? "bg-red-100 text-red-800"
                                      : caseData.severity === "high"
                                      ? "bg-orange-100 text-orange-800"
                                      : caseData.severity === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {caseData.severity.toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <strong>Status:</strong>
                                <span className="ml-1 px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                                  {caseData.status.toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <strong>Reported:</strong>{" "}
                                {caseData.reportedDate}
                              </div>
                              <div className="text-gray-500">
                                <strong>Coordinates:</strong>{" "}
                                {caseData.lat.toFixed(4)},{" "}
                                {caseData.lon.toFixed(4)}
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                </LayerGroup>
              </LayersControl.Overlay>

              {/* Environmental Cases Layer with Impact Circles */}
              <LayersControl.Overlay name="Environmental Cases" checked>
                <LayerGroup>
                  {filteredData
                    .filter(
                      (item) =>
                        item.type === "environmental" &&
                        visibleLayers.environmental
                    )
                    .map((caseData) => {
                      const circleProps = createImpactCircle(caseData);
                      return (
                        <React.Fragment key={caseData.id}>
                          {/* Impact Radius Circle */}
                          <Circle
                            center={circleProps.center}
                            radius={circleProps.radius}
                            pathOptions={circleProps.pathOptions}
                          >
                            <Tooltip>
                              Impact Radius:{" "}
                              {(circleProps.radius / 1000).toFixed(1)} km
                            </Tooltip>
                          </Circle>

                          {/* Marker */}
                          <Marker
                            position={[caseData.lat, caseData.lon]}
                            icon={createCaseIcon(
                              caseData.type,
                              caseData.severity
                            )}
                          >
                            <Popup maxWidth={350}>
                              <div className="p-3">
                                <h3 className="font-bold text-lg mb-2 text-purple-800">
                                  <Leaf className="w-5 h-5 inline mr-2" />
                                  {caseData.name}
                                </h3>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <strong>Incident Type:</strong>{" "}
                                    {caseData.incidentType}
                                  </div>
                                  <div>
                                    <strong>Contaminant:</strong>{" "}
                                    {caseData.contaminant}
                                  </div>
                                  <div>
                                    <strong>Affected Population:</strong>{" "}
                                    {caseData.cases.toLocaleString()}
                                  </div>
                                  <div>
                                    <strong>Impact Radius:</strong>{" "}
                                    {(caseData.affectedRadius / 1000).toFixed(
                                      1
                                    )}{" "}
                                    km
                                  </div>
                                  <div>
                                    <strong>Severity:</strong>
                                    <span
                                      className={`ml-1 px-2 py-1 rounded text-xs font-bold ${
                                        caseData.severity === "critical"
                                          ? "bg-red-100 text-red-800"
                                          : caseData.severity === "high"
                                          ? "bg-orange-100 text-orange-800"
                                          : caseData.severity === "medium"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {caseData.severity.toUpperCase()}
                                    </span>
                                  </div>
                                  <div>
                                    <strong>Status:</strong>
                                    <span className="ml-1 px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                                      {caseData.status.toUpperCase()}
                                    </span>
                                  </div>
                                  <div>
                                    <strong>Reported:</strong>{" "}
                                    {caseData.reportedDate}
                                  </div>
                                  <div className="text-gray-500">
                                    <strong>Coordinates:</strong>{" "}
                                    {caseData.lat.toFixed(4)},{" "}
                                    {caseData.lon.toFixed(4)}
                                  </div>
                                </div>
                              </div>
                            </Popup>
                          </Marker>
                        </React.Fragment>
                      );
                    })}
                </LayerGroup>
              </LayersControl.Overlay>
            </LayersControl>
          </MapContainer>
        </div>
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
//   13) Add icons (with different colrs) for the different disease cases ✅
