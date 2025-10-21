import React, { useState, useMemo, useEffect } from "react";
import DashboardLayout from "../../../components/dashboardLayouts/Dashboard";
import axios from "axios";
import { Filter, Download, Plus } from "lucide-react";
import {
  AnimalCaseStatsCards,
  AnimalCaseFiltersPanel,
  AnimalCaseTableRow,
  AnimalCaseDetailsModal,
} from "../../../components/cases";

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

  // Case details modal state
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

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

  // Handle view case details
  const handleViewDetails = (caseItem) => {
    setSelectedCase(caseItem);
    setShowDetailsModal(true);
  };

  // Handle opening new case modal
  const handleNewCaseClick = () => {
    setShowNewCaseModal(true);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-primary">
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
              <AnimalCaseFiltersPanel
                filters={filters}
                setFilters={setFilters}
                filterOptions={filterOptions}
                filteredCasesCount={filteredCases.length}
                onResetFilters={resetFilters}
              />
            )}

            {/* Status Overview */}
            <AnimalCaseStatsCards cases={cases} totalCases={totalCases} />

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
                    {paginatedCases.map((caseItem) => (
                      <AnimalCaseTableRow
                        key={caseItem.case_id || caseItem.id}
                        caseItem={caseItem}
                        onViewDetails={handleViewDetails}
                      />
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

        {/* Animal Case Details Modal */}
        <AnimalCaseDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          caseData={selectedCase}
        />
      </div>
    </DashboardLayout>
  );
};

export default AnimalCases;
