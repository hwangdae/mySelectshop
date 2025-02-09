import { showFollowListStore } from "@/globalState/zustand";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { FollowType } from "@/types/followType";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface PropsType {
  loginUser: string | undefined;
  userId: string | undefined;
}

const UserActivity = ({ loginUser, userId }: PropsType) => {
  const [followList,setFollowList] = useState([])
  const {showFollowListToggle,setShowFollowListToggle} = showFollowListStore()
  const router = useRouter();
  console.log()
  // const { data: followList } = useQuery({
  //   queryKey: ["follow"],
  //   queryFn: () => getAllFollowList(),
  // });

  // const { data: reviewCount } = useQuery({
  //   queryKey: ["review", loginUser],
  //   queryFn: () => getReviewCount(loginUser),
  // });

  const followerCount = followList?.filter((v: FollowType) => {
    return v.following_id === userId;
  }).length;

  const followingCount = followList?.filter((v: FollowType) => {
    return v.follower_id === userId;
  }).length;

  return (
    <S.UserActivity>
      <S.Activity>
        <h3>리뷰수</h3>
        {/* <p>{reviewCount}</p> */}
      </S.Activity>
      <S.Activity>
        <button
          onClick={async() => {
            setShowFollowListToggle(!showFollowListToggle);
            const res = await axios.get("/api/follow")
            setFollowList(res.data)
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
