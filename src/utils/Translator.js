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
        const path = window.location.pathname;
        let parts = path.split("/");
        if (parts.length > 0 && parts[0] === "") {
            parts = parts.slice(1);
        }
        const first = parts[0];
        const lang = first === "es" || first === "cat" ? first : "es";
        if (key in this.data && lang in this.data[key]) {
            return this.data[key][lang];
        }
        return key;
    }
}