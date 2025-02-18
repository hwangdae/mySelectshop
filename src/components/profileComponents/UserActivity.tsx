import { showFollowListStore } from "@/globalState/zustand";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { FollowType } from "@/types/followType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface PropsType {
  userId: string | undefined;
}

const UserActivity = ({ userId }: PropsType) => {
  const [followList, setFollowList] = useState([]);
  const { showFollowListToggle, setShowFollowListToggle } =
    showFollowListStore();
  const router = useRouter();

  const { data: followerCount } = useQuery({
    queryKey: ["followerList", userId],
    queryFn: async () => {
      const res = await axios.get(
        `/api/follow/followCount?followerId=${userId}`
      );
      return res.data;
    },
  });

  const { data: followingCount } = useQuery({
    queryKey: ["followingList", userId],
    queryFn: async () => {
      const res = await axios.get(
        `/api/follow/followCount?followingId=${userId}`
      );
      return res.data;
    },
  });

  const { data: reviewCount } = useQuery({
    queryKey: ["reviewCount"],
    queryFn: async () => {
      const res = await axios.get(`/api/review/reviewCount?userId=${userId}`);
      return res.data;
    },
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
          <p>{followerCount?.length || 0}</p>
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
          <p>{followingCount?.length || 0}</p>
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
      cursor: pointer;
      text-align: start;
    }
    h3 {
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
    p {
      ${styleFont.text.txt_sm}
      color: ${styleColor.GRAY[600]};
    }
  `,
};
