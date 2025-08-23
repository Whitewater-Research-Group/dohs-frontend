import React, { useState, useMemo, useEffect } from "react";
import DashboardLayout from "../../../components/dashboardLayouts/Dashboard";
import axios from "axios";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  MapPin,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  Save,
} from "lucide-react";

const mockCases = [
  {
    caseId: "XYILBD",
    epidNumber: "LOS-ND-25-001",
    internalToken: "INT-001",
    disease: "Yellow Fever",
    diseaseVariant: "Wild Type",
    caseClassification: "Confirmed case",
    outcome: "Recovered",
    investigationStatus: "Investigation done",
    personId: "SOVGLQ",
    firstName: "Elliana",
    lastName: "Johnson",
    state: "Lagos",
    lga: "Lagos Island",
    healthFacility: "Lagos University Teaching Hospital",
    region: "South West",
    dateOfOnset: "2025-01-15",
    dateOfConfirmation: "2025-01-18",
    reportingSource: "Hospital Report",
    age: 34,
    sex: "Female",
    occupation: "Teacher",
    symptoms: "Fever, Jaundice, Headache",
    riskFactors: "Travel to endemic area",
    category: "High Risk",
    dateReported: "2025-01-16",
    contactNumber: "+234-801-234-5678",
  },
  {
    caseId: "SMUIMI",
    epidNumber: "LOS---25-081",
    internalToken: "INT-002",
    disease: "COVID-19",
    diseaseVariant: "Omicron",
    caseClassification: "Suspect case",
    outcome: "No Outcome Yet",
    investigationStatus: "Investigation pending",
    personId: "TMWNQS",
    firstName: "James",
    lastName: "Adebayo",
    state: "Lagos",
    lga: "Ikeja",
    healthFacility: "General Hospital Ikeja",
    region: "South West",
    dateOfOnset: "2025-01-20",
    dateOfConfirmation: null,
    reportingSource: "Community Report",
    age: 28,
    sex: "Male",
    occupation: "Engineer",
    symptoms: "Cough, Fever, Loss of taste",
    riskFactors: "Close contact with confirmed case",
    category: "Medium Risk",
    dateReported: "2025-01-21",
    contactNumber: "+234-802-345-6789",
  },
  {
    caseId: "UOZL3G",
    epidNumber: "LOS---25-080",
    internalToken: "INT-003",
    disease: "Measles",
    diseaseVariant: "Wild Type",
    caseClassification: "Confirmed case",
    outcome: "Recovered",
    investigationStatus: "Investigation done",
    personId: "UGBWTB",
    firstName: "Kofi",
    lastName: "Mensah",
    state: "Ogun",
    lga: "Abeokuta South",
    healthFacility: "State Hospital Abeokuta",
    region: "South West",
    dateOfOnset: "2025-01-10",
    dateOfConfirmation: "2025-01-12",
    reportingSource: "Laboratory Report",
    age: 6,
    sex: "Male",
    occupation: "Student",
    symptoms: "Rash, Fever, Cough",
    riskFactors: "Unvaccinated",
    category: "High Risk",
    dateReported: "2025-01-11",
    contactNumber: "+234-803-456-7890",
  },
  {
    caseId: "QFC5QI",
    epidNumber: "LOS---25-079",
    internalToken: "INT-004",
    disease: "Lassa Fever",
    diseaseVariant: "-",
    caseClassification: "Probable case",
    outcome: "Under Treatment",
    investigationStatus: "Investigation pending",
    personId: "XNQZBJ",
    firstName: "Marijn",
    lastName: "Peters",
    state: "Edo",
    lga: "Egor",
    healthFacility: "University of Benin Teaching Hospital",
    region: "South South",
    dateOfOnset: "2025-01-22",
    dateOfConfirmation: null,
    reportingSource: "Clinical Diagnosis",
    age: 42,
    sex: "Male",
    occupation: "Farmer",
    symptoms: "High fever, Bleeding, Weakness",
    riskFactors: "Exposure to rodents",
    category: "High Risk",
    dateReported: "2025-01-23",
    contactNumber: "+234-804-567-8901",
  },
  {
    caseId: "RPMYZZ",
    epidNumber: "NIE-KTS-BAT-25-005",
    internalToken: "INT-005",
    disease: "Cholera",
    diseaseVariant: "-",
    caseClassification: "Confirmed case",
    outcome: "Deceased",
    investigationStatus: "Investigation done",
    personId: "QRDNJM",
    firstName: "Amina",
    lastName: "Bello",
    state: "Kano",
    lga: "Municipal",
    healthFacility: "Aminu Kano Teaching Hospital",
    region: "North West",
    dateOfOnset: "2025-01-08",
    dateOfConfirmation: "2025-01-09",
    reportingSource: "Laboratory Report",
    age: 67,
    sex: "Female",
    occupation: "Trader",
    symptoms: "Severe diarrhea, Dehydration",
    riskFactors: "Contaminated water source",
    category: "High Risk",
    dateReported: "2025-01-09",
    contactNumber: "+234-805-678-9012",
  },
];

const filterOptions = {
  caseOrigin: ["All", "Imported", "Local"],
  outcome: [
    "All",
    "No Outcome Yet",
    "Recovered",
    "Deceased",
    "Under Treatment",
  ],
  disease: [
    "All",
    "Yellow Fever",
    "COVID-19",
    "Measles",
    "Lassa Fever",
    "Cholera",
  ],
  classification: [
    "All",
    "Confirmed case",
    "Probable case",
    "Suspect case",
    "Not yet classified",
  ],
  followUp: ["All", "Pending", "Done", "Discarded"],
  status: [
    "All",
    "Investigation pending",
    "Investigation done",
    "Investigation discarded",
  ],
  region: [
    "All",
    "South West",
    "South South",
    "North West",
    "North East",
    "North Central",
    "South East",
  ],
  sex: ["All", "Male", "Female"],
};

function Cases() {
  const [filters, setFilters] = useState({
    caseOrigin: "All",
    outcome: "All",
    disease: "All",
    classification: "All",
    followUp: "All",
    status: "All",
    region: "All",
    sex: "All",
    search: "",
    personSearch: "",
    eventSearch: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewMode, setViewMode] = useState("default"); // default, detailed
  const [showFilters, setShowFilters] = useState(true);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New case form data
  const [formData, setFormData] = useState({
    case_id: "",
    personID: "",
    disease: "",
    classification: "",
    outcome: "",
    longitude: 0,
    latitude: 0,
    state: "",
    lga: "",
    health_facility: "",
    region: "",
    date_of_onset: "",
    date_of_confirmation: "",
    reporting_source: "",
    age: 0,
    sex: "",
    occupation: "",
    symptoms: "",
    risk_factors: "",
    category: "Human",
  });

  // Cases data state
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCases, setTotalCases] = useState(0);
  const [apiCurrentPage, setApiCurrentPage] = useState(1);
  const [apiPageSize, setApiPageSize] = useState(100); // Fetch more records per API call

  // Fetch cases from API
  const fetchCases = async (page = 1, pageSize = 100) => {
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
            page: page,
            page_size: pageSize,
            sort_by: "created_at",
            sort_order: "desc",
          },
        }
      );

      console.log("API Response:", response.data); // Debug log

      // Handle different response structures
      if (response.data) {
        if (Array.isArray(response.data)) {
          // Direct array response
          setCases(response.data);
          setTotalCases(response.data.length);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // Nested data with pagination info
          setCases(response.data.data);
          setTotalCases(response.data.total || response.data.data.length);
        } else if (
          response.data.results &&
          Array.isArray(response.data.results)
        ) {
          // Alternative nested structure
          setCases(response.data.results);
          setTotalCases(
            response.data.total ||
              response.data.count ||
              response.data.results.length
          );
        } else {
          // Unknown structure, try to find the array
          console.warn("Unknown API response structure:", response.data);
          setCases([]);
          setTotalCases(0);
        }
      } else {
        setCases([]);
        setTotalCases(0);
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
      setError(error.response?.data?.message || "Failed to fetch cases");
      setCases([]); // Fallback to empty array
      setTotalCases(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCases(apiCurrentPage, apiPageSize);
  }, []);

  // Enhanced filtering logic
  const filteredCases = useMemo(() => {
    const casesToFilter = cases.length > 0 ? cases : mockCases; // Use API data if available, fallback to mock
    return casesToFilter.filter((caseItem) => {
      // Text searches
      if (
        filters.search &&
        !Object.values(caseItem).some((value) =>
          String(value).toLowerCase().includes(filters.search.toLowerCase())
        )
      )
        return false;

      if (
        filters.personSearch &&
        !`${caseItem.firstName} ${caseItem.lastName} ${caseItem.personId} ${caseItem.contactNumber}`
          .toLowerCase()
          .includes(filters.personSearch.toLowerCase())
      )
        return false;

      // Filter by specific fields
      if (filters.disease !== "All" && caseItem.disease !== filters.disease)
        return false;
      if (
        filters.classification !== "All" &&
        caseItem.caseClassification !== filters.classification
      )
        return false;
      if (filters.outcome !== "All" && caseItem.outcome !== filters.outcome)
        return false;
      if (
        filters.status !== "All" &&
        caseItem.investigationStatus !== filters.status
      )
        return false;
      if (filters.region !== "All" && caseItem.region !== filters.region)
        return false;
      if (filters.sex !== "All" && caseItem.sex !== filters.sex) return false;

      return true;
    });
  }, [filters, cases]);

  // Pagination
  const totalPages = Math.ceil(filteredCases.length / pageSize);
  const paginatedCases = filteredCases.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Status badge component
  const getStatusBadge = (status) => {
    const statusConfig = {
      "Investigation done": {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
      },
      "Investigation pending": {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: Clock,
      },
      "Investigation discarded": {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: X,
      },
    };

    const config = statusConfig[status] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      icon: AlertCircle,
    };
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  // Outcome badge component
  const getOutcomeBadge = (outcome) => {
    const outcomeConfig = {
      Recovered: { bg: "bg-green-100", text: "text-green-800" },
      Deceased: { bg: "bg-red-100", text: "text-red-800" },
      "Under Treatment": { bg: "bg-blue-100", text: "text-blue-800" },
      "No Outcome Yet": { bg: "bg-gray-100", text: "text-gray-800" },
    };

    const config = outcomeConfig[outcome] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {outcome}
      </span>
    );
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      caseOrigin: "All",
      outcome: "All",
      disease: "All",
      classification: "All",
      followUp: "All",
      status: "All",
      region: "All",
      sex: "All",
      search: "",
      personSearch: "",
      eventSearch: "",
    });
    setCurrentPage(1);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  // Handle form submission
  const handleSubmitNewCase = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://backend.onehealth-wwrg.com/api/v1/reports/health",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Case created successfully!");
        setShowNewCaseModal(false);
        // Reset form
        setFormData({
          case_id: "",
          personID: "",
          disease: "",
          classification: "",
          outcome: "",
          longitude: 0,
          latitude: 0,
          state: "",
          lga: "",
          health_facility: "",
          region: "",
          date_of_onset: "",
          date_of_confirmation: "",
          reporting_source: "",
          age: 0,
          sex: "",
          occupation: "",
          symptoms: "",
          risk_factors: "",
          category: "Human",
        });
        // Refresh the cases list
        await fetchCases(1, apiPageSize); // Reset to first page when refreshing
      }
    } catch (error) {
      console.error("Error creating case:", error);
      alert(
        error.response?.data?.message ||
          "Error creating case. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle opening new case modal
  const handleNewCaseClick = () => {
    setShowNewCaseModal(true);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-primary">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Human Cases Directory
            </h2>
            <p className="text-sm text-gray-600">
              Showing {filteredCases.length} of {mockCases.length} cases
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              onClick={() =>
                setViewMode(viewMode === "default" ? "detailed" : "default")
              }
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "default"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
            >
              {viewMode === "default" ? "DETAILED VIEW" : "DEFAULT VIEW"}
            </button>
            <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-700 transition">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={handleNewCaseClick}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              New Case
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Disease
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.disease}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, disease: e.target.value }))
                  }
                >
                  {filterOptions.disease.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Classification
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.classification}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      classification: e.target.value,
                    }))
                  }
                >
                  {filterOptions.classification.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Outcome
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.outcome}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, outcome: e.target.value }))
                  }
                >
                  {filterOptions.outcome.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Investigation Status
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, status: e.target.value }))
                  }
                >
                  {filterOptions.status.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Region
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.region}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, region: e.target.value }))
                  }
                >
                  {filterOptions.region.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sex</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.sex}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, sex: e.target.value }))
                  }
                >
                  {filterOptions.sex.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Search Cases
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Case ID, EPID number, disease..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, search: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Search Person
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Person ID, name, contact..."
                    value={filters.personSearch}
                    onChange={(e) =>
                      setFilters((f) => ({
                        ...f,
                        personSearch: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Search Event
                </label>
                <div className="relative">
                  <AlertCircle className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Event ID, title, description..."
                    value={filters.eventSearch}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, eventSearch: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Reset Filters
              </button>
              <div className="ml-auto text-sm text-gray-600 py-2">
                {filteredCases.length} cases found
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading cases...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="text-red-800 font-medium">
                  Error Loading Cases
                </h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
                <button
                  onClick={() => fetchCases(1, apiPageSize)}
                  className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Overview */}
        {!isLoading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Cases",
                count: (cases.length > 0 ? cases : mockCases).length,
                color: "blue",
              },
              {
                label: "Pending Investigation",
                count: (cases.length > 0 ? cases : mockCases).filter(
                  (c) =>
                    c.investigationStatus === "Investigation pending" ||
                    c.investigation_status === "Investigation pending"
                ).length,
                color: "yellow",
              },
              {
                label: "Investigation Done",
                count: (cases.length > 0 ? cases : mockCases).filter(
                  (c) =>
                    c.investigationStatus === "Investigation done" ||
                    c.investigation_status === "Investigation done"
                ).length,
                color: "green",
              },
              {
                label: "Confirmed Cases",
                count: (cases.length > 0 ? cases : mockCases).filter(
                  (c) =>
                    c.caseClassification === "Confirmed case" ||
                    c.case_classification === "Confirmed case"
                ).length,
                color: "red",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.count}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}
                  >
                    <AlertCircle className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cases Table */}
        {!isLoading && !error && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header Controls */}
            <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  Showing {(currentPage - 1) * pageSize + 1} to{" "}
                  {Math.min(currentPage * pageSize, filteredCases.length)} of{" "}
                  {filteredCases.length} entries
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Show:</label>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-sm text-gray-700">entries</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {viewMode === "default" ? (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Case ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Person
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Disease
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Classification
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Outcome
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date Reported
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Case ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          EPID Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Person Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Disease Info
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Classification
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Investigation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Outcome
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Dates
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedCases.map((caseItem, idx) => (
                    <tr
                      key={caseItem.caseId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {viewMode === "default" ? (
                        <>
                          {/* Case ID */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                                {caseItem.caseId}
                              </span>
                            </div>
                          </td>

                          {/* Person */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {caseItem.firstName} {caseItem.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {caseItem.personId}
                              </div>
                            </div>
                          </td>

                          {/* Disease */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {caseItem.disease}
                            </div>
                            {caseItem.diseaseVariant &&
                              caseItem.diseaseVariant !== "-" && (
                                <div className="text-sm text-gray-500">
                                  {caseItem.diseaseVariant}
                                </div>
                              )}
                          </td>

                          {/* Classification */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                caseItem.caseClassification === "Confirmed case"
                                  ? "bg-red-100 text-red-800"
                                  : caseItem.caseClassification ===
                                    "Probable case"
                                  ? "bg-orange-100 text-orange-800"
                                  : caseItem.caseClassification ===
                                    "Suspect case"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {caseItem.caseClassification}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(caseItem.investigationStatus)}
                          </td>

                          {/* Outcome */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getOutcomeBadge(caseItem.outcome)}
                          </td>

                          {/* Location */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {caseItem.state}
                            </div>
                            <div className="text-sm text-gray-500">
                              {caseItem.lga}
                            </div>
                          </td>

                          {/* Date Reported */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(
                              caseItem.dateReported
                            ).toLocaleDateString()}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                className="text-gray-600 hover:text-gray-900 p-1 rounded"
                                title="Edit Case"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900 p-1 rounded"
                                title="Delete Case"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          {/* Detailed view columns */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {caseItem.caseId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {caseItem.epidNumber}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {caseItem.firstName} {caseItem.lastName}
                              </div>
                              <div className="text-gray-500">
                                ID: {caseItem.personId}
                              </div>
                              <div className="text-gray-500">
                                {caseItem.age}y, {caseItem.sex}
                              </div>
                              <div className="text-gray-500">
                                {caseItem.occupation}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {caseItem.disease}
                              </div>
                              {caseItem.diseaseVariant &&
                                caseItem.diseaseVariant !== "-" && (
                                  <div className="text-gray-500">
                                    {caseItem.diseaseVariant}
                                  </div>
                                )}
                              <div className="text-gray-500 mt-1">
                                {caseItem.symptoms}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                caseItem.caseClassification === "Confirmed case"
                                  ? "bg-red-100 text-red-800"
                                  : caseItem.caseClassification ===
                                    "Probable case"
                                  ? "bg-orange-100 text-orange-800"
                                  : caseItem.caseClassification ===
                                    "Suspect case"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {caseItem.caseClassification}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(caseItem.investigationStatus)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getOutcomeBadge(caseItem.outcome)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {caseItem.state}
                              </div>
                              <div className="text-gray-500">
                                {caseItem.lga}
                              </div>
                              <div className="text-gray-500">
                                {caseItem.region}
                              </div>
                              <div className="text-gray-500 mt-1">
                                {caseItem.healthFacility}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div>
                                <span className="font-medium">Onset:</span>{" "}
                                {new Date(
                                  caseItem.dateOfOnset
                                ).toLocaleDateString()}
                              </div>
                              <div>
                                <span className="font-medium">Reported:</span>{" "}
                                {new Date(
                                  caseItem.dateReported
                                ).toLocaleDateString()}
                              </div>
                              {caseItem.dateOfConfirmation && (
                                <div>
                                  <span className="font-medium">
                                    Confirmed:
                                  </span>{" "}
                                  {new Date(
                                    caseItem.dateOfConfirmation
                                  ).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {caseItem.contactNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                className="text-gray-600 hover:text-gray-900 p-1 rounded"
                                title="Edit Case"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900 p-1 rounded"
                                title="Delete Case"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}

                  {paginatedCases.length === 0 && (
                    <tr>
                      <td
                        colSpan={viewMode === "default" ? 9 : 11}
                        className="px-6 py-12 text-center"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No cases found
                          </h3>
                          <p className="text-gray-500 mb-4">
                            Try adjusting your search criteria or filters.
                          </p>
                          <button
                            onClick={resetFilters}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            Clear Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredCases.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum =
                        Math.max(1, Math.min(totalPages - 4, currentPage - 2)) +
                        i;
                      if (pageNum > totalPages) return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* New Case Modal */}
      {showNewCaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Case
              </h2>
              <button
                onClick={() => setShowNewCaseModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitNewCase} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Case Information */}
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Case Information
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Case ID
                  </label>
                  <input
                    type="text"
                    name="case_id"
                    value={formData.case_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Person ID
                  </label>
                  <input
                    type="text"
                    name="personID"
                    value={formData.personID}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disease
                  </label>
                  <select
                    name="disease"
                    value={formData.disease}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Disease</option>
                    <option value="Yellow Fever">Yellow Fever</option>
                    <option value="Lassa Fever">Lassa Fever</option>
                    <option value="Ebola">Ebola</option>
                    <option value="Monkey Pox">Monkey Pox</option>
                    <option value="Cholera">Cholera</option>
                    <option value="Meningitis">Meningitis</option>
                    <option value="COVID-19">COVID-19</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Classification
                  </label>
                  <select
                    name="classification"
                    value={formData.classification}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Classification</option>
                    <option value="Suspect case">Suspect case</option>
                    <option value="Probable case">Probable case</option>
                    <option value="Confirmed case">Confirmed case</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outcome
                  </label>
                  <select
                    name="outcome"
                    value={formData.outcome}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Outcome</option>
                    <option value="Recovered">Recovered</option>
                    <option value="Deceased">Deceased</option>
                    <option value="Under Treatment">Under Treatment</option>
                    <option value="No Outcome Yet">No Outcome Yet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Human">Human</option>
                    <option value="Animal">Animal</option>
                    <option value="Environmental">Environmental</option>
                  </select>
                </div>

                {/* Location Information */}
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">
                    Location Information
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LGA
                  </label>
                  <input
                    type="text"
                    name="lga"
                    value={formData.lga}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Health Facility
                  </label>
                  <input
                    type="text"
                    name="health_facility"
                    value={formData.health_facility}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Patient Information */}
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">
                    Patient Information
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sex
                  </label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Clinical Information */}
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">
                    Clinical Information
                  </h3>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Symptoms
                  </label>
                  <textarea
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe symptoms separated by commas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Factors
                  </label>
                  <textarea
                    name="risk_factors"
                    value={formData.risk_factors}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe risk factors"
                  />
                </div>

                {/* Dates and Reporting */}
                <div className="md:col-span-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">
                    Dates and Reporting
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Onset
                  </label>
                  <input
                    type="datetime-local"
                    name="date_of_onset"
                    value={formData.date_of_onset}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Confirmation
                  </label>
                  <input
                    type="datetime-local"
                    name="date_of_confirmation"
                    value={formData.date_of_confirmation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reporting Source
                  </label>
                  <input
                    type="text"
                    name="reporting_source"
                    value={formData.reporting_source}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Hospital Report, Community Health Worker"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowNewCaseModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Create Case
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Cases;
