import { toggleFollow } from "@/lib/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useFollowMutate = (id: string, userId: string | undefined) => {
  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({ queryKey: ["followList", userId] });
    queryClient.invalidateQueries({ queryKey: ["followCount", userId] });
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
