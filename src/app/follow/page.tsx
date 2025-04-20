"use client";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { styleFont } from "@/styles/styleFont";
import { styleColor } from "@/styles/styleColor";
import People from "@/assets/People.svg";
import { formatFollowCount } from "@/utils/formatFollowCount";
import { useSession } from "next-auth/react";
import { getFollowers, getFollowing } from "@/lib/follow";
import { getUserList } from "@/lib/user";
import { TFollow, TUser } from "@/types";
import User from "@/components/common/User";
import { useState } from "react";

interface TTab {
  id: string;
  name: string;
  count: number | undefined;
}

interface PropsType {
  followTypeParams: "follower" | "following";
}

const FollowPage = ({ followTypeParams }: PropsType) => {
  const [followType, setFollowType] = useState<"follower" | "following">(
    followTypeParams
  );

  const { data: userData } = useSession();

  const { data: followerData } = useQuery({
    queryKey: ["followerList", userData?.user?.id],
    queryFn: () => getFollowers(userData?.user?.id),
  });

  const { data: followingData } = useQuery({
    queryKey: ["followingList", userData?.user?.id],
    queryFn: () => getFollowing(userData?.user?.id),
  });

  const { data: userList } = useQuery({
    queryKey: ["userList"],
    queryFn: getUserList,
  });

  const isMutualFollow = () => {
    return (
      followerData?.some(
        (follower: TFollow) => follower.followerId === userData?.user?.id
      ) &&
      followingData?.some(
        (following: TFollow) => following.followingId === userData?.user?.id
      )
    );
  };

  const followerList = userList?.filter((user: TUser) =>
    followerData?.some(
      (follower: TFollow) => user?.id === follower?.followingId
    )
  );

  const followingList = userList?.filter((user: TUser) =>
    followingData?.some(
      (following: TFollow) => user?.id === following?.followerId
    )
  );

  const FOLLOWTABNAV = [
    { id: "follower", name: "팔로워", count: followerList?.length || 0 },
    { id: "following", name: "팔로잉", count: followingList?.length || 0 },
  ];

  return (
    <S.FollowContainer>
      <S.FollowInner>
        <S.FollowNavWrap>
          {FOLLOWTABNAV.map((tab: TTab) => {
            return (
              <S.Content key={tab.id}>
                <S.TabButton
                  onClick={() =>
                    setFollowType(tab.id as "follower" | "following")
                  }
                  $isActive={followType === tab.id}
                >
                  <h1>
                    <span>{formatFollowCount(tab.count)}</span>
                    {tab.name}
                  </h1>
                </S.TabButton>
              </S.Content>
            );
          })}
        </S.FollowNavWrap>
        {followType === "follower" ? (
          followerList && followerList?.length > 0 ? (
            <S.FollowList>
              {followerList?.map((user: TUser) => {
                return (
                  <li key={user.id}>
                    <User
                      user={user}
                      type={"follow"}
                      isMutualFollow={() => isMutualFollow()}
                    />
                  </li>
                );
              })}
            </S.FollowList>
          ) : (
            <S.EmptyMessage>
              <People
                width={"25px"}
                height={"25px"}
                fill={`${styleColor.GRAY[500]}`}
              />
              아직 팔로워가 없습니다.
            </S.EmptyMessage>
          )
        ) : followingList && followingList?.length > 0 ? (
          <S.FollowList>
            {followingList?.map((user: TUser) => {
              return (
                <li key={user.id}>
                  <User user={user} type={"follow"} />
                </li>
              );
            })}
          </S.FollowList>
        ) : (
          <S.EmptyMessage>
            <People
              width={"25px"}
              height={"25px"}
              fill={`${styleColor.GRAY[500]}`}
            />
            아직 팔로잉이 없습니다.
          </S.EmptyMessage>
        )}
      </S.FollowInner>
    </S.FollowContainer>
  );
};

export default FollowPage;

const S = {
  FollowContainer: styled.div`
    width: 400px;
    height: 400px;
    overflow: hidden;
  `,
  FollowInner: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  FollowNavWrap: styled.ul`
    height: 10%;
    padding: 0px 12px;
    display: flex;
    justify-content: start;
    background-color: ${styleColor.INDIGO.main};
    border-bottom: solid 1px ${styleColor.WHITE};
  `,
  Content: styled.li``,
  TabButton: styled.button<{ $isActive: boolean }>`
    cursor: pointer;
    padding: 10px 14px;
    border-bottom: ${(props) =>
      props.$isActive ? `2px solid ${styleColor.WHITE}` : "none"};
    h1 {
      ${styleFont.title.tit_xs}
      font-weight: ${(props) => (props.$isActive ? "600" : "400")};
      color: ${styleColor.WHITE};
      span {
        margin-right: 4px;
      }
    }
  `,
  FollowList: styled.ul`
    padding-top: 10px;
    overflow-y: scroll;
    height: 90%;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  EmptyMessage: styled.h1`
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    ${styleFont.title.tit_md};
    color: ${styleColor.GRAY[500]};
  `,
};
