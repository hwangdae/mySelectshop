import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "@/lib/review";

const useDeleteReview = (id: string, userId: string | undefined) => {
  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({ queryKey: ["review"] });
    queryClient.invalidateQueries({ queryKey: ["reviewsBySelectshop",id] });
  };
  const deleteReviewMutate = useMutation({
    mutationFn: ()=>deleteReview(id,userId),
    onSuccess: success,
  });
  return { deleteReviewMutate };
};

export default useDeleteReview;
