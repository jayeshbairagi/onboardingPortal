import * as http from '../utils/http-utils';

const testSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Dock Schema Example',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    alumniOf: {
      type: 'string',
    },
    degree: {
      type: 'string',
    },
  },
  required: ['alumniOf'],
  additionalProperties: false,
};

export const createSchema = async (did) => {
  const data = testSchema;

  // Sign author property with DID hex value
  data.author = did;
  return http.sendAndLog(() => http.post('schemas/', data));
}

export const getSchema = async (hexId) => {
  return http.sendAndLog(() => http.get(`schemas/${hexId}`));
}

export const listSchemas = async () => {
  return http.sendAndLog(() => http.get('schemas/'));
}
