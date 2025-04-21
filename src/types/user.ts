import { TReview } from "./review";
import { TMessage } from "./chat";

export interface TUser {
  id: string;
  created_at: string;
  email: string;
  name: string;
  image: string;
  filteredReviewCount?: number;
  reviews?: TReview[];
}

export interface TUserWithChat extends TUser {
  conversations: TConversation[];
}

export interface TConversation {
  id: string;
  messages: TMessage[];
  users: TUser[];
}

export interface TProfile {
  id: string | undefined;
  name: string;
  image: string;
}
