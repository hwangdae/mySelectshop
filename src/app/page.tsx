"use client";
import ContentsContainer from "@/components/sidebarComponents/ContentsContainer";
import styled from "styled-components";

export default function Home() {
  return <ContentsContainer />;
}

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
    width: 500px;
    height: 500px;
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
