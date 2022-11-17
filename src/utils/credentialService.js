import axios from 'axios';

const SERVICE_URL = 'http://127.0.0.1:4000/v1';

export const sendRequest = async (fullUrl, sendAction, actionFunc) => {
  try {
    console.log(`Sending ${sendAction} request to ${fullUrl}`);

    return await actionFunc();
  } catch (err) {
    console.error(`Failed: ${err}`);
    return {};
  }
}

export const updateClientDID = async (credentialId, clientDid, config) => {
  try {
    const fullUrl = `${SERVICE_URL}/credential/${credentialId}`;
    const response = await sendRequest(fullUrl, 'PATCH', () => axios.patch(fullUrl, { did: clientDid }, config));
    return response.data;
  } catch (error) {
    console.log('Credential Update Error:', error);
  }
}
