import React from "react";

const SideSkeleton = () => {
  return (
    <aside style={{ width: 360, padding: 16 }}>
      <div style={{ height: 48, background: "#eee", marginBottom: 16 }} />
      <div style={{ height: 80, background: "#eee" }} />
    </aside>
  );
};

export default SideSkeleton;
