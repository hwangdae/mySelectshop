"use client";
import React from "react";
import MapComponent from "@/features/map/Map";
import styled from "styled-components";
import Sidebar from "@/features/sidebar/Sidebar";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/shared/styles/defaultTheme";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <S.Container>
      <ThemeProvider theme={theme}>
        <Sidebar>{children}</Sidebar>
      </ThemeProvider>
      <S.MapArea>
        <MapComponent />
      </S.MapArea>
    </S.Container>
  );
};

export default layout;
const S = {
  Container: styled.div`
    display: flex;
    height: 100vh;
  `,
  MapArea: styled.div`
    flex: 1;
  `,
};
