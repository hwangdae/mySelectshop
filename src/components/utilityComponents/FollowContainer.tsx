import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";
import Check from "@/assets/Check.svg";
import { FollowType } from "@/types/followType";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

interface PropsType {
  id: string;
}

const FollowContainer = ({ id }: PropsType) => {
  const { data: userData } = useSession();
  const router = useRouter();

  const { data: followList } = useQuery({
    queryKey: ["followList"],
    queryFn: async () => {
      const res = await axios.get("/api/follow");
      return res.data;
    },
  });

  const isFollowing = followList?.find((v: FollowType) => {
    return v.following_id === id && v.follower_id === userData?.user?.id;
  });

  const followButtonHandler = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!userData) {
      alert("로그인이 필요한 서비스 입니다.");
      router.push("?modal=login");
      return;
    }
    await axios.post("/api/follow",id);
  };
  console.log(userData?.user?.id,"로그인 아이디")
  console.log(id,"리뷰쓴 아이디")
  return (
    <S.FollowContainer>
      {userData?.user?.id !== id && (
        <S.FollowButton
          $followState={isFollowing}
          onClick={followButtonHandler}
        >
          {isFollowing ? (
            <S.Following>
              <Check
                width={"12px"}
                height={"12px"}
                fill={`${styleColor.GREEN.main}`}
              />
              팔로잉
            </S.Following>
          ) : (
            <p>팔로우</p>
          )}
        </S.FollowButton>
      )}
    </S.FollowContainer>
  );
};

export default FollowContainer;

const S = {
  FollowContainer: styled.div`
    width: 30%;
    height: 100%;
  `,
  FollowButton: styled.button<{ $followState: boolean | null | undefined }>`
    cursor: pointer;
    width: 100%;
    ${styleFont.text.txt_sm}
    font-weight: 500;
    letter-spacing: -1px;
    color: ${styleColor.WHITE};
    padding: 7px 0px;
    border-radius: 4px;
    box-shadow: 0px 0px 5px 1px rgba(124, 124, 124, 0.1);
    background-color: ${(props) =>
      props.$followState
        ? `${styleColor.BLACK[300]}`
        : `${styleColor.RED.main}`};
  `,
  Following: styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    color: ${styleColor.GREEN.main};
  `,
};
