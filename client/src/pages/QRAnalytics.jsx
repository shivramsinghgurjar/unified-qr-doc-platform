import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { getQRAnalytics } from "../services/qrService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "../styles/qr.css";

function QRAnalytics() {

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    const data = await getQRAnalytics();
    setAnalytics(data);
  };

  if (!analytics) return <div>Loading...</div>;

  // 🔥 SAFE FALLBACK (supports both old + new)
  const chartData =
    analytics.weeklyData ||
    analytics.qrData ||
    [];

  return (
    <Navbar>

      <div className="analytics-container">

        <h2>QR Analytics</h2>

        {/* KPI CARDS */}

        <div className="analytics-cards">

          <div className="analytics-card">
            <h3>Total QR Codes</h3>
            <p>{analytics.totalQRs}</p>
          </div>

          <div className="analytics-card">
            <h3>Total Scans</h3>
            <p>{analytics.totalScans}</p>
          </div>

          <div className="analytics-card">
            <h3>Unique Scans</h3>
            <p>{analytics.totalScans}</p>
          </div>

          {/* 🚀 NEW CARD (DOCUMENT QR) */}
          <div className="analytics-card">
            <h3>Document QR Scans</h3>
            <p>{analytics.documentScans || 0}</p>
          </div>

        </div>

        {/* CHART */}

        <div className="analytics-chart">

          <h3>QR Code Scan Activities</h3>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="scans"
                stroke="#6b4eff"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* TOP QR */}

        {analytics.topQR && (

          <div className="top-qr">

            <h3>Top Performing QR</h3>

            <img src={analytics.topQR.qrUrl} alt="Top QR" />

            <p>{analytics.topQR.scans} scans</p>

          </div>

        )}

      </div>

    </Navbar>
  );
}

export default QRAnalytics;