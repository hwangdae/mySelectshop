"use client";
import { styleFont } from "@/styles/styleFont";
import styled from "styled-components";
import { Button } from "@mui/material";
import { styleColor } from "@/styles/styleColor";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { searchTermStore, showFollowListStore } from "@/globalState/zustand";
import Search from "@/assets/Search.svg";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

const HeaderContainer = () => {
  const { searchTerm, setSearchTerm } = searchTermStore();
  const { setShowFollowListToggle } = showFollowListStore();
  const router = useRouter();
  const pathname = usePathname();
  const { data: userData } = useSession();

  const searchSelectshopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      router.push("/nearbySelectshop");
    }
  };

  return (
    <S.HeaderContainer>
      <S.HeaderInner>
        <S.HeaderTop>
          <S.Logo>
            <button
              onClick={() => {
                router.push("/");
                setShowFollowListToggle(false);
              }}
            >
              MySelectshop
            </button>
          </S.Logo>
          {!userData?.user ? (
            <Button onClick={() => signIn()}>로그인</Button>
          ) : (
            <Button onClick={() => signOut()}>로그아웃</Button>
          )}
        </S.HeaderTop>
        <S.SearchForm onSubmit={searchSelectshopSubmit}>
          <S.SearchInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="찾으시는 셀렉샵 있으신가요?"
          />
          <S.SearchButton>
            <Search fill="#919191" />
          </S.SearchButton>
        </S.SearchForm>
      </S.HeaderInner>
    </S.HeaderContainer>
  );
};

export default HeaderContainer;

const S = {
  HeaderContainer: styled.div`
    width: 100%;
    left: 0;
    top: 0;
  `,
  HeaderInner: styled.div`
    padding: 20px 12px;
    background-color: ${styleColor.INDIGO.main};
  `,
  HeaderTop: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
  Logo: styled.h1`
    button {
      cursor: pointer;
      ${styleFont.title.tit_md}
      font-weight: bold;
      color: #fff;
    }
  `,
  SearchForm: styled.form`
    position: relative;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  SearchInput: styled.input`
    width: 94%;
    outline: none;
    border: none;
    padding: 14px;
    border-radius: 4px;
    &::placeholder {
      font-size: 15px;
      font-weight: bold;
      color: #919191;
      letter-spacing: -1px;
    }
  `,
  SearchButton: styled.button`
    cursor: pointer;
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -15px;
  `,
};
