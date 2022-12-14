// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const IdentificationType = {
  "NIE": "NIE",
  "DNI": "DNI",
  "PASAPORTE": "PASAPORTE"
};

const BoardPosition = {
  "PRESIDENCIA": "PRESIDENCIA",
  "VICEPRESIDENCIA": "VICEPRESIDENCIA",
  "TESORERIA": "TESORERIA",
  "SECRETARIADO": "SECRETARIADO",
  "VOCAL": "VOCAL"
};

const { Events, Associate } = initSchema(schema);

export {
  Events,
  Associate,
  IdentificationType,
  BoardPosition
};