import { useQuery } from "@tanstack/react-query";
import UserContainer from "../common/UserContainer";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import { styleFont } from "@/styles/styleFont";
import { styleColor } from "@/styles/styleColor";
import People from "@/assets/People.svg";
import { formatFollowCount } from "@/utils/formatFollowCount";
import { useSession } from "next-auth/react";
import { getFollowers, getFollowing } from "@/lib/follow";
import { getUserList } from "@/lib/user";
import { TFollow, TUser } from "@/types";

interface TTab {
  id: string;
  name: string;
  count: number | undefined;
}

const ShowFollowContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const followTab = searchParams?.get("follow");
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
    <S.ShowFollowContainer>
      <S.FollowNavWrap>
        {FOLLOWTABNAV.map((tab: TTab) => {
          return (
            <S.Content key={tab.id}>
              <S.TabButton
                onClick={() => router.push(`/?follow=${tab.id}`)}
                $isActive={followTab === tab.id}
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
      {followTab === "follower" ? (
        followerList && followerList?.length > 0 ? (
          <ul>
            {followerList?.map((user: any) => {
              return (
                <li key={user.id}>
                  <UserContainer
                    user={user}
                    type={"follow"}
                    isMutualFollow={() => isMutualFollow()}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <S.EmptyMessage>
            <People fill={`${styleColor.WHITE}`} />
            아직 팔로워가 없습니다.
          </S.EmptyMessage>
        )
      ) : followingList && followingList?.length > 0 ? (
        <ul>
          {followingList?.map((user: any) => {
            return (
              <li key={user.id}>
                <UserContainer user={user} type={"follow"} />
              </li>
            );
          })}
        </ul>
      ) : (
        <S.EmptyMessage>
          <People fill={`${styleColor.WHITE}`} />
          아직 팔로잉이 없습니다.
        </S.EmptyMessage>
      )}
    </S.ShowFollowContainer>
  );
};

export default ShowFollowContainer;

const S = {
  ShowFollowContainer: styled.div`
    position: relative;
    left: 0;
    top: 0;
    height: calc(100vh - 272.5px);
    background-color: ${styleColor.GRAY[500]};
  `,
  FollowNavWrap: styled.ul`
    padding: 0px 12px;
    margin-bottom: 14px;
    display: flex;
    justify-content: start;
    border-bottom: solid 1px ${styleColor.BLACK[100]};
  `,
  Content: styled.li``,
  TabButton: styled.button<{ $isActive: boolean }>`
    cursor: pointer;
    padding: 10px 14px;
    border-bottom: ${(props) => (props.$isActive ? "2px solid #111" : "none")};
    h1 {
      ${styleFont.title.tit_xs}
      font-weight: ${(props) => (props.$isActive ? "600" : "400")};
      color: #111;
      span {
        margin-right: 4px;
      }
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
    color: ${styleColor.WHITE};
  `,
};
