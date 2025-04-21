import Follow from "@/components/follow/Follow";
import React from "react";

interface PropsType {
  followTypeParams: "follower" | "following";
}

const FollowPage = ({ followTypeParams }: PropsType) => {
  return <Follow followTypeParams={followTypeParams} />;
};

export default FollowPage;
