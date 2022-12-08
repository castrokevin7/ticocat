export default class Translator {
 
    constructor() {
        this.data = require('./Translations.json');
    }

    static instance = Translator.instance || new Translator()

    translate(key) {
        let domain = window.location.hostname;
        if (domain === "localhost") {
            domain = "cat.asoticocat.com"
        }

        return this.data[key][domain];
    }
}