// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const BenefitCategory = {
  "OCIO": "OCIO",
  "TURISMO": "TURISMO",
  "SALUD": "SALUD",
  "EDUCACION": "EDUCACION"
};

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
  BenefitCategory,
  IdentificationType,
  BoardPosition
};