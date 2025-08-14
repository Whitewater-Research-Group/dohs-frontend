import React, { useState } from "react";
import DashboardLayout from "../../../components/dashboardLayouts/Dashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

function OverviewDashboard() {
  const [activeTab, setActiveTab] = useState("Disease");

  // Placeholder data
  const stats = [
    { label: "Reports Uploaded", value: "7,265", change: "+11.02%" },
    { label: "Visits", value: "3,671", change: "-0.03%" },
    { label: "New Reports", value: "156", change: "+15.03%" },
    { label: "Live Reporters", value: "28", change: "+6.08%" },
  ];
  const diseases = [
    "Yellow Fever",
    "Ebola",
    "Avian Influenza",
    "Lassa Fever",
    "Dengue",
    "Monkey Pox",
  ];
  const states = [
    { name: "Lagos", value: 25000 },
    { name: "Kano", value: 20000 },
    { name: "Abuja", value: 18000 },
    { name: "Rivers", value: 15000 },
    { name: "Kaduna", value: 12000 },
    { name: "Ogun", value: 10000 },
  ];
  const locations = [
    { name: "North", value: 38.6 },
    { name: "East", value: 22.5 },
    { name: "South", value: 30.8 },
    { name: "West", value: 8.1 },
  ];

  // Sample data for the line chart
  const lineData = [
    { month: "Jan", thisYear: 12000, lastYear: 10000 },
    { month: "Feb", thisYear: 15000, lastYear: 12000 },
    { month: "Mar", thisYear: 18000, lastYear: 14000 },
    { month: "Apr", thisYear: 20000, lastYear: 16000 },
    { month: "May", thisYear: 22000, lastYear: 18000 },
    { month: "Jun", thisYear: 25000, lastYear: 20000 },
    { month: "Jul", thisYear: 23000, lastYear: 21000 },
  ];

  // Colors for pie chart
  const pieColors = ["#60a5fa", "#818cf8", "#34d399", "#fbbf24"];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Overview</h2>
          <span className="text-gray-400">Today</span>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow p-5 flex flex-col gap-2"
            >
              <span className="text-gray-500 text-sm">{stat.label}</span>
              <span className="text-2xl font-bold">{stat.value}</span>
              <span
                className={`text-xs ${
                  stat.change.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* Tabs/Filters */}
        <div className="flex gap-2 mt-2">
          {["Disease", "Environmental"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-full border ${
                activeTab === tab
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "bg-white border-gray-300 text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Line Chart and Device/Location Charts */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Line Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex gap-6 mb-4">
                <span className="font-semibold text-gray-700">
                  Total Reports
                </span>
                <span className="text-gray-400">Total Projects</span>
                <span className="text-gray-400">Operating Status</span>
                <span className="ml-auto text-xs text-gray-400">This year</span>
                <span className="text-xs text-gray-300">Last year</span>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lineData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="thisYear"
                      stroke="#2563eb"
                      name="This year"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="lastYear"
                      stroke="#a5b4fc"
                      name="Last year"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* State and Location Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reports by States */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-2">Reports by States</h3>
                <div className="flex items-end gap-2 h-32">
                  {states.map((state) => (
                    <div
                      key={state.name}
                      className="flex flex-col items-center w-8"
                    >
                      <div
                        className="bg-blue-400 rounded-t"
                        style={{
                          height: `${state.value / 300}px`,
                          minHeight: "20px",
                          width: "100%",
                        }}
                      ></div>
                      <span className="text-xs mt-1 text-gray-500">
                        {state.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Reports by Location (Pie Chart) */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-2">Reports by Location</h3>
                <div className="flex items-center justify-center h-32">
                  <ResponsiveContainer width={120} height={120}>
                    <PieChart>
                      <Pie
                        data={locations}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name}`}
                      >
                        {locations.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={pieColors[index % pieColors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="mt-2 text-xs text-gray-600">
                  {locations.map((loc, idx) => (
                    <li
                      key={loc.name}
                      className="flex justify-between items-center"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: pieColors[idx % pieColors.length],
                          }}
                        ></span>
                        {loc.name}
                      </span>
                      <span>{loc.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Right: Disease List */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-2">Report by Disease</h3>
              <ul className="space-y-2">
                {diseases.map((disease) => (
                  <li
                    key={disease}
                    className="flex items-center justify-between text-gray-700"
                  >
                    <span>{disease}</span>
                    <span className="w-12 h-2 bg-gray-200 rounded-full"></span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Marketing & SEO Placeholder */}
            <div className="bg-white rounded-xl shadow p-6 flex-1 flex items-center justify-center text-gray-400">
              Marketing & SEO Placeholder
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OverviewDashboard;
