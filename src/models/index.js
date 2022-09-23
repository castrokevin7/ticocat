// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const BoardPosition = {
  "PRESIDENCIA": "PRESIDENCIA",
  "VICEPRESIDENCIA": "VICEPRESIDENCIA",
  "TESORERIA": "TESORERIA",
  "SECRETARIADO": "SECRETARIADO",
  "VOCAL": "VOCAL"
};

const { Associate } = initSchema(schema);

export {
  Associate,
  BoardPosition
};