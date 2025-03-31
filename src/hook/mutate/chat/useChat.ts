import { getChat, postChat } from "@/lib/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useChatMutate = () => {
  const queryClient = useQueryClient();

  const success = () => {
    queryClient.invalidateQueries({ queryKey: ["chat"] });
  };

  const chatMutate = useMutation({
    mutationFn: postChat,
    onSuccess: success,
  });
  return { chatMutate };
};

export default useChatMutate;
