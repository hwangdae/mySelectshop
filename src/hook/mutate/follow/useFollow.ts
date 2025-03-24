import { toggleFollow } from "@/lib/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useFollowMutate = (id: string, userId: string | undefined) => {
  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({ queryKey: ["followerList", userId] });
    queryClient.invalidateQueries({ queryKey: ["followingList", userId] });
    queryClient.invalidateQueries({ queryKey: ["followerCount", userId] });
    queryClient.invalidateQueries({ queryKey: ["followingCount", userId] });
    queryClient.invalidateQueries({
      queryKey: ["isFollowing", id, userId],
    });
  };
  const followMutate = useMutation({
    mutationFn: toggleFollow,
    onSuccess: success,
  });
  return { followMutate };
};

export default useFollowMutate;
