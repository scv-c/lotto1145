import api from "./index";

export const initUser = async (id) =>
  await api
    .post(`/api/users/init`, { H_U_I_1: id }, { withCredentials: true })
    .then((res) => res.data);

export const getUser = async () =>
  await api.get(`/api/users`).then((res) => res.data);

export const getUserWithMaxSource = async () =>
  await api.get(`/api/users/getMaxScore`).then((res) => res.data);
