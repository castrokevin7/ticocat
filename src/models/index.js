// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Interests = {
  "HIKING": "HIKING",
  "FOODIE": "FOODIE",
  "TRAVEL": "TRAVEL",
  "CINEMA": "CINEMA",
  "MUSIC": "MUSIC",
  "BOARD_GAMES": "BOARD_GAMES",
  "LITERATURE": "LITERATURE",
  "DANCE": "DANCE",
  "SPORTS": "SPORTS",
  "KARAOKE": "KARAOKE",
  "FINANCE": "FINANCE",
  "SCIENCE": "SCIENCE",
  "CATALONIA": "CATALONIA",
  "ART": "ART",
  "NATURE": "NATURE"
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

const { FAQ, Benefit, Event, Associate } = initSchema(schema);

export {
  FAQ,
  Benefit,
  Event,
  Associate,
  Interests,
  IdentificationType,
  BoardPosition
};