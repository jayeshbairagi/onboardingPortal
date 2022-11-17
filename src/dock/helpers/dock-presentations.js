const http = require('../utils/http-utils');

export const createPresentation = async (presentation) => {
  return http.sendAndLog(() => http.post('presentations/', presentation));
}

export const verifyPresentation = async (presentation) => {
  return http.sendAndLog(() => http.post('verify/', presentation));
}
