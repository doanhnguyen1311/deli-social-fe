import { AuthAPI, GetInfoAPI, BaseURL } from "./index"; // URL base API
import { GetNewFeedsApi } from "./index";

export interface LoginResponse {
    data: {
        token: string;
        authentication: boolean;
    };
    message: string;
    statusCode: number;
    success: boolean;
}

export interface UserInfo {
    id: string;
    username: string;
    email: string;
    phoneNumber: string | null;
    lastSeen: string | null;
    createdAt: string | null;
    lastLoginAt: string | null;
    status: string;
    profile: {
        fullName: string;
        avatarUrl: string;
        coverPhotoUrl: string;
        bio: string;
        gender: string;
        birthday: string | null;
        location: string;
        website: string;
    };
    provider: {
        provider: string;
        providerId: string;
    };
    province: {
        code: string;
        id: number;
        name: string;
    };
    settings: {
        theme: string;
        language: string;
        soundOn: boolean;
        notificationsEnabled: boolean;
    };
    online: boolean;
}

export interface GetMyInfoResponse {
    data: UserInfo;
    message: string;
    statusCode: number;
    success: boolean;
}

export interface Media {
    mediaId: string;
    type: string;
    url: string;
}

export interface Post{
    id: number;
    userId: string;
    content: string;
    mediaList: Media[];
    likeCount: number;
    commentCount: number;
    visibility: string;
    createdAt: string;
    updatedAt: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
}

export interface PostResponse {
    content: Post[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface MediaItem {
    mediaId: string;
    type: 'IMAGE' | 'VIDEO' | 'AUDIO' | string;
}

export interface FeedItem {
    id: number;
    userId: string;
    content: string;
    mediaList: Media[];
    likeCount: number;
    commentCount: number;
    visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS' | string;
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
    userProfile: UserInfo | null;
}

export interface FeedResponse {
    message: string;
    statusCode: number;
    data: FeedItem[];
    success: boolean;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${AuthAPI}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: email,
            password: password,
        }),
        credentials: "include" // Quan trọng nếu server lưu token vào cookie
    });

    const data: LoginResponse = await response.json();

    if (!response.ok || !data.success || !data.data.authentication) {
        throw new Error(data.message || "Login failed");
    }

    // Lưu token vào localStorage
    const token = data.data.token;
    localStorage.setItem("token", token);

    return data;
};

export const getMyInfo = async (): Promise<GetMyInfoResponse> => {
    const token = localStorage.getItem("token");
    const response = await fetch(GetInfoAPI, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "include" // gửi cookie/session kèm request
    });

    const data: GetMyInfoResponse = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch user info");
    }

    return data;
};

export async function getAllPostByUserId(
    userId: string,
    page: number = 0,
    size: number = 2
): Promise<PostResponse> {
    const token = localStorage.getItem("token");
    const url = `${BaseURL}/post/user/${userId}?page=${page}&size=${size}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error ${response.status}: ${errorText}`);
        }

        const data: PostResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};

export async function getNewFeeds(): Promise<FeedResponse> {
    const token = localStorage.getItem("token");
    const url = GetNewFeedsApi;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error ${response.status}: ${errorText}`);
        }

        const data: FeedResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};
