import axios from "axios";
import { BaseURL } from "../../api";

/**
 * Lấy URL ảnh đại diện thực tế của user thông qua API presign-view.
 * @param avatarId - ID hoặc path của ảnh đại diện (thường là user.profile.avatarUrl)
 * @returns URL ảnh đầy đủ (viewUrl) hoặc null nếu lỗi
 */
export async function getUserAvatar(avatarId?: string): Promise<string | null> {
  if (!avatarId) return null;

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in localStorage");
    return null;
  }

  try {
    const response = await axios.get(`${BaseURL}/media/presign-view`, {
      params: { mediaId: avatarId },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data?.data?.viewUrl || null;
  } catch (error) {
    console.error("Error fetching user avatar:", error);
    return null;
  }
}
