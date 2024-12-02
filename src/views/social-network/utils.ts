import { Interests } from "../../models";

const interestsTranslationKeys = {
    [Interests.HIKING]: "interest_label_hiking",
    [Interests.FOODIE]: "interest_label_foodie",
    [Interests.TRAVEL]: "interest_label_travel",
    [Interests.CINEMA]: "interest_label_cinema",
    [Interests.MUSIC]: "interest_label_music",
    [Interests.BOARD_GAMES]: "interest_label_board_games",
    [Interests.LITERATURE]: "interest_label_literature",
    [Interests.DANCE]: "interest_label_dance",
    [Interests.SPORTS]: "interest_label_sports",
    [Interests.KARAOKE]: "interest_label_karaoke",
    [Interests.FINANCE]: "interest_label_finance",
    [Interests.SCIENCE]: "interest_label_science",
    [Interests.CATALONIA]: "interest_label_catalonia",
    [Interests.ART]: "interest_label_art",
    [Interests.NATURE]: "interest_label_nature"
}

export const getInterestTranslationKey = (interest: Interests) => {
    return interestsTranslationKeys[interest] || interest.toString();
};
