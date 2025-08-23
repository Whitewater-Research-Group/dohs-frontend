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
  Leaf,
  Wind,
  Droplets,
} from "lucide-react";

const mockEnvironmentalCases = [
  {
    caseId: "EC001",
    epidNumber: "LOS-EC-25-001",
    incidentId: "INC-001",
    incidentType: "Water Contamination",
    contaminant: "Lead",
    severity: "High",
    caseClassification: "Confirmed incident",
    status: "Under Investigation",
    outcome: "Remediation in Progress",
    investigationStatus: "Investigation ongoing",
    reporterId: "REP-001",
    reporterName: "Dr. Adebayo Ogundimu",
    reporterOrganization: "Lagos State Environmental Agency",
    location: "Victoria Island",
    state: "Lagos",
    lga: "Lagos Island",
    ward: "Victoria Island",
    region: "South West",
    coordinates: "6.4281° N, 3.4219° E",
    dateDetected: "2025-01-15",
    dateReported: "2025-01-16",
    dateConfirmed: "2025-01-18",
    reportingSource: "Environmental Monitoring",
    affectedPopulation: "~5000 residents",
    environmentalMatrix: "Drinking Water",
    exposureRoute: "Ingestion",
    symptoms: "Gastrointestinal issues, Neurological symptoms",
    riskFactors: "Industrial discharge",
    category: "Chemical Contamination",
    contactNumber: "+234-801-234-5678",
    investigatingAgency: "Lagos State EPA",
    remediationMeasures: "Water treatment, Source control",
  },
  {
    caseId: "EC002",
    epidNumber: "OG-EC-25-002",
    incidentId: "INC-002",
    incidentType: "Air Pollution",
    contaminant: "Particulate Matter (PM2.5)",
    severity: "Medium",
    caseClassification: "Confirmed incident",
    status: "Investigation Complete",
    outcome: "Remediation Complete",
    investigationStatus: "Investigation done",
    reporterId: "REP-002",
    reporterName: "Prof. Kemi Adeyemi",
    reporterOrganization: "University of Lagos Environmental Sciences",
    location: "Ikeja Industrial Estate",
    state: "Lagos",
    lga: "Ikeja",
    ward: "Ikeja GRA",
    region: "South West",
    coordinates: "6.5924° N, 3.3374° E",
    dateDetected: "2025-01-20",
    dateReported: "2025-01-21",
    dateConfirmed: "2025-01-23",
    reportingSource: "Air Quality Monitoring",
    affectedPopulation: "~2000 workers",
    environmentalMatrix: "Ambient Air",
    exposureRoute: "Inhalation",
    symptoms: "Respiratory irritation, Cough",
    riskFactors: "Industrial emissions",
    category: "Air Quality",
    contactNumber: "+234-802-345-6789",
    investigatingAgency: "Lagos State EPA",
    remediationMeasures: "Emission controls, Air filtration",
  },
  {
    caseId: "EC003",
    epidNumber: "KN-EC-25-003",
    incidentId: "INC-003",
    incidentType: "Soil Contamination",
    contaminant: "Heavy Metals (Cadmium, Mercury)",
    severity: "High",
    caseClassification: "Probable incident",
    status: "Investigation Pending",
    outcome: "Assessment Ongoing",
    investigationStatus: "Investigation pending",
    reporterId: "REP-003",
    reporterName: "Dr. Fatima Usman",
    reporterOrganization: "Federal Ministry of Environment",
    location: "Mining Site, Zamfara",
    state: "Zamfara",
    lga: "Anka",
    ward: "Anka Central",
    region: "North West",
    coordinates: "12.1085° N, 5.9270° E",
    dateDetected: "2025-01-10",
    dateReported: "2025-01-11",
    dateConfirmed: null,
    reportingSource: "Community Report",
    affectedPopulation: "~1500 villagers",
    environmentalMatrix: "Agricultural Soil",
    exposureRoute: "Ingestion, Dermal contact",
    symptoms: "Skin lesions, Kidney dysfunction",
    riskFactors: "Illegal mining activities",
    category: "Mining-related Contamination",
    contactNumber: "+234-803-456-7890",
    investigatingAgency: "Federal EPA",
    remediationMeasures: "Soil remediation, Mining cessation",
  },
  {
    caseId: "EC004",
    epidNumber: "RV-EC-25-004",
    incidentId: "INC-004",
    incidentType: "Chemical Spill",
    contaminant: "Petroleum Hydrocarbons",
    severity: "High",
    caseClassification: "Confirmed incident",
    status: "Emergency Response",
    outcome: "Containment Achieved",
    investigationStatus: "Investigation ongoing",
    reporterId: "REP-004",
    reporterName: "Eng. Mohammed Bello",
    reporterOrganization: "Rivers State Environmental Agency",
    location: "Port Harcourt Refinery",
    state: "Rivers",
    lga: "Port Harcourt",
    ward: "Eleme",
    region: "South South",
    coordinates: "4.8156° N, 7.0498° E",
    dateDetected: "2025-01-22",
    dateReported: "2025-01-22",
    dateConfirmed: "2025-01-23",
    reportingSource: "Industrial Report",
    affectedPopulation: "~3000 residents",
    environmentalMatrix: "Surface Water, Soil",
    exposureRoute: "Inhalation, Dermal contact",
    symptoms: "Respiratory issues, Skin irritation",
    riskFactors: "Pipeline rupture",
    category: "Industrial Accident",
    contactNumber: "+234-804-567-8901",
    investigatingAgency: "Rivers State EPA",
    remediationMeasures: "Spill containment, Soil excavation",
  },
  {
    caseId: "EC005",
    epidNumber: "AB-EC-25-005",
    incidentId: "INC-005",
    incidentType: "Groundwater Contamination",
    contaminant: "Nitrates",
    severity: "Medium",
    caseClassification: "Suspect incident",
    status: "Under Investigation",
    outcome: "Monitoring Ongoing",
    investigationStatus: "Investigation ongoing",
    reporterId: "REP-005",
    reporterName: "Dr. Blessing Okoro",
    reporterOrganization: "Abia State Water Board",
    location: "Agricultural Area, Umuahia",
    state: "Abia",
    lga: "Umuahia North",
    ward: "Umuahia Urban",
    region: "South East",
    coordinates: "5.5265° N, 7.4896° E",
    dateDetected: "2025-01-18",
    dateReported: "2025-01-19",
    dateConfirmed: null,
    reportingSource: "Water Quality Testing",
    affectedPopulation: "~800 farmers",
    environmentalMatrix: "Groundwater",
    exposureRoute: "Ingestion",
    symptoms: "Methemoglobinemia risk",
    riskFactors: "Agricultural runoff",
    category: "Agricultural Contamination",
    contactNumber: "+234-805-678-9012",
    investigatingAgency: "Abia State EPA",
    remediationMeasures: "Source control, Water treatment",
  },
];

const EnvironmentalCases = () => {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    incidentType: "All",
    contaminant: "All",
    severity: "All",
    classification: "All",
    status: "All",
    outcome: "All",
    state: "All",
    category: "All",
    reporterSearch: "",
    locationSearch: "",
    dateFrom: "",
    dateTo: "",
  });

  // Generate filter options from mock data
  const filterOptions = useMemo(() => {
    const data = cases.length > 0 ? cases : mockEnvironmentalCases;
    return {
      incidentType: ["All", ...new Set(data.map((c) => c.incidentType))],
      contaminant: ["All", ...new Set(data.map((c) => c.contaminant))],
      severity: ["All", ...new Set(data.map((c) => c.severity))],
      classification: [
        "All",
        ...new Set(data.map((c) => c.caseClassification)),
      ],
      status: ["All", ...new Set(data.map((c) => c.status))],
      outcome: ["All", ...new Set(data.map((c) => c.outcome))],
      state: ["All", ...new Set(data.map((c) => c.state))],
      category: ["All", ...new Set(data.map((c) => c.category))],
    };
  }, [cases]);

  // Filter cases based on current filters
  const filteredCases = useMemo(() => {
    const data = cases.length > 0 ? cases : mockEnvironmentalCases;
    return data.filter((caseItem) => {
      const searchMatch =
        !filters.search ||
        Object.values(caseItem).some(
          (value) =>
            value &&
            value
              .toString()
              .toLowerCase()
              .includes(filters.search.toLowerCase())
        );

      const reporterSearchMatch =
        !filters.reporterSearch ||
        `${caseItem.reporterId} ${caseItem.reporterName} ${caseItem.reporterOrganization}`
          .toLowerCase()
          .includes(filters.reporterSearch.toLowerCase());

      const locationSearchMatch =
        !filters.locationSearch ||
        `${caseItem.location} ${caseItem.state} ${caseItem.lga} ${caseItem.ward}`
          .toLowerCase()
          .includes(filters.locationSearch.toLowerCase());

      return (
        searchMatch &&
        reporterSearchMatch &&
        locationSearchMatch &&
        (filters.incidentType === "All" ||
          caseItem.incidentType === filters.incidentType) &&
        (filters.contaminant === "All" ||
          caseItem.contaminant === filters.contaminant) &&
        (filters.severity === "All" ||
          caseItem.severity === filters.severity) &&
        (filters.classification === "All" ||
          caseItem.caseClassification === filters.classification) &&
        (filters.status === "All" || caseItem.status === filters.status) &&
        (filters.outcome === "All" || caseItem.outcome === filters.outcome) &&
        (filters.state === "All" || caseItem.state === filters.state) &&
        (filters.category === "All" || caseItem.category === filters.category)
      );
    });
  }, [cases, filters]);

  // Paginate filtered cases
  const paginatedCases = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCases.slice(startIndex, startIndex + pageSize);
  }, [filteredCases, currentPage, pageSize]);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: "",
      incidentType: "All",
      contaminant: "All",
      severity: "All",
      classification: "All",
      status: "All",
      outcome: "All",
      state: "All",
      category: "All",
      reporterSearch: "",
      locationSearch: "",
      dateFrom: "",
      dateTo: "",
    });
    setCurrentPage(1);
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
              Environmental Cases Directory
            </h2>
            <p className="text-sm text-gray-600">
              Showing {filteredCases.length} of {mockEnvironmentalCases.length}{" "}
              cases
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
                  Incident Type
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.incidentType}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, incidentType: e.target.value }))
                  }
                >
                  {filterOptions.incidentType.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Contaminant
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.contaminant}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, contaminant: e.target.value }))
                  }
                >
                  {filterOptions.contaminant.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Severity
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.severity}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, severity: e.target.value }))
                  }
                >
                  {filterOptions.severity.map((opt) => (
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
                  Status
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
                  State
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.state}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, state: e.target.value }))
                  }
                >
                  {filterOptions.state.map((opt) => (
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
                    placeholder="Case ID, EPID number, incident type..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, search: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Search Reporter
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Reporter ID, name, organization..."
                    value={filters.reporterSearch}
                    onChange={(e) =>
                      setFilters((f) => ({
                        ...f,
                        reporterSearch: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Search Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Location, state, LGA..."
                    value={filters.locationSearch}
                    onChange={(e) =>
                      setFilters((f) => ({
                        ...f,
                        locationSearch: e.target.value,
                      }))
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

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Cases",
              count: mockEnvironmentalCases.length,
              color: "blue",
              icon: Leaf,
            },
            {
              label: "Under Investigation",
              count: mockEnvironmentalCases.filter((c) =>
                c.status.includes("Investigation")
              ).length,
              color: "yellow",
              icon: Clock,
            },
            {
              label: "High Severity",
              count: mockEnvironmentalCases.filter((c) => c.severity === "High")
                .length,
              color: "red",
              icon: AlertCircle,
            },
            {
              label: "Remediation Complete",
              count: mockEnvironmentalCases.filter((c) =>
                c.outcome.includes("Complete")
              ).length,
              color: "green",
              icon: CheckCircle,
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
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cases Table */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Incident Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contaminant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
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
                    Affected Population
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Reported
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedCases.map((caseItem, idx) => (
                  <tr
                    key={caseItem.caseId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Case ID */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                          {caseItem.caseId}
                        </span>
                      </div>
                    </td>

                    {/* Incident Type */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {caseItem.incidentType}
                        </div>
                        <div className="text-sm text-gray-500">
                          {caseItem.category}
                        </div>
                      </div>
                    </td>

                    {/* Contaminant */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {caseItem.contaminant}
                      </div>
                      <div className="text-sm text-gray-500">
                        {caseItem.environmentalMatrix}
                      </div>
                    </td>

                    {/* Severity */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          caseItem.severity === "High"
                            ? "bg-red-100 text-red-800"
                            : caseItem.severity === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {caseItem.severity}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          caseItem.status === "Investigation Complete"
                            ? "bg-green-100 text-green-800"
                            : caseItem.status === "Emergency Response"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {caseItem.status}
                      </span>
                    </td>

                    {/* Outcome */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          caseItem.outcome.includes("Complete")
                            ? "bg-green-100 text-green-800"
                            : caseItem.outcome.includes("Progress")
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {caseItem.outcome}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {caseItem.location}
                        </div>
                        <div className="text-sm text-gray-500">
                          {caseItem.state}, {caseItem.lga}
                        </div>
                      </div>
                    </td>

                    {/* Affected Population */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {caseItem.affectedPopulation}
                      </div>
                    </td>

                    {/* Date Reported */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(caseItem.dateReported).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of{" "}
                {Math.ceil(filteredCases.length / pageSize)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      Math.ceil(filteredCases.length / pageSize),
                      currentPage + 1
                    )
                  )
                }
                disabled={
                  currentPage >= Math.ceil(filteredCases.length / pageSize)
                }
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EnvironmentalCases;
