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
  loginUser: string | undefined;
  userId: string | undefined;
}

const UserActivity = ({ loginUser, userId }: PropsType) => {
  const [followList, setFollowList] = useState([]);
  const { showFollowListToggle, setShowFollowListToggle } =
    showFollowListStore();
  const router = useRouter();
  console.log(userId,"유저아이디")
  const { data: followerCount } = useQuery({
    queryKey: ["followerCount",userId],
    queryFn: async () => {
      const res = await axios.get(
        `/api/follow/followCount?followerId=${userId}`
      );
      return res.data;
    },
  });

  const {data: followingCount } = useQuery({
    queryKey: ["followingCount",userId],
    queryFn: async () => {
      const res = await axios.get(
        `/api/follow/followCount?followingId=${userId}`
      );
      return res.data;
    },
  });
  console.log(followerCount, "팔로워 카운트");
  console.log(followingCount, "팔로워 카운트");
  
  return (
    <S.UserActivity>
      <S.Activity>
        <h3>리뷰수</h3>
        {/* <p>{reviewCount}</p> */}
      </S.Activity>
      <S.Activity>
        <button
          onClick={async () => {
            setShowFollowListToggle(!showFollowListToggle);
            const res = await axios.get("/api/follow");
            setFollowList(res.data);
            router.push(`/?follow=follower`);
          }}
        >
          <h3>팔로워</h3>
          <p>{followerCount}</p>
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
          <p>{followingCount}</p>
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
