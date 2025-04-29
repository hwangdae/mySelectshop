"use client";
import { styleFont } from "@/styles/styleFont";
import styled from "styled-components";
import { Button } from "@mui/material";
import { styleColor } from "@/styles/styleColor";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Search from "@/assets/Search.svg";
import { useModal } from "@/context/ModalContext";
import { searchTermStore, showFollowListStore } from "@/globalState";

const Header = () => {
  const { searchTerm, setSearchTerm } = searchTermStore();
  const { setShowFollowListToggle } = showFollowListStore();
  const router = useRouter();
  const pathname = usePathname();
  const { data: userData } = useSession();
  const { openModal } = useModal();

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
                setSearchTerm("");
              }}
            >
              MySelectshop
            </button>
          </S.Logo>
          {!userData?.user ? (
            <Button onClick={() => openModal({ type: "login" })}>로그인</Button>
          ) : (
            <Button
              onClick={() => {
                if (window.confirm("로그아웃 하시겠어요?")) {
                  signOut();
                }else{
                  return ;
                }
              }}
            >
              로그아웃
            </Button>
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

export default Header;

const S = {
  HeaderContainer: styled.header`
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
      font-weight: 500;
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
