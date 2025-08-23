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
  Dog,
} from "lucide-react";

const mockAnimalCases = [
  {
    caseId: "AC001",
    epidNumber: "LOS-AC-25-001",
    animalId: "ANI-001",
    species: "Cattle",
    breed: "Holstein",
    disease: "Foot and Mouth Disease",
    diseaseVariant: "Type O",
    caseClassification: "Confirmed case",
    outcome: "Recovered",
    investigationStatus: "Investigation done",
    ownerId: "OWN-001",
    ownerName: "Ibrahim Musa",
    farmName: "Green Valley Farm",
    state: "Lagos",
    lga: "Ikorodu",
    ward: "Ikorodu North",
    region: "South West",
    dateOfOnset: "2025-01-15",
    dateOfConfirmation: "2025-01-18",
    reportingSource: "Veterinary Clinic",
    age: "3 years",
    sex: "Female",
    symptoms: "Lameness, Fever, Mouth lesions",
    riskFactors: "Contact with infected animals",
    category: "High Risk",
    dateReported: "2025-01-16",
    contactNumber: "+234-801-234-5678",
    veterinarian: "Dr. Sarah Ahmed",
  },
  {
    caseId: "AC002",
    epidNumber: "LOS-AC-25-002",
    animalId: "ANI-002",
    species: "Poultry",
    breed: "Broiler",
    disease: "Avian Influenza",
    diseaseVariant: "H5N1",
    caseClassification: "Suspect case",
    outcome: "Under Treatment",
    investigationStatus: "Investigation pending",
    ownerId: "OWN-002",
    ownerName: "Mary Okafor",
    farmName: "Sunrise Poultry",
    state: "Ogun",
    lga: "Abeokuta North",
    ward: "Abeokuta Central",
    region: "South West",
    dateOfOnset: "2025-01-20",
    dateOfConfirmation: null,
    reportingSource: "Farm Report",
    age: "6 weeks",
    sex: "Mixed",
    symptoms: "Respiratory distress, Drop in egg production",
    riskFactors: "Migratory birds contact",
    category: "High Risk",
    dateReported: "2025-01-21",
    contactNumber: "+234-802-345-6789",
    veterinarian: "Dr. John Eze",
  },
  {
    caseId: "AC003",
    epidNumber: "OG-AC-25-003",
    animalId: "ANI-003",
    species: "Goat",
    breed: "West African Dwarf",
    disease: "Peste des Petits Ruminants",
    diseaseVariant: "Lineage IV",
    caseClassification: "Confirmed case",
    outcome: "Deceased",
    investigationStatus: "Investigation done",
    ownerId: "OWN-003",
    ownerName: "Aminat Adebayo",
    farmName: "Adebayo Livestock",
    state: "Oyo",
    lga: "Ibadan North",
    ward: "Bodija",
    region: "South West",
    dateOfOnset: "2025-01-10",
    dateOfConfirmation: "2025-01-12",
    reportingSource: "Laboratory Report",
    age: "2 years",
    sex: "Male",
    symptoms: "Fever, Diarrhea, Mouth ulcers",
    riskFactors: "Unvaccinated herd",
    category: "High Risk",
    dateReported: "2025-01-11",
    contactNumber: "+234-803-456-7890",
    veterinarian: "Dr. Fatima Bello",
  },
  {
    caseId: "AC004",
    epidNumber: "KD-AC-25-004",
    animalId: "ANI-004",
    species: "Sheep",
    breed: "Uda",
    disease: "Anthrax",
    diseaseVariant: "-",
    caseClassification: "Probable case",
    outcome: "Under Treatment",
    investigationStatus: "Investigation pending",
    ownerId: "OWN-004",
    ownerName: "Musa Garba",
    farmName: "Northern Livestock Farm",
    state: "Kaduna",
    lga: "Kaduna North",
    ward: "Unguwar Rimi",
    region: "North West",
    dateOfOnset: "2025-01-22",
    dateOfConfirmation: null,
    reportingSource: "Clinical Diagnosis",
    age: "4 years",
    sex: "Female",
    symptoms: "Sudden death, Fever, Swelling",
    riskFactors: "Contaminated feed",
    category: "High Risk",
    dateReported: "2025-01-23",
    contactNumber: "+234-804-567-8901",
    veterinarian: "Dr. Abubakar Sani",
  },
  {
    caseId: "AC005",
    epidNumber: "AN-AC-25-005",
    animalId: "ANI-005",
    species: "Pig",
    breed: "Large White",
    disease: "African Swine Fever",
    diseaseVariant: "Genotype II",
    caseClassification: "Confirmed case",
    outcome: "Deceased",
    investigationStatus: "Investigation done",
    ownerId: "OWN-005",
    ownerName: "Peter Okolo",
    farmName: "Okolo Piggery",
    state: "Anambra",
    lga: "Awka South",
    ward: "Awka",
    region: "South East",
    dateOfOnset: "2025-01-18",
    dateOfConfirmation: "2025-01-20",
    reportingSource: "Laboratory Report",
    age: "1 year",
    sex: "Male",
    symptoms: "High fever, Hemorrhages, Respiratory distress",
    riskFactors: "Contact with wild boars",
    category: "High Risk",
    dateReported: "2025-01-19",
    contactNumber: "+234-805-678-9012",
    veterinarian: "Dr. Chinedu Okafor",
  },
];

const AnimalCases = () => {
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
    species: "All",
    disease: "All",
    classification: "All",
    status: "All",
    outcome: "All",
    state: "All",
    animalSearch: "",
    ownerSearch: "",
    dateFrom: "",
    dateTo: "",
  });

  // Generate filter options from mock data
  const filterOptions = useMemo(() => {
    const data = cases.length > 0 ? cases : mockAnimalCases;
    return {
      species: ["All", ...new Set(data.map((c) => c.species))],
      disease: ["All", ...new Set(data.map((c) => c.disease))],
      classification: [
        "All",
        ...new Set(data.map((c) => c.caseClassification)),
      ],
      status: ["All", ...new Set(data.map((c) => c.investigationStatus))],
      outcome: ["All", ...new Set(data.map((c) => c.outcome))],
      state: ["All", ...new Set(data.map((c) => c.state))],
    };
  }, [cases]);

  // Filter cases based on current filters
  const filteredCases = useMemo(() => {
    const data = cases.length > 0 ? cases : mockAnimalCases;
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

      const animalSearchMatch =
        !filters.animalSearch ||
        `${caseItem.animalId} ${caseItem.species} ${caseItem.breed}`
          .toLowerCase()
          .includes(filters.animalSearch.toLowerCase());

      const ownerSearchMatch =
        !filters.ownerSearch ||
        `${caseItem.ownerId} ${caseItem.ownerName} ${caseItem.farmName}`
          .toLowerCase()
          .includes(filters.ownerSearch.toLowerCase());

      return (
        searchMatch &&
        animalSearchMatch &&
        ownerSearchMatch &&
        (filters.species === "All" || caseItem.species === filters.species) &&
        (filters.disease === "All" || caseItem.disease === filters.disease) &&
        (filters.classification === "All" ||
          caseItem.caseClassification === filters.classification) &&
        (filters.status === "All" ||
          caseItem.investigationStatus === filters.status) &&
        (filters.outcome === "All" || caseItem.outcome === filters.outcome) &&
        (filters.state === "All" || caseItem.state === filters.state)
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
      species: "All",
      disease: "All",
      classification: "All",
      status: "All",
      outcome: "All",
      state: "All",
      animalSearch: "",
      ownerSearch: "",
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
              Animal Cases Directory
            </h2>
            <p className="text-sm text-gray-600">
              Showing {filteredCases.length} of {mockAnimalCases.length} cases
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
                  Species
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.species}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, species: e.target.value }))
                  }
                >
                  {filterOptions.species.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

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
                  Search Animal
                </label>
                <div className="relative">
                  <Dog className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Animal ID, species, breed..."
                    value={filters.animalSearch}
                    onChange={(e) =>
                      setFilters((f) => ({
                        ...f,
                        animalSearch: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Search Owner
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Owner ID, name, farm..."
                    value={filters.ownerSearch}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, ownerSearch: e.target.value }))
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
              count: mockAnimalCases.length,
              color: "blue",
            },
            {
              label: "Pending Investigation",
              count: mockAnimalCases.filter(
                (c) => c.investigationStatus === "Investigation pending"
              ).length,
              color: "yellow",
            },
            {
              label: "Investigation Done",
              count: mockAnimalCases.filter(
                (c) => c.investigationStatus === "Investigation done"
              ).length,
              color: "green",
            },
            {
              label: "Confirmed Cases",
              count: mockAnimalCases.filter(
                (c) => c.caseClassification === "Confirmed case"
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
                  <Dog className={`w-6 h-6 text-${stat.color}-600`} />
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
                    Animal
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
                    Owner/Farm
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

                    {/* Animal */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {caseItem.species} - {caseItem.breed}
                        </div>
                        <div className="text-sm text-gray-500">
                          {caseItem.animalId} • {caseItem.age} • {caseItem.sex}
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
                            : caseItem.caseClassification === "Probable case"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {caseItem.caseClassification}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          caseItem.investigationStatus === "Investigation done"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {caseItem.investigationStatus}
                      </span>
                    </td>

                    {/* Outcome */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          caseItem.outcome === "Recovered"
                            ? "bg-green-100 text-green-800"
                            : caseItem.outcome === "Deceased"
                            ? "bg-red-100 text-red-800"
                            : caseItem.outcome === "Under Treatment"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {caseItem.outcome}
                      </span>
                    </td>

                    {/* Owner/Farm */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {caseItem.ownerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {caseItem.farmName}
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {caseItem.state}, {caseItem.lga}
                      </div>
                      <div className="text-sm text-gray-500">
                        {caseItem.region}
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

export default AnimalCases;
