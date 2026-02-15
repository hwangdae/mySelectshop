import React from "react";
import styled from "styled-components";

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
          backgroundColor: "#fff",
        }}
      >
        <S.List>
          {Array.from({ length: 10 }).map((_, idx) => (
            <S.Item key={idx} />
          ))}
        </S.List>
      </div>

      {/* Map Placeholder */}
      <div style={{ flex: 1, backgroundColor: "#f5f5f5" }} />
    </div>
  );
};

export default Loading;


const S = {
  List: styled.ul`
  `,
  Item: styled.li`
    height: 150px;
    margin: 20px;
    border-radius: 4px;
    background-color: #f0f0f0;
  `,
};
