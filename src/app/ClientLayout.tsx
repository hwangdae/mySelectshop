"use client";
import MapComponent from "@/components/mapComponents/Map";
import HeaderContainer from "@/components/sidebarComponents/HeaderContainer";
import { SessionProvider } from "next-auth/react";
import React from "react";
import styled from "styled-components";
import { getCurrentUser } from "./actions/getCurrentUser";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/styles/defaultTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import GlobalModal from "@/globalState/GlobalModal";
import { ModalProvider } from "./context/ModalContext";

const queryClient = new QueryClient();

const KakaoMap = dynamic(() => import("../components/mapComponents/Map"), {
  ssr: false, // 서버 사이드 렌더링을 비활성화
});

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <S.Container>
              <S.SideContainer>
                <S.StyleHeader>
                  <HeaderContainer />
                </S.StyleHeader>
                <S.StyleContent>{children}</S.StyleContent>
                <GlobalModal />
              </S.SideContainer>
              <S.MapContainer>
                <KakaoMap />
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
