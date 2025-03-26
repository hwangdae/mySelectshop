import { showFollowListStore } from "@/globalState";
import { getFollowerCount, getFollowingCount } from "@/lib/follow";
import { getReviewCount } from "@/lib/review";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

interface PropsType {
  userId: string | undefined;
}

const UserActivity = ({ userId }: PropsType) => {
  const { showFollowListToggle, setShowFollowListToggle } =
    showFollowListStore();
  const router = useRouter();

  const { data: followerCount } = useQuery({
    queryKey: ["followerCount", userId],
    queryFn: () => getFollowerCount(userId),
  });

  const { data: followingCount } = useQuery({
    queryKey: ["followingCount", userId],
    queryFn: () => getFollowingCount(userId),
  });

  const { data: reviewCount } = useQuery({
    queryKey: ["reviewCount", userId],
    queryFn: () => getReviewCount(userId),
    enabled: !!userId,
  });

  return (
    <S.UserActivity>
      <S.Activity>
        <h3>리뷰수</h3>
        <p>{reviewCount}</p>
      </S.Activity>
      <S.Activity>
        <button
          onClick={async () => {
            setShowFollowListToggle(!showFollowListToggle);
            router.push(`/?follow=follower`);
          }}
        >
          <h3>팔로워</h3>
          <p>{followerCount || 0}</p>
        </button>
      </S.Activity>
      <S.Activity>
        <button
          onClick={() => {
            setShowFollowListToggle(!showFollowListToggle);
            router.push(`/?follow=following`);
          }}
        >
          <h3>팔로잉</h3>
          <p>{followingCount || 0}</p>
        </button>
      </S.Activity>
    </S.UserActivity>
  );
};

export default UserActivity;

const S = {
  UserActivity: styled.ul`
    display: flex;
    justify-content: space-between;
    :first-child {
      padding-left: 0px;
    }
    :last-child {
      border-right: none;
    }
  `,
  Activity: styled.li`
    width: 33.3%;
    border-right: solid 1px #eee;
    padding-left: 10px;
    button {
      all: unset;
      cursor: pointer;
      text-align: start;
    }
    h3 {
      display: block;
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
    p {
      display: block;
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
  `,
};
