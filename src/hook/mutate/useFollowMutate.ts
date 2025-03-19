import { toggleFollow } from "@/lib/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useFollowMutate = (id: string, userId: string | undefined) => {
  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({ queryKey: ["followerList", id] });
    queryClient.invalidateQueries({ queryKey: ["followingList", id] });
    queryClient.invalidateQueries({
      queryKey: ["isFollowing", id, userId],
    });
    queryClient.invalidateQueries({
      queryKey: ["followerCount", id, userId],
    });
  };
  const followMutate = useMutation({
    mutationFn: toggleFollow,
    onSuccess: success,
  });
  return { followMutate };
};

export default useFollowMutate;
