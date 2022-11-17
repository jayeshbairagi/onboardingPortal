const http = require('../utils/http-utils');

export const createRegistry = async (policyDid) => {
  const data = {
    addOnly: false,
    policy: [
      policyDid,
    ],
  };

  return http.sendAndLog(() => http.post('registries/', data));
}

export const revoke = async (registryId, credential) => {
  const url = `registries/${registryId}`;

  const data = {
    action: 'revoke',
    credentialIds: [
      credential.id,
    ],
  };

  return http.sendAndLog(() => http.post(url, data));
}

export const unrevoke = async (registryId, credential) => {
  const url = `registries/${registryId}`;

  const data = {
    action: 'unrevoke',
    credentialIds: [
      credential.id,
    ],
  };

  return http.sendAndLog(() => http.post(url, data));
}
