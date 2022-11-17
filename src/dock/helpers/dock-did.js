import * as  http from '../utils/http-utils';

export const createDID = async (data) => {
  return http.sendAndLog(() => http.post('dids/', data));
}

export const exportDID = async (did, data) => {
  return http.sendAndLog(() => http.post(`dids/${did}/export`, data));
}

export const getDID = async (id) => {
  return http.sendAndLog(() => http.get(`dids/${id}`));
}

export const listDIDs = async () => {
  return http.sendAndLog(() => http.get('dids'));
}

export const updateDID = async (did, body) => {
  return http.sendAndLog(() => http.patch(`dids/${did}`, body));
}

export const deleteDID = async (did) => {
  return http.sendAndLog(() => http.callDelete(`dids/${did}`));
}
