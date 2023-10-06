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

const { Benefit, Event, Associate } = initSchema(schema);

export {
  Benefit,
  Event,
  Associate,
  IdentificationType,
  BoardPosition
};