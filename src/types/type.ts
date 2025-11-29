export interface UserProfile {
  _id?: string;
  fullName?: string;
  username?: string;
  profileImage?: string;
  createdAt?: string;
  location?: string;
  followersCount?: number;
  followingCount?: number;
  //   gender?: string;
  email?: string;
  password?: string;
  role?: string;
  bio?: string;
  City?: string;
  Country?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  username?: string;
  fullName?: string;
  profileImage?: string;
}

export interface getProfileData {
  _id: string;
  email: string;
  fullName: string;
  username: string;
  profileImage?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface suggestUser {
  fullName: string;
  profileImage: string;
  username: string;
  _id: string;
}

export interface suggestedUserData {
  _id: string;
  follower: string; // User ID of the follower
  following: suggestUser; // Full user object of the person being followed
}

export interface createStoryData {
  user: string;
  imageUrl: string;
  caption: string;
  viewers: [];
  _id: string;
  createdAt: string;
  updatedAt?: string;
}
export interface createPostData {
  _id: string;
  imageUrl: string;
  caption: string;
  author: {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    profileImage?: string;
  };
  likes: [];
  comments: [];
  mediaType?: "image" | "video";
  createdAt: string;
}

export interface createpost {
  imageUrl?: string;
  caption?: string;
  mediaType?: "image" | "video";
}

export interface getPost {
  _id: string;
  imageUrl: string;
  caption: string;
  thumbnails?: string;
  mediaType?: "image" | "video"; // ADD THIS
  author: {
    _id: string;
    username: string;
    email: string;
    profileImage?: string;
  };
  likes: string[];
  comments: Array<{
    user: string;
    text: string;
    createdAt: Date;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface otherUsers {
  email: string;
  fullName: string;
  profileImage: string;
  username: string;
  _id: string;
}

export interface Message {
  _id?: string;
  senderId?: string;
  receiverId?: string;
  message?: string;
  createdAt?: string;
}

// export interface GetMessagesResponse {
//   _id: string;
//   participants: string[];
//   messages: Message[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

export interface FollowerUser {
  _id: string;
  username: string;
  fullName: string;
  profileImage: string;
}

export interface Follow {
  email: string;
  followedAt: string;
  fullName: string;
  profileImage: string;
  username: string;
  _id: string;
}

export interface FollowStatus {
  isFollowing: boolean;
}

export interface FollowCounts {
  followersCount: number;
  followingCount: number;
}

export interface UpdateProfileData {
  fullName?: string;
  username?: string;
  bio?: string;
  profileImage?: string;
  City?: string;
  Country?: string;
}

export interface StoryUser {
  _id: string;
  fullName: string;
  username: string;
  profileImage: string;
}

export interface Story {
  _id: string;
  user: StoryUser;
  imageUrl: string;
  caption: string;
  viewers: string[];
  createdAt: string;
}

export interface StoryCircleProps {
  username: string;
  avatar: string;
  hasNewStory?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export interface author {
  _id: string;
  fullName: string;
  username: string;
  profileImage: string;
  City?: string;
  Country?: string;
}

export interface getAllFollowerPost {
  _id: string;
  imageUrl: string;
  caption: string;
  author: author;
  mediaType: "image" | "video";
  likes: any[];
  comments: any[];
  createdAt: string;
  updatedAt: string;
}

export interface ReelPagination {
  nextCursor: string | null;
  firstPostId: string | null;
  hasMore: boolean;
  limit: number;
}
