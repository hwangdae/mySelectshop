import { NewReviewType } from "@/types/reviewType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useReviewMutate = (type?: string) => {
  const queryClient = useQueryClient();
  const writeReview = async (review: NewReviewType) => {
    return await axios.post("/api/review", review);
  };
  const updateReview = async (review: NewReviewType) => {
    return await axios.patch("/api/review", review);
  };
  const success = () => {
    queryClient.invalidateQueries({ queryKey: ["review"] });
  };

  const reviewMutate = useMutation({
    mutationFn: type === "edit" ? updateReview : writeReview,
    onSuccess: success,
  });

  return { reviewMutate };
};

export default useReviewMutate;
