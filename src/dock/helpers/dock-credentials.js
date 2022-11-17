import axios from 'axios';
import * as http from '../utils/http-utils';

export const createCredential = async (credential, password) => {
  const wrapped = { credential, password, persist: true };
  return http.sendAndLog(() => http.post('credentials/', wrapped));
}

export const verifyCredential = async (credential) => {
  return http.sendAndLog(() => http.post('verify/', credential));
}

export const getCredentialQR = async(id) => {
  return await axios.get(id);
}
