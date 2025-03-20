import { updateReview, writeReview } from "@/lib/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useReview = (type?: string, id?: string) => {
  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({ queryKey: ["review"] });
    queryClient.invalidateQueries({ queryKey: ["reviewsBySelectshop", id] });
  };

  const reviewMutate = useMutation({
    mutationFn: type === "write" ? writeReview : updateReview,
    onSuccess: success,
  });

  return { reviewMutate };
};

export default useReview;
