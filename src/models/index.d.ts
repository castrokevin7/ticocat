import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export enum BoardPosition {
  PRESIDENCIA = "PRESIDENCIA",
  VICEPRESIDENCIA = "VICEPRESIDENCIA",
  TESORERIA = "TESORERIA",
  SECRETARIADO = "SECRETARIADO",
  VOCAL = "VOCAL"
}

type AssociateMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Associate {
  readonly id: string;
  readonly name?: string | null;
  readonly birthday?: string | null;
  readonly address?: string | null;
  readonly email?: string | null;
  readonly inscription_date?: string | null;
  readonly phone?: string | null;
  readonly nationality?: string | null;
  readonly identification?: string | null;
  readonly identification_type?: string | null;
  readonly board_position?: BoardPosition | keyof typeof BoardPosition | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Associate, AssociateMetaData>);
  static copyOf(source: Associate, mutator: (draft: MutableModel<Associate, AssociateMetaData>) => MutableModel<Associate, AssociateMetaData> | void): Associate;
}