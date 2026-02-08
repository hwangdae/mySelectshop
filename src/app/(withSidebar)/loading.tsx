import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      {/* Sidebar Skeleton */}
      <div
        style={{
          width: 360,
          backgroundColor: "#353535",
          padding: 16,
        }}
      >
        <div
          style={{
            height: 40,
            backgroundColor: "#202020",
            borderRadius: 4,
            marginBottom: 16,
          }}
        />
        <div
          style={{
            height: 40,
            backgroundColor: "#3d3dff",
            borderRadius: 4,
          }}
        />
      </div>

      {/* Map Placeholder */}
      <div style={{ flex: 1, backgroundColor: "#f5f5f5" }} />
    </div>
  );
};

export default Loading;
