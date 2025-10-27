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

// All case data (human, animal, environmental) will be fetched from API

function InteractiveMap() {
  const [healthData, setHealthData] = useState([]);
  const [humanCasesData, setHumanCasesData] = useState([]);
  const [animalCasesData, setAnimalCasesData] = useState([]);
  const [environmentalCasesData, setEnvironmentalCasesData] = useState([]);
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
  const [newCaseAlert, setNewCaseAlert] = useState(null);
  const [previousCaseCount, setPreviousCaseCount] = useState({
    human: 0,
    animal: 0,
    environmental: 0,
  });

  const mapRef = useRef(null);
  const audioRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const soundIntervalRef = useRef(null);
  const soundTimeoutRef = useRef(null);

  // Fetch human cases from API
  const fetchHumanCases = async (silent = false) => {
    try {
      if (!silent) {
        setIsLoading(true);
      }
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
        return transformedHumanCases;
      } else {
        setHumanCasesData([]);
        return [];
      }
    } catch (error) {
      console.error("Error fetching human cases:", error);
      setError(error.response?.data?.message || "Failed to fetch human cases");
      setHumanCasesData([]);
      return [];
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
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

  // Function to play alert sound repeatedly
  const playAlertSound = () => {
    // Clear any existing sound intervals/timeouts first
    stopAlertSound();

    // Create a simple beep sound using Web Audio API
    const playBeep = () => {
      try {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Set frequency for alert sound (higher pitch)
        oscillator.frequency.value = 800;
        oscillator.type = "sine";

        // Set volume
        gainNode.gain.value = 0.3;

        // Play sound
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);

        // Second beep
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);
        oscillator2.frequency.value = 1000;
        oscillator2.type = "sine";
        gainNode2.gain.value = 0.3;
        oscillator2.start(audioContext.currentTime + 0.4);
        oscillator2.stop(audioContext.currentTime + 0.7);

        console.log("Alert sound played");
      } catch (error) {
        console.log("Audio play failed:", error);
      }
    };

    // Play immediately
    playBeep();

    // Repeat every 3 seconds for 1 minute
    soundIntervalRef.current = setInterval(playBeep, 3000);

    // Stop after 1 minute
    soundTimeoutRef.current = setTimeout(() => {
      stopAlertSound();
      console.log("Alert sound stopped after 1 minute");
    }, 60000);
  };

  // Function to stop alert sound
  const stopAlertSound = () => {
    if (soundIntervalRef.current) {
      clearInterval(soundIntervalRef.current);
      soundIntervalRef.current = null;
    }
    if (soundTimeoutRef.current) {
      clearTimeout(soundTimeoutRef.current);
      soundTimeoutRef.current = null;
    }
    console.log("Alert sound stopped");
  };

  // Function to show new case notification
  const showNewCaseNotification = (caseData) => {
    setNewCaseAlert(caseData);
    playAlertSound();

    // Auto-hide notification after 1 minute (60 seconds)
    setTimeout(() => {
      setNewCaseAlert(null);
      stopAlertSound();
    }, 60000);
  };

  // Check for new cases and trigger alerts
  const checkForNewCases = (newHumanCases, newAnimalCases, newEnvCases) => {
    const currentCounts = {
      human: newHumanCases.length,
      animal: newAnimalCases.length,
      environmental: newEnvCases.length,
    };

    // Check if this is the initial load
    const isInitialLoad =
      previousCaseCount.human === 0 &&
      previousCaseCount.animal === 0 &&
      previousCaseCount.environmental === 0;

    if (!isInitialLoad) {
      // Check for new human cases
      if (currentCounts.human > previousCaseCount.human) {
        const newCases = newHumanCases.slice(
          0,
          currentCounts.human - previousCaseCount.human
        );
        newCases.forEach((caseData) => {
          showNewCaseNotification({
            ...caseData,
            message: `New Human Case Alert: ${caseData.disease}`,
          });
        });
      }

      // Check for new animal cases
      if (currentCounts.animal > previousCaseCount.animal) {
        const newCases = newAnimalCases.slice(
          0,
          currentCounts.animal - previousCaseCount.animal
        );
        newCases.forEach((caseData) => {
          showNewCaseNotification({
            ...caseData,
            message: `New Animal Case Alert: ${caseData.disease}`,
          });
        });
      }

      // Check for new environmental cases
      if (currentCounts.environmental > previousCaseCount.environmental) {
        const newCases = newEnvCases.slice(
          0,
          currentCounts.environmental - previousCaseCount.environmental
        );
        newCases.forEach((caseData) => {
          showNewCaseNotification({
            ...caseData,
            message: `New Environmental Case Alert: ${
              caseData.contaminant || caseData.disease
            }`,
          });
        });
      }
    }

    // Update previous counts
    setPreviousCaseCount(currentCounts);
  };

  // Fetch animal cases from API
  const fetchAnimalCases = async (silent = false) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        "https://backend.onehealth-wwrg.com/api/v1/reports/animal",
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

      console.log("Animal cases API response:", response.data);

      if (response.data) {
        const items = Array.isArray(response.data)
          ? response.data
          : response.data.items || [];

        const transformedAnimalCases = items.map((item, index) => ({
          id: item.id || index + 1,
          name: `${item.case_id} - ${item.disease}`,
          lat: item.latitude,
          lon: item.longitude,
          cases: 1,
          disease: item.disease,
          species: item.animal_type,
          severity: getSeverityFromClassification(item.classification),
          type: "animal",
          reportedDate: item.reported_at
            ? new Date(item.reported_at).toISOString().split("T")[0]
            : null,
          status: getStatusFromOutcome(item.outcome),
          caseId: item.case_id,
          animalType: item.animal_type,
          farmOwner: item.farm_owner,
          state: item.state,
          lga: item.lga,
          region: item.region,
          classification: item.classification,
          outcome: item.outcome,
        }));

        setAnimalCasesData(transformedAnimalCases);
        console.log("Transformed animal cases:", transformedAnimalCases);
        return transformedAnimalCases;
      } else {
        setAnimalCasesData([]);
        return [];
      }
    } catch (error) {
      console.error("Error fetching animal cases:", error);
      setAnimalCasesData([]);
      return [];
    }
  };

  // Fetch environmental cases from API
  const fetchEnvironmentalCases = async (silent = false) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        "https://backend.onehealth-wwrg.com/api/v1/reports/env",
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

      console.log("Environmental cases API response:", response.data);

      if (response.data) {
        const items = Array.isArray(response.data)
          ? response.data
          : response.data.items || [];

        const transformedEnvCases = items.map((item, index) => ({
          id: item.id || index + 1,
          name: `${item.case_id} - ${item.environmental_factors}`,
          lat: item.latitude,
          lon: item.longitude,
          cases: 1,
          disease: item.disease,
          contaminant: item.environmental_factors,
          severity: getSeverityFromClassification(item.classification),
          type: "environmental",
          reportedDate: item.reported_at
            ? new Date(item.reported_at).toISOString().split("T")[0]
            : null,
          status: item.sample_collected ? "assessment" : "pending",
          caseId: item.case_id,
          environmentalFactors: item.environmental_factors,
          sampleCollected: item.sample_collected,
          labResults: item.lab_results,
          state: item.state,
          lga: item.lga,
          region: item.region,
          classification: item.classification,
          outcome: item.outcome,
        }));

        setEnvironmentalCasesData(transformedEnvCases);
        console.log("Transformed environmental cases:", transformedEnvCases);
        return transformedEnvCases;
      } else {
        setEnvironmentalCasesData([]);
        return [];
      }
    } catch (error) {
      console.error("Error fetching environmental cases:", error);
      setEnvironmentalCasesData([]);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllCases = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [humanCases, animalCases, envCases] = await Promise.all([
          fetchHumanCases(),
          fetchAnimalCases(),
          fetchEnvironmentalCases(),
        ]);

        // Initialize case counts on first load
        checkForNewCases(humanCases, animalCases, envCases);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCases();
  }, []);

  // Real-time polling effect - checks for new cases every 10 seconds
  useEffect(() => {
    const pollForNewCases = async () => {
      try {
        const [humanCases, animalCases, envCases] = await Promise.all([
          fetchHumanCases(true), // silent mode - no loading spinner
          fetchAnimalCases(true),
          fetchEnvironmentalCases(true),
        ]);

        // Check for new cases and trigger alerts
        checkForNewCases(humanCases, animalCases, envCases);
      } catch (error) {
        console.error("Error polling for new cases:", error);
      }
    };

    // Set up polling interval (10 seconds)
    pollingIntervalRef.current = setInterval(pollForNewCases, 10000);

    // Cleanup on unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [humanCasesData, animalCasesData, environmentalCasesData]);

  // Function to refresh all data manually
  const refreshAllData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [humanCases, animalCases, envCases] = await Promise.all([
        fetchHumanCases(),
        fetchAnimalCases(),
        fetchEnvironmentalCases(),
      ]);

      // Check for new cases
      checkForNewCases(humanCases, animalCases, envCases);
    } catch (error) {
      console.error("Error refreshing cases:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Combine all case data when any cases are loaded
  useEffect(() => {
    const allCasesData = [
      ...humanCasesData,
      ...animalCasesData,
      ...environmentalCasesData,
    ];
    setHealthData(allCasesData);
    console.log("Combined all cases:", allCasesData);
  }, [humanCasesData, animalCasesData, environmentalCasesData]);

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
                  onClick={refreshAllData}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  title="Refresh All Cases Data"
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
                      (item) =>
                        item.type === "human" &&
                        visibleLayers.human &&
                        item.lat != null &&
                        item.lon != null
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
                                {caseData.lat?.toFixed(4) ?? "N/A"},{" "}
                                {caseData.lon?.toFixed(4) ?? "N/A"}
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
                      (item) =>
                        item.type === "animal" &&
                        visibleLayers.animal &&
                        item.lat != null &&
                        item.lon != null
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
                                {caseData.lat?.toFixed(4) ?? "N/A"},{" "}
                                {caseData.lon?.toFixed(4) ?? "N/A"}
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
                        visibleLayers.environmental &&
                        item.lat != null &&
                        item.lon != null
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
                                    {caseData.lat?.toFixed(4) ?? "N/A"},{" "}
                                    {caseData.lon?.toFixed(4) ?? "N/A"}
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

        {/* New Case Alert Notification */}
        {newCaseAlert && (
          <div
            className="fixed top-20 right-4 z-[10000]"
            style={{ animation: "bounce 1s infinite" }}
          >
            <div
              className="bg-red-600 px-6 py-5 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-w-md border-4 border-yellow-400"
              style={{ backgroundColor: "#dc2626", opacity: 1 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div
                    className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse shadow-lg"
                    style={{ backgroundColor: "#facc15" }}
                  >
                    {newCaseAlert.type === "human" && (
                      <Users className="w-7 h-7 text-red-700" />
                    )}
                    {newCaseAlert.type === "animal" && (
                      <PawPrint className="w-7 h-7 text-green-700" />
                    )}
                    {newCaseAlert.type === "environmental" && (
                      <Leaf className="w-7 h-7 text-emerald-700" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className="font-black text-2xl mb-3 tracking-wide"
                    style={{ color: "#fef08a" }}
                  >
                    🚨 NEW CASE ALERT!
                  </h3>
                  <p
                    className="text-lg font-bold mb-4"
                    style={{ color: "#ffffff" }}
                  >
                    {newCaseAlert.message}
                  </p>
                  <div
                    className="text-base space-y-3 bg-red-800 p-4 rounded-lg border-2 border-red-900"
                    style={{ backgroundColor: "#991b1b" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold" style={{ color: "#fde047" }}>
                        📍 Location:
                      </span>{" "}
                      <span
                        className="font-semibold"
                        style={{ color: "#f3f4f6" }}
                      >
                        {newCaseAlert.state}, {newCaseAlert.lga}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold" style={{ color: "#fde047" }}>
                        ⚠️ Severity:
                      </span>{" "}
                      <span
                        className="uppercase font-black px-3 py-1 rounded-md"
                        style={{ color: "#ffffff", backgroundColor: "#ea580c" }}
                      >
                        {newCaseAlert.severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold" style={{ color: "#fde047" }}>
                        🕐 Time:
                      </span>{" "}
                      <span
                        className="font-semibold"
                        style={{ color: "#f3f4f6" }}
                      >
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setNewCaseAlert(null);
                    stopAlertSound();
                  }}
                  className="rounded-full w-10 h-10 flex items-center justify-center font-black text-4xl leading-none transition-all duration-200 hover:scale-110"
                  style={{
                    color: "#fef08a",
                    backgroundColor: "rgba(153, 27, 27, 0.5)",
                  }}
                  title="Close alert"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Audio Element for Alert Sound */}
        <audio
          ref={audioRef}
          src="data:audio/wav;base64,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"
        />
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
//   13) Add icons (with different colors) for the different disease cases ✅
