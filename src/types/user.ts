import { Message, Review, User } from "@prisma/client";

export interface TUser {
  id: string;
  created_at: string;
  email: string;
  name: string;
  image: string;
  filteredReviewCount?: number;
  reviews?: Review[];
}

export interface TUserWithChat extends TUser {
  conversations: TConversation[];
}

export interface TConversation {
  id: string;
  messages: Message[];
  users: User[];
}

export interface TProfile {
  id:string | undefined;
  name:string;
  image:string
}
