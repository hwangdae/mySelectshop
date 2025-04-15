export interface TNewChat {
  text: string;
  image: string | null | undefined;
  receiverId: string;
  senderId: string;
}

export interface TMessage {
  id: string;
  image: string | null;
  createAt: Date;
  updateAt: Date;
  text: string | null;
  senderId: string;
  receiverId: string;
  conversationId: string;
}
