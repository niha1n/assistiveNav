import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import CameraFeed from "../components/CameraFeed";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("camera");
  // Initial GPS state with a default location (e.g. New York City)
  const [gps, setGps] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    altitude: null,
    status: "Fetching GPS data...",
  });
  const [gpsHistory, setGpsHistory] = useState([]);

  // Fetch GPS data from the backend every 3 seconds
  useEffect(() => {
    const fetchGpsData = () => {
      fetch("http://raspberrypi.local:5000/gps")
        .then((response) => response.json())
        .then((data) => {
          if (data.latitude && data.longitude) {
            const parsedLatitude = parseFloat(data.latitude);
            const parsedLongitude = parseFloat(data.longitude);
            const newGps = {
              latitude: parsedLatitude,
              longitude: parsedLongitude,
              altitude: data.altitude,
              status: data.status,
            };
            setGps(newGps);
          } else {
            setGps((prev) => ({
              ...prev,
              status: data.status || "No GPS data",
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching GPS data:", error);
          setGps((prev) => ({ ...prev, status: "Error fetching GPS data" }));
        });
    };

    // Initial fetch and then poll every 3 seconds
    fetchGpsData();
    const intervalId = setInterval(fetchGpsData, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Update GPS history on GPS change
  useEffect(() => {
    if (gps.latitude && gps.longitude) {
      setGpsHistory((prevHistory) => {
        const lastEntry = prevHistory[prevHistory.length - 1];
        // Only add a new entry if the position changed
        if (
          !lastEntry ||
          lastEntry.latitude !== gps.latitude ||
          lastEntry.longitude !== gps.longitude
        ) {
          return [
            ...prevHistory,
            { ...gps, timestamp: new Date().toLocaleTimeString() },
          ];
        }
        return prevHistory;
      });
    }
  }, [gps]);

  const renderContent = () => {
    switch (activeTab) {
      case "camera":
        return (
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Camera Feed</h2>
            <div className="mt-6">
              <CameraFeed />
            </div>
            <p className="mt-4 text-gray-600">
              📷 Live camera feed from the backend.
            </p>
          </div>
        );
      case "tracking":
        return (
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Live Tracking
            </h2>
            <div className="mt-6">
              <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
              >
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                  center={{ lat: gps.latitude, lng: gps.longitude }}
                  zoom={15}
                >
                  <Marker
                    position={{ lat: gps.latitude, lng: gps.longitude }}
                  />
                </GoogleMap>
              </LoadScript>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Status: {gps.status}</p>
              {gps.altitude && (
                <p className="text-gray-600">Altitude: {gps.altitude}</p>
              )}
              <p className="text-gray-600">Latitude: {gps.latitude}</p>
              <p className="text-gray-600">Longitude: {gps.longitude}</p>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800">GPS History</h2>
            <div className="mt-6 overflow-auto max-h-64">
              {gpsHistory.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Latitude
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Longitude
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Altitude
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {gpsHistory.map((entry, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {entry.timestamp}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {entry.latitude}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {entry.longitude}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {entry.altitude || "N/A"}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {entry.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-600">No GPS history available yet.</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-md lg:text-xl font-bold text-gray-800">
          Assistive Navigation System
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-md hidden md:block font-semibold text-gray-800">
            Nandana
          </p>
          <FaUserCircle className="text-3xl text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Central Tabs */}
      <div className="mt-10 flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 space-y-4">
        <button
          onClick={() => setActiveTab("camera")}
          className={`px-6 py-2 rounded-md w-full sm:w-auto ${
            activeTab === "camera"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Camera Feed
        </button>
        <button
          onClick={() => setActiveTab("tracking")}
          className={`px-6 py-2 rounded-md w-full sm:w-auto ${
            activeTab === "tracking"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Live Tracking
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-6 py-2 rounded-md w-full sm:w-auto ${
            activeTab === "history"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          History
        </button>
      </div>

      {/* Content Section */}
      <div className="mt-4 w-full max-w-4xl mx-auto rounded-lg bg-white p-6 shadow-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default HomePage;
