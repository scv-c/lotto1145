import api from './index';

export const getNewLotto = async () => await api.get(`/api/user-lotto/create`).then(res => res.data);
export const getUserLottoList = async () => await api.get(`/api/user-lotto/user/mylist`).then(res => res.data);
