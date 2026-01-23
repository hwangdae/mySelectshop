"use client";
import Header from "@/features/sidebar/Header";
import { SessionProvider } from "next-auth/react";
import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/shared/styles/defaultTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "../context/ModalContext";
import MapComponent from "@/features/map/Map";
import GlobalModal from "@/shared/components/GlobalModal";

const queryClient = new QueryClient();

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <S.Container>
              <S.SideContainer>
                <S.StyleHeader>
                  <Header />
                </S.StyleHeader>
                <S.StyleContent>{children}</S.StyleContent>
                <GlobalModal />
              </S.SideContainer>
              <S.MapContainer>
                <MapComponent />
              </S.MapContainer>
            </S.Container>
          </ModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default ClientLayout;

const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
  `,

  Content: styled.div`
    flex: 2;
    padding: 20px;
    overflow-y: auto;
  `,
  MapContainer: styled.div`
    flex: 1;
    width: 50%;
  `,
  SideContainer: styled.aside`
    left: 0;
    top: 0;
    width: 360px;
    height: 100vh;
    z-index: 999;
    background-color: #fff;
  `,
  StyleHeader: styled.div`
    left: 0;
    top: 0;
    width: 100%;
  `,
  StyleContent: styled.div`
    flex: 1;
    height: calc(100vh - 137.5px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  Nav: styled.nav`
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
  `,
  TabButton: styled.button`
    background-color: #f0f0f0;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #e0e0e0;
    }
    &:focus {
      outline: none;
      background-color: #d0d0d0;
    }
  `,
};
