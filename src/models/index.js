// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const BoardPosition = {
  "PRESIDENCIA": "PRESIDENCIA",
  "VICEPRECIDENCIA": "VICEPRECIDENCIA",
  "TESORERIA": "TESORERIA",
  "SECRETARIADO": "SECRETARIADO",
  "VOCAL": "VOCAL"
};

const { Associate } = initSchema(schema);

export {
  Associate,
  BoardPosition
};