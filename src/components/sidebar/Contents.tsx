import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import styled from "styled-components";
import MyAddress from "./MyAddress";
import Profile from "../profile/Profile";
import { useSession } from "next-auth/react";
import ShowFollow from "./ShowFollow";
import useInitializeMapState from "@/hook/useInitializeMapState";
import { myLocationStore, showFollowListStore } from "@/globalState";
import { useModal } from "@/context/ModalContext";
import { useRouter } from "next/navigation";

const CONTENTSTABNAV = [
  { id: "nearbySelectshop", name: "편집샵 보기" },
  { id: "visitedSelectshop", name: "방문한 편집샵 보기" },
  { id: "notVisiteSelectshop", name: "방문하지 못한 편집샵 보기" },
  { id: "bestReviewer", name: "베스트 리뷰어" },
];

const Contents = () => {
  const router = useRouter();
  const { showFollowListToggle } = showFollowListStore();
  const { data: session } = useSession();
  const { center } = myLocationStore();
  const { lat, lng } = center;
  useInitializeMapState(lat, lng);
  const { openModal } = useModal();

  const viewSelectshopHandle = (id: string) => {
    if (!session && id !== "nearbySelectshop" && id !== "bestReviewer") {
      alert("로그인이 필요한 서비스입니다.");
      openModal({ type: "login" });
    } else {
      router.push(`${id}`);
    }
  };

  return (
    <S.ContentsContainer>
      <Profile />
      {showFollowListToggle ? (
        <ShowFollow />
      ) : (
        <>
          <MyAddress />
          <S.ContentsInner>
            {CONTENTSTABNAV.map((content) => {
              return (
                <S.Content key={content.id}>
                  <S.ContentButton
                    type="button"
                    onClick={() => viewSelectshopHandle(content.id)}
                  >
                    {content.name}
                  </S.ContentButton>
                </S.Content>
              );
            })}
          </S.ContentsInner>
        </>
      )}
    </S.ContentsContainer>
  );
};

export default Contents;

const S = {
  ContentsContainer: styled.main`
    width: 100%;
  `,

  ContentsInner: styled.ul`
    padding: 20px 12px;
  `,
  Content: styled.li`
    margin-bottom: 8px;
  `,
  ContentButton: styled.button`
    cursor: pointer;
    width: 100%;
    border: solid 1px ${styleColor.RED[0]};
    border-radius: 4px;
    padding: 12px 0px;
    ${styleFont.title.tit_xs}
    text-align: left;
    text-indent: 10px;
  `,
};
