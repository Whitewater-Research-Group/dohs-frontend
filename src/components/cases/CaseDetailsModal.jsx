import React from "react";
import { X } from "lucide-react";

const CaseDetailsModal = ({ isOpen, onClose, caseData }) => {
  if (!isOpen || !caseData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Case Details</h2>
            <p className="text-sm text-gray-600 mt-1">
              Case ID: {caseData.case_id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Basic Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Case Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Case ID:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.case_id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Disease:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.disease}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Classification:
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        caseData.classification === "Confirmed"
                          ? "bg-red-100 text-red-800"
                          : caseData.classification === "Probable"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {caseData.classification}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Outcome:
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        caseData.outcome === "Recovered"
                          ? "bg-green-100 text-green-800"
                          : caseData.outcome === "Deceased"
                          ? "bg-red-100 text-red-800"
                          : caseData.outcome === "Under Treatment"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {caseData.outcome || "No Outcome Yet"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Category:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.category}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Patient Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Person ID:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.personID}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Age:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.age} years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Sex:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.sex}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Occupation:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.occupation || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Location Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      State:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.state}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      LGA:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.lga}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Region:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.region}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Health Facility:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.health_facility}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Coordinates:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.latitude}, {caseData.longitude}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Clinical & Dates */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Important Dates
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Date of Onset:
                    </span>
                    <span className="text-sm text-gray-900">
                      {new Date(caseData.date_of_onset).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Date of Confirmation:
                    </span>
                    <span className="text-sm text-gray-900">
                      {new Date(
                        caseData.date_of_confirmation
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Reported At:
                    </span>
                    <span className="text-sm text-gray-900">
                      {new Date(caseData.reported_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Reporting Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Reporting Source:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.reporting_source}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Reporter ID:
                    </span>
                    <span className="text-sm text-gray-900">
                      {caseData.reporter_id || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Record ID:
                    </span>
                    <span className="text-sm text-gray-900">{caseData.id}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Clinical Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500 block mb-2">
                      Symptoms:
                    </span>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {caseData.symptoms || "No symptoms recorded"}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 block mb-2">
                      Risk Factors:
                    </span>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {caseData.risk_factors || "No risk factors recorded"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                console.log("Edit case:", caseData.case_id);
              }}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              Edit Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsModal;
