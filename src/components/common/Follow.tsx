import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import React from "react";
import styled from "styled-components";
import Check from "@/assets/Check.svg";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useModal } from "@/context/ModalContext";
import { isUserFollowing } from "@/lib/follow";
import useFollowMutate from "@/hook/mutate/follow/useFollow";

interface PropsType {
  id: string;
  isMutualFollow?: () => void;
}

const Follow = ({ id, isMutualFollow }: PropsType) => {
  const { data: userData } = useSession();
  const { openModal } = useModal();
  const { followMutate } = useFollowMutate(id, userData?.user?.id);

  const { data: isFollowing } = useQuery({
    queryKey: ["isFollowing", id, userData?.user?.id],
    queryFn: () => isUserFollowing(id, userData?.user?.id),
    enabled: !!userData?.user?.id,
  });

  const followButtonHandler = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!userData) {
      alert("로그인이 필요한 서비스 입니다.");
      openModal({ type: "login" });
      return;
    }
    try {
      followMutate.mutate(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.FollowContainer>
      <div>
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
              <>{isMutualFollow ? <p>맞팔로우</p> : <p>팔로우</p>}</>
            )}
          </S.FollowButton>
        )}
      </div>
    </S.FollowContainer>
  );
};

export default Follow;

const S = {
  FollowContainer: styled.div`
    width: 60%;
    height: 100%;
  `,
  FollowButton: styled.button<{ $followState: boolean | null | undefined }>`
    cursor: pointer;
    width: 100%;
    ${styleFont.text.txt_xs}
    font-weight: 500;
    letter-spacing: -1px;
    color: ${styleColor.WHITE};
    padding: 7px 8px;
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
