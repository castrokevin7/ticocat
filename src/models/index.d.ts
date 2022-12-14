import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum IdentificationType {
  NIE = "NIE",
  DNI = "DNI",
  PASAPORTE = "PASAPORTE"
}

export enum BoardPosition {
  PRESIDENCIA = "PRESIDENCIA",
  VICEPRESIDENCIA = "VICEPRESIDENCIA",
  TESORERIA = "TESORERIA",
  SECRETARIADO = "SECRETARIADO",
  VOCAL = "VOCAL"
}

type EventsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AssociateMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerEvents = {
  readonly id: string;
  readonly event_id?: string | null;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly date?: string | null;
  readonly main_picture?: string | null;
  readonly pictures?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEvents = {
  readonly id: string;
  readonly event_id?: string | null;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly date?: string | null;
  readonly main_picture?: string | null;
  readonly pictures?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Events = LazyLoading extends LazyLoadingDisabled ? EagerEvents : LazyEvents

export declare const Events: (new (init: ModelInit<Events, EventsMetaData>) => Events) & {
  copyOf(source: Events, mutator: (draft: MutableModel<Events, EventsMetaData>) => MutableModel<Events, EventsMetaData> | void): Events;
}

type EagerAssociate = {
  readonly id: string;
  readonly name?: string | null;
  readonly birthday?: string | null;
  readonly address?: string | null;
  readonly email?: string | null;
  readonly inscription_date?: string | null;
  readonly phone?: string | null;
  readonly nationality?: string | null;
  readonly identification?: string | null;
  readonly identification_type?: IdentificationType | keyof typeof IdentificationType | null;
  readonly board_position?: BoardPosition | keyof typeof BoardPosition | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAssociate = {
  readonly id: string;
  readonly name?: string | null;
  readonly birthday?: string | null;
  readonly address?: string | null;
  readonly email?: string | null;
  readonly inscription_date?: string | null;
  readonly phone?: string | null;
  readonly nationality?: string | null;
  readonly identification?: string | null;
  readonly identification_type?: IdentificationType | keyof typeof IdentificationType | null;
  readonly board_position?: BoardPosition | keyof typeof BoardPosition | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Associate = LazyLoading extends LazyLoadingDisabled ? EagerAssociate : LazyAssociate

export declare const Associate: (new (init: ModelInit<Associate, AssociateMetaData>) => Associate) & {
  copyOf(source: Associate, mutator: (draft: MutableModel<Associate, AssociateMetaData>) => MutableModel<Associate, AssociateMetaData> | void): Associate;
}