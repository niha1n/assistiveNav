import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("camera");

  const renderContent = () => {
    switch (activeTab) {
      case "camera":
        return (
          <>
            <div className="mb-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">Camera Feed</h2>
              <div className="mt-6">
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/B9synWjqBn8?si=KqL_1oxH8P3TQgZ9" // Replace with a random YouTube video URL
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="mt-4 text-gray-600">
                📷 Camera feed is displayed here (dummy content).
              </p>
            </div>
          </>
        );
      case "tracking":
        return (
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Live Tracking</h2>
            <div className="mt-6">
              <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                  center={{ lat: 40.7128, lng: -74.0060 }} 
                  zoom={12}
                >
                  <Marker position={{ lat: 40.7128, lng: -74.0060 }} /> 
                </GoogleMap>
              </LoadScript>
            </div>
            <p className="mt-4 text-gray-600">
              📍 Live tracking information is displayed here (dummy content).
            </p>
          </div>
        );
      case "history":
        return (
          <div>
            📜 History of locations and camera feeds are displayed here
            (dummy content).
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
        <h1 className="text-md lg:text-xl font-bold text-gray-800">Assistive Navigation System</h1>
        <div className="flex items-center gap-2">
          <p className="text-md hidden md:block font-semibold text-gray-800">Nandana</p>
          <FaUserCircle className="text-3xl text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Central Tabs */}
      <div className="mt-10 flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 space-y-4">
        <button
          onClick={() => setActiveTab("camera")}
          className={`px-6 py-2 rounded-md w-full sm:w-auto ${
            activeTab === "camera" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Camera Feed
        </button>
        <button
          onClick={() => setActiveTab("tracking")}
          className={`px-6 py-2 rounded-md w-full sm:w-auto ${
            activeTab === "tracking" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Live Tracking
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-6 py-2 rounded-md w-full sm:w-auto ${
            activeTab === "history" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-800"
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
