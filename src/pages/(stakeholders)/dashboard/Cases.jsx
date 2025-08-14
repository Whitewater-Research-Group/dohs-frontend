import React, { useState } from "react";
import DashboardLayout from "../../../components/dashboardLayouts/Dashboard";

const mockCases = [
  {
    caseId: "XYILBD",
    epidNumber: "LOS-ND-25-001",
    internalToken: "-",
    disease: "Yellow Fever",
    diseaseVariant: "-",
    caseClassification: "Confirmed case",
    outcome: "No Outcome Yet",
    investigationStatus: "Investigation pending",
    personId: "SOVGLQ",
    firstName: "Elliana",
  },
  {
    caseId: "SMUIMI",
    epidNumber: "LOS---25-081",
    internalToken: "-",
    disease: "COVID-19",
    diseaseVariant: "-",
    caseClassification: "Not yet classified",
    outcome: "No Outcome Yet",
    investigationStatus: "Investigation pending",
    personId: "TMWNQS",
    firstName: "aaaa",
  },
  {
    caseId: "UOZL3G",
    epidNumber: "LOS---25-080",
    internalToken: "-",
    disease: "COVID-19",
    diseaseVariant: "-",
    caseClassification: "Suspect case",
    outcome: "No Outcome Yet",
    investigationStatus: "Investigation done",
    personId: "UGBWTB",
    firstName: "kofi",
  },
  {
    caseId: "QFC5QI",
    epidNumber: "LOS---25-079",
    internalToken: "-",
    disease: "COVID-19",
    diseaseVariant: "-",
    caseClassification: "Not yet classified",
    outcome: "No Outcome Yet",
    investigationStatus: "Investigation pending",
    personId: "XNQZBJ",
    firstName: "Marijn",
  },
  {
    caseId: "RPMYZZ",
    epidNumber: "NIE-KTS-BAT-25-005",
    internalToken: "-",
    disease: "Measles",
    diseaseVariant: "-",
    caseClassification: "Suspect case",
    outcome: "No Outcome Yet",
    investigationStatus: "Investigation pending",
    personId: "QRDNJM",
    firstName: "AMIN",
  },
];

const filterOptions = {
  caseOrigin: ["All", "Imported", "Local"],
  outcome: ["All", "No Outcome Yet", "Recovered", "Deceased"],
  disease: ["All", "Yellow Fever", "COVID-19", "Measles", "Pertussis"],
  classification: [
    "All",
    "Confirmed case",
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
};

function Cases() {
  const [filters, setFilters] = useState({
    caseOrigin: "All",
    outcome: "All",
    disease: "All",
    classification: "All",
    followUp: "All",
    status: "All",
    search: "",
    personSearch: "",
    eventSearch: "",
  });

  // Filtering logic (mock, not functional)
  const filteredCases = mockCases;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 font-primary">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-cyan">Case Directory</h2>
          <div className="flex gap-2">
            <button className="bg-blueViolet text-white px-4 py-2 rounded font-medium shadow hover:bg-cyan transition">
              DEFAULT VIEW
            </button>
            <button className="border border-blueViolet text-blueViolet px-4 py-2 rounded font-medium hover:bg-blueViolet hover:text-white transition">
              DETAILED VIEW
            </button>
            <button className="bg-accent text-white px-4 py-2 rounded font-medium shadow ml-2 hover:bg-cyan transition">
              + NEW CASE
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-4 items-center border border-gray-200">
          <select
            className="border rounded px-3 py-2 text-sm font-sans"
            value={filters.caseOrigin}
            onChange={(e) =>
              setFilters((f) => ({ ...f, caseOrigin: e.target.value }))
            }
          >
            {filterOptions.caseOrigin.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2 text-sm font-sans"
            value={filters.outcome}
            onChange={(e) =>
              setFilters((f) => ({ ...f, outcome: e.target.value }))
            }
          >
            {filterOptions.outcome.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2 text-sm font-sans"
            value={filters.disease}
            onChange={(e) =>
              setFilters((f) => ({ ...f, disease: e.target.value }))
            }
          >
            {filterOptions.disease.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2 text-sm font-sans"
            value={filters.classification}
            onChange={(e) =>
              setFilters((f) => ({ ...f, classification: e.target.value }))
            }
          >
            {filterOptions.classification.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2 text-sm font-sans"
            value={filters.followUp}
            onChange={(e) =>
              setFilters((f) => ({ ...f, followUp: e.target.value }))
            }
          >
            {filterOptions.followUp.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          <input
            className="border rounded px-3 py-2 text-sm font-sans w-48"
            placeholder="ID, EPID number, external ID..."
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value }))
            }
          />
          <input
            className="border rounded px-3 py-2 text-sm font-sans w-48"
            placeholder="Person ID/name/contact info..."
            value={filters.personSearch}
            onChange={(e) =>
              setFilters((f) => ({ ...f, personSearch: e.target.value }))
            }
          />
          <input
            className="border rounded px-3 py-2 text-sm font-sans w-48"
            placeholder="Event: ID, title, description"
            value={filters.eventSearch}
            onChange={(e) =>
              setFilters((f) => ({ ...f, eventSearch: e.target.value }))
            }
          />
          <button className="bg-blueViolet text-white px-4 py-2 rounded font-medium shadow hover:bg-cyan transition">
            APPLY FILTERS
          </button>
          <button className="border border-blueViolet text-blueViolet px-4 py-2 rounded font-medium hover:bg-gray-100 hover:text-blueViolet transition">
            RESET FILTERS
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 mt-2">
          {[
            { label: "All", count: 22 },
            { label: "Investigation pending" },
            { label: "Investigation done" },
            { label: "Investigation discarded" },
          ].map((tab, i) => (
            <button
              key={tab.label}
              className={`px-4 py-1 rounded-full border font-sans text-sm transition
                ${
                  i === 0
                    ? "bg-blueViolet text-white border-blueViolet"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-cyan hover:text-white"
                }`}
            >
              {tab.label}{" "}
              {tab.count && (
                <span className="ml-1 bg-cyan text-white rounded-full px-2 py-0.5 text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
          <select
            className="ml-auto border rounded px-3 py-2 text-sm font-sans"
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({ ...f, status: e.target.value }))
            }
          >
            {filterOptions.status.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow mt-4 border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 font-sans">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CASE ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PERSON ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DISEASE
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CASE CLASSIFICATION
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  OUTCOME OF CASE
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATE
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LGA
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  HEALTH FACILITY
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  REGION
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DATE OF ONSET
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DATE OF CONFIRMATION
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  REPORTING SOURCE
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AGE
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SEX
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  OCCUPATION
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SYMPTOMS
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RISK FACTORS
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CATEGORY
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredCases.map((c, idx) => (
                <tr key={c.caseId} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-3 text-cyan font-semibold cursor-pointer hover:underline">
                    {c.caseId}
                  </td>
                  <td className="px-4 py-3">{c.epidNumber}</td>
                  <td className="px-4 py-3">{c.internalToken}</td>
                  <td className="px-4 py-3">{c.disease}</td>
                  <td className="px-4 py-3">{c.diseaseVariant}</td>
                  <td className="px-4 py-3">{c.caseClassification}</td>
                  <td className="px-4 py-3">{c.outcome}</td>
                  <td className="px-4 py-3">{c.investigationStatus}</td>
                  <td className="px-4 py-3 text-blueViolet font-semibold cursor-pointer hover:underline">
                    {c.personId}
                  </td>
                  <td className="px-4 py-3">{c.firstName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Cases;
