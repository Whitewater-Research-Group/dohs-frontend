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

const AnimalCases = () => {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCases, setTotalCases] = useState(0);
  const [apiCurrentPage, setApiCurrentPage] = useState(1);
  const [apiPageSize, setApiPageSize] = useState(100);
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

  // Fetch cases from API
  const fetchCases = async (page = 1, pageSize = 100) => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        "https://backend.onehealth-wwrg.com/api/v1/reports/animal",
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
          console.log("Fetched Cases (Direct Array):", response.data);
        } else if (response.data.items && Array.isArray(response.data.items)) {
          // API response with 'items' property
          setCases(response.data.items);
          setTotalCases(response.data.total || response.data.items.length);
          console.log("Fetched Cases (Items):", response.data.items);
        } else {
          // Unknown structure, try to find the array
          console.warn("Unknown API response structure:", response.data);
          setCases([]);
          setTotalCases(0);
          console.log("Fetched Cases (Unknown Structure):", []);
        }
      } else {
        setCases([]);
        setTotalCases(0);
        console.log("Fetched Cases (No Data):", []);
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

  // Generate filter options from API data
  const filterOptions = useMemo(() => {
    if (cases.length === 0) {
      return {
        species: ["All"],
        disease: ["All"],
        classification: ["All"],
        status: ["All"],
        outcome: ["All"],
        state: ["All"],
      };
    }
    return {
      species: [
        "All",
        ...new Set(cases.map((c) => c.animal_species).filter(Boolean)),
      ],
      disease: ["All", ...new Set(cases.map((c) => c.disease).filter(Boolean))],
      classification: [
        "All",
        ...new Set(cases.map((c) => c.classification).filter(Boolean)),
      ],
      status: ["All"],
      outcome: ["All", ...new Set(cases.map((c) => c.outcome).filter(Boolean))],
      state: ["All", ...new Set(cases.map((c) => c.state).filter(Boolean))],
    };
  }, [cases]);

  // Filter cases based on current filters
  const filteredCases = useMemo(() => {
    return cases.filter((caseItem) => {
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
        `${caseItem.case_id} ${caseItem.animal_species} ${caseItem.personID}`
          .toLowerCase()
          .includes(filters.animalSearch.toLowerCase());

      const ownerSearchMatch =
        !filters.ownerSearch ||
        `${caseItem.reporting_source}`
          .toLowerCase()
          .includes(filters.ownerSearch.toLowerCase());

      return (
        searchMatch &&
        animalSearchMatch &&
        ownerSearchMatch &&
        (filters.species === "All" ||
          caseItem.animal_species === filters.species) &&
        (filters.disease === "All" || caseItem.disease === filters.disease) &&
        (filters.classification === "All" ||
          caseItem.classification === filters.classification) &&
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
        {/* Loading and Error States */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Error loading cases</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Animal Cases Directory
                </h2>
                <p className="text-sm text-gray-600">
                  Showing {filteredCases.length} of {totalCases} cases
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
                          setFilters((f) => ({
                            ...f,
                            ownerSearch: e.target.value,
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
                  count: totalCases,
                  color: "blue",
                },
                {
                  label: "Pending Investigation",
                  count: cases.filter(
                    (c) => !c.lab_results || c.lab_results === "pending"
                  ).length,
                  color: "yellow",
                },
                {
                  label: "Confirmed Cases",
                  count: cases.filter((c) => c.classification === "Confirmed")
                    .length,
                  color: "red",
                },
                {
                  label: "Deceased",
                  count: cases.filter((c) => c.outcome === "Deceased").length,
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
                        key={caseItem.case_id || caseItem.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Case ID */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                              {caseItem.case_id}
                            </span>
                          </div>
                        </td>

                        {/* Animal */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {caseItem.animal_species}
                            </div>
                            <div className="text-sm text-gray-500">
                              {caseItem.personID} • {caseItem.number_affected}{" "}
                              affected
                            </div>
                          </div>
                        </td>

                        {/* Disease */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {caseItem.disease}
                          </div>
                          {caseItem.lab_results && (
                            <div className="text-sm text-gray-500">
                              {caseItem.lab_results}
                            </div>
                          )}
                        </td>

                        {/* Classification */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              caseItem.classification === "Confirmed"
                                ? "bg-red-100 text-red-800"
                                : caseItem.classification === "Probable"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {caseItem.classification}
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
                            {caseItem.outcome || "Unknown"}
                          </span>
                        </td>

                        {/* Owner/Farm */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {caseItem.reporting_source}
                            </div>
                            <div className="text-sm text-gray-500">
                              {caseItem.health_facility || "N/A"}
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
                            {caseItem.reported_at
                              ? new Date(
                                  caseItem.reported_at
                                ).toLocaleDateString()
                              : "N/A"}
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AnimalCases;
