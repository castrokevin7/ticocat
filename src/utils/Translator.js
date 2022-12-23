String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{([0-9]+)}/g, function (match, index) {
        return typeof args[index] == 'undefined' ? match : args[index];
    });
};

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

        if (key in this.data && domain in this.data[key]) {
            return this.data[key][domain];
        }
        return key;
    }
}