import Translations from './Translations.json';

type Language = 'es' | 'cat';

interface TranslationEntry {
    es: string;
    cat: string;
}

interface TranslationsData {
    [key: string]: TranslationEntry;
}

declare global {
    interface String {
        format(...args: (string | number)[]): string;
    }
}

String.prototype.format = function (...args: (string | number)[]): string {
    return this.replace(/{([0-9]+)}/g, function (match: string, index: string) {
        const idx = parseInt(index, 10);
        return typeof args[idx] === 'undefined' ? match : String(args[idx]);
    });
};

export const getLang = (): Language => {
    const path = window.location.pathname;
    let parts = path.split("/");
    if (parts.length > 0 && parts[0] === "") {
        parts = parts.slice(1);
    }
    const lang = parts[0];
    return lang === "es" || lang === "cat" ? lang : "es";
};

export default class Translator {
    private data: TranslationsData;

    constructor() {
        this.data = Translations as TranslationsData;
    }

    static instance: Translator = new Translator();

    translate(key: string): string {
        const lang = getLang();
        if (key in this.data && lang in this.data[key]) {
            return this.data[key][lang];
        }
        return key;
    }
}
