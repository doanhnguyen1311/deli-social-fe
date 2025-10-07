export const BaseURL = 'http://localhost:8080';

export const AuthAPI = `${BaseURL}/auth`;
export const AccountAPI = `${AuthAPI}/accounts`;
export const LogoutAPI = `${AuthAPI}/logout`;

// Account
export const GetUserByIdAPI = `${BaseURL}/accounts`

// Info
export const GetInfoAPI = `${AuthAPI}/my-info`;

// Graph
export const GraphAPI = `${AuthAPI}/graph`;

// Feeds
export const GetNewFeedsApi = `${BaseURL}/post/feeds`;