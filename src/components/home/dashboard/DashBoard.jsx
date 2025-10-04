// components/DashboardGraphs.jsx
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as d3 from "d3";
import { fetchGraphData } from "../../../slices/GraphSlice";

const DashboardGraphs = () => {
  const dispatch = useDispatch();
  const { overall, monthWise, loading } = useSelector(
    (state) => state.graphReducer
  );

  const lineRef = useRef();
  const barRef = useRef();
  const pieRef = useRef();

  useEffect(() => {
    dispatch(fetchGraphData());
  }, [dispatch]);

  // --- LINE CHART ---
  useEffect(() => {
    if (loading || !monthWise) return;
    d3.select(lineRef.current).selectAll("*").remove();

    const data = Object.entries(monthWise).map(([month, stats]) => ({
      month,
      placed: stats.placed,
      rejected: stats.rejected,
      attended: stats.attended,
    }));

    const margin = { top: 30, right: 30, bottom: 40, left: 60 },
      width = 400 - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;

    const svg = d3
      .select(lineRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.month))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => Math.max(d.placed, d.rejected, d.attended)) + 5,
      ])
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    const lines = [
      {
        key: "Placed",
        color: "#4caf50",
        values: data.map((d) => ({ month: d.month, value: d.placed })),
      },
      {
        key: "Rejected",
        color: "#f44336",
        values: data.map((d) => ({ month: d.month, value: d.rejected })),
      },
      {
        key: "Attended",
        color: "#2196f3",
        values: data.map((d) => ({ month: d.month, value: d.attended })),
      },
    ];

    const line = d3
      .line()
      .x((d) => x(d.month))
      .y((d) => y(d.value));

    lines.forEach((l) => {
      svg
        .append("path")
        .datum(l.values)
        .attr("fill", "none")
        .attr("stroke", l.color)
        .attr("stroke-width", 2)
        .attr("d", line);

      svg
        .selectAll(`.dot-${l.key}`)
        .data(l.values)
        .join("circle")
        .attr("cx", (d) => x(d.month))
        .attr("cy", (d) => y(d.value))
        .attr("r", 3)
        .attr("fill", l.color);
    });
  }, [monthWise, loading]);

  // --- BAR CHART ---
  useEffect(() => {
    if (loading || !monthWise) return;
    d3.select(barRef.current).selectAll("*").remove();

    const data = Object.entries(monthWise).map(([month, stats]) => ({
      month,
      placed: stats.placed,
      rejected: stats.rejected,
      attended: stats.attended,
    }));

    const margin = { top: 30, right: 30, bottom: 40, left: 60 },
      width = 400 - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;

    const svg = d3
      .select(barRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x0 = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([0, width])
      .padding(0.2);

    const x1 = d3
      .scaleBand()
      .domain(["Placed", "Rejected", "Attended"])
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => Math.max(d.placed, d.rejected, d.attended)) + 5,
      ])
      .nice()
      .range([height, 0]);

    const color = d3
      .scaleOrdinal()
      .domain(["Placed", "Rejected", "Attended"])
      .range(["#4caf50", "#f44336", "#2196f3"]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x0));

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("g.layer")
      .data(data)
      .join("g")
      .attr("transform", (d) => `translate(${x0(d.month)},0)`)
      .selectAll("rect")
      .data((d) => [
        { key: "Placed", value: d.placed },
        { key: "Rejected", value: d.rejected },
        { key: "Attended", value: d.attended },
      ])
      .join("rect")
      .attr("x", (d) => x1(d.key))
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", (d) => color(d.key));
  }, [monthWise, loading]);

  // --- PIE CHART ---
  useEffect(() => {
    if (loading || !overall) return;
    d3.select(pieRef.current).selectAll("*").remove();

    const pieData = [
      { label: "Placed", value: overall.totalPlaced },
      { label: "Rejected", value: overall.totalRejected },
      { label: "Attended", value: overall.totalAttended },
    ];

    const width = 300,
      height = 300,
      radius = 120;

    const svg = d3
      .select(pieRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const color = d3
      .scaleOrdinal()
      .domain(pieData.map((d) => d.label))
      .range(["#4caf50", "#f44336", "#2196f3"]);

    const arcs = svg.selectAll("arc").data(pie(pieData)).join("g");
    arcs.append("path").attr("d", arc).attr("fill", (d) => color(d.data.label));

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", 13)

  }, [overall, loading]);

  if (loading) return <p className="p-6">Loading...</p>;

  // --- Helper Legend Component ---
  const Legend = () => (
    <div className="flex gap-4 justify-center mb-3 text-sm">
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 bg-[#4caf50] rounded-full"></span> Placed
      </div>
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 bg-[#f44336] rounded-full"></span> Rejected
      </div>
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 bg-[#2196f3] rounded-full"></span> Attended
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center mb-8">📊 Grooming Dashboard</h1>

      {/* LINE CHART + TABLE */}
      <div className="flex justify-between gap-6">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-4">
          <Legend />
          <div ref={lineRef}></div>
        </div>
        <div className="w-full md:w-1/2 bg-gray-50 shadow rounded-lg p-4 overflow-x-auto">
          <h3 className="font-semibold text-lg mb-3">Line Chart Data</h3>
          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Month</th>
                <th className="p-2 border">Placed</th>
                <th className="p-2 border">Rejected</th>
                <th className="p-2 border">Attended</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(monthWise).map(([month, s]) => (
                <tr key={month}>
                  <td className="p-2 border">{month}</td>
                  <td className="p-2 border">{s.placed}</td>
                  <td className="p-2 border">{s.rejected}</td>
                  <td className="p-2 border">{s.attended}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BAR CHART + TABLE */}
      <div className="flex justify-between gap-6">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-4">
          <Legend />
          <div ref={barRef}></div>
        </div>
        <div className="w-full md:w-1/2 bg-gray-50 shadow rounded-lg p-4 overflow-x-auto">
          <h3 className="font-semibold text-lg mb-3">Bar Chart Data</h3>
          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Month</th>
                <th className="p-2 border">Placed</th>
                <th className="p-2 border">Rejected</th>
                <th className="p-2 border">Attended</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(monthWise).map(([month, s]) => (
                <tr key={month}>
                  <td className="p-2 border">{month}</td>
                  <td className="p-2 border">{s.placed}</td>
                  <td className="p-2 border">{s.rejected}</td>
                  <td className="p-2 border">{s.attended}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PIE CHART + SUMMARY TABLE */}
      <div className="flex justify-between gap-6">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-4 flex flex-col items-center">
          <Legend />
          <div ref={pieRef}></div>
        </div>
        <div className="w-full md:w-1/2 bg-gray-50 shadow rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">Overall Summary</h3>
          <table className="w-full border text-sm">
            <tbody>
              <tr><td className="p-2 border">Total Requirements</td><td className="p-2 border">{overall.totalRequirements}</td></tr>
              <tr><td className="p-2 border">Total Companies</td><td className="p-2 border">{overall.totalCompanies}</td></tr>
              <tr><td className="p-2 border">Total Groomings</td><td className="p-2 border">{overall.totalGroomingsDone}</td></tr>
              <tr><td className="p-2 border">Total Placed</td><td className="p-2 border">{overall.totalPlaced}</td></tr>
              <tr><td className="p-2 border">Total Rejected</td><td className="p-2 border">{overall.totalRejected}</td></tr>
              <tr><td className="p-2 border">Total Attended</td><td className="p-2 border">{overall.totalAttended}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardGraphs;
