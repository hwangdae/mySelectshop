import axios from "axios";

export const getFollowers = async (userId: string | undefined) => {
  const res = await axios.get(`/api/follow/followers?followerId=${userId}`);
  return res.data;
};

export const getFollowing = async (userId: string | undefined) => {
  const res = await axios.get(`/api/follow/following?followingId=${userId}`);
  return res.data;
};

export const getFollowerCount = async (userId: string | undefined) => {
  const res = await axios.get(`/api/follow/followCount?followerId=${userId}`);
  return res.data;
};

export const getFollowingCount = async (userId: string | undefined) => {
  const res = await axios.get(`/api/follow/followCount?followingId=${userId}`);
  return res.data;
};

export const toggleFollow = async (id: string) => {
  return await axios.post("/api/follow", { id });
};

export const isUserFollowing = async (
  id: string,
  userId: string | undefined
) => {
  const res = await axios.get(
    `/api/follow/isFollowing?followerId=${id}&followingId=${userId}`
  );
  return res.data;
};
