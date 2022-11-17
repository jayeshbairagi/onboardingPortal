// import 'dotenv/config';
import axios from 'axios';

// const API_URL = process.env.API_URL;
// const API_KEY = process.env.process.env.API_KEY;
const baseUrl = 'https://api-testnet.dock.io';
const API_KEY = "eyJzY29wZXMiOlsidGVzdCIsImFsbCJdLCJzdWIiOiI1MTg3IiwiaWF0IjoxNjY1MzkyMDY3LCJleHAiOjQ3NDQ2ODgwNjd9.aal4f1oU8LjDgwOIw3gka4_M1EVp8W6Td2glTsTyWj9BNq44TwL26CM5OOjikRalqfDa5QfIwsYHNrKip7FZ1Q"
console.log('baseUrl::::::', baseUrl);
console.log(' process.env.API_KEY::::::', API_KEY);
const axiosHeaders = {
  headers: {
    'DOCK-API-TOKEN': API_KEY,
    'Content-Type': 'application/json',
  },
};

export const sendAndLog = async (asyncFunc) => {
  const result = await asyncFunc();
  console.log(`Response: ${JSON.stringify(result.data)}`);

  return result.data;
}

export const sendRequest = async (fullUrl, sendAction, actionFunc) => {
  try {
    console.log(`Sending ${sendAction} request to ${fullUrl}`);

    return await actionFunc();
  } catch (err) {
    console.error(`Failed: ${err}`);
    return {};
  }
}

export const post = async (relativeUrl, data) => {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  return sendRequest(fullUrl, 'POST', () => axios.post(fullUrl, data, axiosHeaders));
}

export const patch = async (relativeUrl, data) => {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  return sendRequest(fullUrl, 'PATCH', () => axios.patch(fullUrl, data, axiosHeaders));
}

export const callDelete = async (relativeUrl) => {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  return sendRequest(fullUrl, 'DELETE', () => axios.delete(fullUrl, axiosHeaders));
}

export const get = async (relativeUrl) => {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  return sendRequest(fullUrl, 'GET', () => axios.get(fullUrl, axiosHeaders));
}
