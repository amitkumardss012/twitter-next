export type AuthStateType = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
};

export type authErrorType = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
};

export type postType = {
  id?: number;
  username: string;
  name: string;
  user_id: number;
  contet?: string;
  image?: string;
  comment_Count: number;
  like_count: number;
  user: {
    id: number;
    name: string;
    username: string;
  };
  comments: CommentsType;
  ReplyTo: string;
  post: {
    user: userType
  }
  bookmark_count: number;
  isBookmark: boolean;
  createdAt: string;
  createdAtDate?: string;
  usernameToProfile?: string;
};

export type userType = {
  id: number;
  name: string;
  username: string;
  follower_count: number;
  following_count: number;
  createdAt: string;
};

export type CommentsType = {
  id: number;
  user_id: number;
  post_id: number;
  contet?: string;
  image?: string;
  comment_Count: number;
 createdAt?: string;
  user?: userType;
  post?: {
    user: {
      username: string;
    };
  };
};


export type bookmarkTYpe = {
  post: postType;
}