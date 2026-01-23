import { updateReview, writeReview } from "@/features/reviewEditor/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useReview = (type?: string, id?: string) => {
  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({ queryKey: ["review"] });
    queryClient.invalidateQueries({ queryKey: ["myReview", id] });
    queryClient.invalidateQueries({ queryKey: ["reviewsBySelectshop", id] });
    queryClient.invalidateQueries({ queryKey: ["reviewCountByShop", id] });
  };

  const reviewMutate = useMutation({
    mutationFn: type === "edit" ? updateReview : writeReview,
    onSuccess: success,
  });

  return { reviewMutate };
};

export default useReview;
