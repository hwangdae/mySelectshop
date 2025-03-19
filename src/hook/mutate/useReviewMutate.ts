import { updateReview, writeReview } from "@/lib/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useReviewMutate = (type?: string) => {
  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({ queryKey: ["review"] });
  };

  const reviewMutate = useMutation({
    mutationFn: type === "write" ? writeReview : updateReview,
    onSuccess: success,
  });

  return { reviewMutate };
};

export default useReviewMutate;
