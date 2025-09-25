import request from '.'
import {
  AvatarProfile,
  DataResponse,
  LoginResponse,
  SearchCriteria,
  UpdatePasswordInfo,
  UpdateUserResponse,
  UserInfo,
  updateUserInfo,
} from '../types/common'

export const API_URL = import.meta.env.VITE_REACT_APP_API_URL
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

export async function login(loginInfo: {payload: string}) {
  const endPoint = '/user/login'
  return await request.post<LoginResponse>(endPoint, loginInfo)
}
export async function getCurrentUser() {
  const endPoint = '/user/info'
  return await request.post<DataResponse>(endPoint, {})
}

export async function getCurrentCompany() {
  const endPoint = '/user/current-company'
  return await request.get<DataResponse>(endPoint, {})
}

export async function getAllowCountries() {
  const endPoint = '/config/get-allow-countries'
  return await request.get<DataResponse>(endPoint, {})
}

export async function getCountryListing() {
  const endPoint = '/config/country-listing'
  return await request.get<DataResponse>(endPoint, {})
}

export async function updateInfoUser(payload: string) {
  const endPoint = `user/edit`
  return await request.post<UpdateUserResponse>(endPoint, { payload })
}

export async function updatePasswordCurrentUser(payload: string) {
  const endPoint = `/user/change-password`
  return await request.post(endPoint, { payload })
}

export async function deleteRoleById(id: number) {
  const endPoint = `/config/role/${id}`
  return await request.delete(endPoint)
}

export async function getUserList(searchCriteria: SearchCriteria) {
  const endPoint = `/user`
  return await request.post(endPoint, searchCriteria)
}

export async function uploadAvatarUser(uploadAvatarUser: AvatarProfile) {
  const endPoint = `user/upload-avatar`
  return await request.post<UpdateUserResponse>(endPoint, uploadAvatarUser)
}

export async function deleteAvatarUser() {
  const endPoint = `user/delete-avatar`
  return await request.post<UpdateUserResponse>(endPoint, {})
}

export async function getAccountantCompanyList() {
  const endPoint = `/user/accountant-companies`
  return await request.get(endPoint)
}