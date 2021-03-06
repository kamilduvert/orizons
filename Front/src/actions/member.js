import {
  CHANGE_REGISTER_FIELD, REGISTER, REGISTER_SUCCESS, REGISTER_FAIL,
  SET_LOADER_REGISTER, GET_MEMBER, GET_MEMBER_SUCCESS, GET_MEMBER_FAIL,
  UPDATE_MEMBER, UPDATE_MEMBER_SUCCESS, UPDATE_MEMBER_FAIL,
  UPDATE_PROFILE_PHOTO_SUCCESS,
  UPDATE_PROFILE_PHOTO, DELETE_MEMBER, DELETE_MEMBER_SUCCESS,
} from './types';

export const changeRegisterField = (name, value) => ({
  type: CHANGE_REGISTER_FIELD,
  name,
  value,
});

export const activateLoader = () => ({
  type: SET_LOADER_REGISTER,
});

// ======= CREATE MEMBER =======================
export const register = () => ({
  type: REGISTER,
});

export const registerSuccess = (message) => ({
  type: REGISTER_SUCCESS,
  message,
});

export const registerFail = (message) => ({
  type: REGISTER_FAIL,
  message,
});

// ======= READ MEMBER =======================
export const getMember = () => ({
  type: GET_MEMBER,
});

export const getMemberSuccess = (member) => ({
  type: GET_MEMBER_SUCCESS,
  member,
});

export const getMemberFail = (message) => ({
  type: GET_MEMBER_FAIL,
  message,
});

// ======= UPDATE MEMBER =======================
export const updateMember = (data) => ({
  type: UPDATE_MEMBER,
  data,
});

export const updateMemberSuccess = (member) => ({
  type: UPDATE_MEMBER_SUCCESS,
  member,
});

export const updateMemberFail = (message) => ({
  type: UPDATE_MEMBER_FAIL,
  message,
});

export const updateMemberProfilePhoto = (url) => ({
  type: UPDATE_PROFILE_PHOTO,
  url,
});

export const updateMemberProfilePhotoSuccess = (url) => ({
  type: UPDATE_PROFILE_PHOTO_SUCCESS,
  url,
});

// ======= DELETE MEMBER =======================
export const deleteMember = () => ({
  type: DELETE_MEMBER,
});

export const deleteMemberSuccess = () => ({
  type: DELETE_MEMBER_SUCCESS,
});
