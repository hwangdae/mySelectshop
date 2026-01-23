import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Contents from "./Contents";
import { usePathname } from "next/navigation";
import VisitedSelectshopPage from "@/app/visitedSelectshop/page";
import NearbySelectshopPage from "@/app/nearbySelectshop/page";
import NotVisiteSelectshopPage from "@/app/notVisiteSelectshop/page";
import BestReviewerPage from "@/app/bestReviewer/page";

const Sidebar = () => {
  const pathname = usePathname();

  const renderContent = () => {
    switch (pathname) {
      case "/nearbySelectshop":
        return <NearbySelectshopPage />;
      case "/visitedSelectshop":
        return <VisitedSelectshopPage />;
      case "/notVisiteSelectshop":
        return <NotVisiteSelectshopPage />;
      case "/bestReviewer":
        return <BestReviewerPage />;
      default:
        return <Contents />;
    }
  };

  return (
    <S.SideContainer>
      <S.StyleHeader>
        <Header />
      </S.StyleHeader>
      <S.StyleContent>{renderContent()}</S.StyleContent>
    </S.SideContainer>
  );
};

export default Sidebar;

const S = {
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
