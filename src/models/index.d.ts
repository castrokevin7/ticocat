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

type FAQMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BenefitMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EventMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AssociateMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerFAQ = {
  readonly id: string;
  readonly question: string;
  readonly question_cat: string;
  readonly answer: string;
  readonly answer_cat: string;
  readonly links?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFAQ = {
  readonly id: string;
  readonly question: string;
  readonly question_cat: string;
  readonly answer: string;
  readonly answer_cat: string;
  readonly links?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FAQ = LazyLoading extends LazyLoadingDisabled ? EagerFAQ : LazyFAQ

export declare const FAQ: (new (init: ModelInit<FAQ, FAQMetaData>) => FAQ) & {
  copyOf(source: FAQ, mutator: (draft: MutableModel<FAQ, FAQMetaData>) => MutableModel<FAQ, FAQMetaData> | void): FAQ;
}

type EagerBenefit = {
  readonly id: string;
  readonly benefit_id?: string | null;
  readonly title?: string | null;
  readonly title_cat?: string | null;
  readonly description?: string | null;
  readonly description_cat?: string | null;
  readonly about_provider?: string | null;
  readonly about_provider_cat?: string | null;
  readonly image?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly instagramUrl?: string | null;
  readonly facebookUrl?: string | null;
  readonly websiteUrl?: string | null;
  readonly associate_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBenefit = {
  readonly id: string;
  readonly benefit_id?: string | null;
  readonly title?: string | null;
  readonly title_cat?: string | null;
  readonly description?: string | null;
  readonly description_cat?: string | null;
  readonly about_provider?: string | null;
  readonly about_provider_cat?: string | null;
  readonly image?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly instagramUrl?: string | null;
  readonly facebookUrl?: string | null;
  readonly websiteUrl?: string | null;
  readonly associate_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Benefit = LazyLoading extends LazyLoadingDisabled ? EagerBenefit : LazyBenefit

export declare const Benefit: (new (init: ModelInit<Benefit, BenefitMetaData>) => Benefit) & {
  copyOf(source: Benefit, mutator: (draft: MutableModel<Benefit, BenefitMetaData>) => MutableModel<Benefit, BenefitMetaData> | void): Benefit;
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
  readonly custom_name?: string | null;
  readonly address?: string | null;
  readonly email?: string | null;
  readonly inscription_date?: string | null;
  readonly birthday?: string | null;
  readonly nationality?: string | null;
  readonly identification?: string | null;
  readonly identification_type?: IdentificationType | keyof typeof IdentificationType | null;
  readonly board_position?: BoardPosition | keyof typeof BoardPosition | null;
  readonly associate_id?: string | null;
  readonly bio?: string | null;
  readonly profile_picture?: string | null;
  readonly is_account_activated?: boolean | null;
  readonly is_public_profile?: boolean | null;
  readonly username?: string | null;
  readonly share_email?: boolean | null;
  readonly share_phone?: boolean | null;
  readonly instagram_username?: string | null;
  readonly facebook_username?: string | null;
  readonly linkedin_username?: string | null;
  readonly phone?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAssociate = {
  readonly id: string;
  readonly name?: string | null;
  readonly custom_name?: string | null;
  readonly address?: string | null;
  readonly email?: string | null;
  readonly inscription_date?: string | null;
  readonly birthday?: string | null;
  readonly nationality?: string | null;
  readonly identification?: string | null;
  readonly identification_type?: IdentificationType | keyof typeof IdentificationType | null;
  readonly board_position?: BoardPosition | keyof typeof BoardPosition | null;
  readonly associate_id?: string | null;
  readonly bio?: string | null;
  readonly profile_picture?: string | null;
  readonly is_account_activated?: boolean | null;
  readonly is_public_profile?: boolean | null;
  readonly username?: string | null;
  readonly share_email?: boolean | null;
  readonly share_phone?: boolean | null;
  readonly instagram_username?: string | null;
  readonly facebook_username?: string | null;
  readonly linkedin_username?: string | null;
  readonly phone?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Associate = LazyLoading extends LazyLoadingDisabled ? EagerAssociate : LazyAssociate

export declare const Associate: (new (init: ModelInit<Associate, AssociateMetaData>) => Associate) & {
  copyOf(source: Associate, mutator: (draft: MutableModel<Associate, AssociateMetaData>) => MutableModel<Associate, AssociateMetaData> | void): Associate;
}