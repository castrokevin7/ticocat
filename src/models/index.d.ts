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

type EventMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AssociateMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerEvent = {
  readonly id: string;
  readonly event_id?: string | null;
  readonly title?: string | null;
  readonly title_cat?: string | null;
  readonly image?: string | null;
  readonly gallery?: (string | null)[] | null;
  readonly date?: string | null;
  readonly contact?: string | null;
  readonly location_url?: string | null;
  readonly description?: string | null;
  readonly description_cat?: string | null;
  readonly time?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEvent = {
  readonly id: string;
  readonly event_id?: string | null;
  readonly title?: string | null;
  readonly title_cat?: string | null;
  readonly image?: string | null;
  readonly gallery?: (string | null)[] | null;
  readonly date?: string | null;
  readonly contact?: string | null;
  readonly location_url?: string | null;
  readonly description?: string | null;
  readonly description_cat?: string | null;
  readonly time?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event, EventMetaData>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event, EventMetaData>) => MutableModel<Event, EventMetaData> | void): Event;
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