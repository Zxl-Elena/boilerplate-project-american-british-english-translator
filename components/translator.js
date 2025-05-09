const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    translate(map, text, isTitle = false) {
        let replaced = false;
        const words = Object.keys(map)
            .map(key => isTitle ? key.replace(".", "\\.") : key)
            .sort((a, b) => b.length - a.length)
            .join("|");
        const regex = new RegExp(isTitle ? `(${words})` : `\\b(${words})\\b`, "gi");

        const translated = text.replace(regex, (match) => {
            replaced = true;
            const lower = match.toLowerCase();
            let replacement = map[lower];

            if(match[0] === match[0].toUpperCase()) {
                replacement = replacement[0].toUpperCase() + replacement.slice(1);
            }
            return `<span class="highlight">${replacement}</span>`;
        });
        return {translated, replaced};
    }

    americanToBritish(text) {
        const map = {
            ...americanOnly,
            ...americanToBritishSpelling,
        };
        let replaced = false;

        const titleResult = this.translate(americanToBritishTitles, text, true);
        text = titleResult.translated;
        replaced ||=titleResult.replaced;

        const wordsResult = this.translate(map, text);
        text = wordsResult.translated;
        replaced ||=wordsResult.replaced;

        text = text.replace(/\b(\d{1,2}):(\d{2})\b/g, (match, h, m) => {
            replaced = true;
            return `<span class="highlight">${h}.${m}</span>`;
          });

        return {text, replaced};
    };

    britishToAmerican(text) {
        const map = {
            ...Object.entries(americanToBritishSpelling).reduce((acc, [k, v]) => {
                acc[v] = k;
                return acc;
              }, {}),
              ...Object.entries(americanToBritishTitles).reduce((acc, [k, v]) => {
                acc[v] = k;
                return acc;
              }, {}),
              ...britishOnly
        }
        let replaced = false;

        const wordsResult = this.translate(map, text);
        replaced ||=wordsResult.replaced;
        text = wordsResult.translated;

        text = text.replace(/\b(\d{1,2})\.(\d{2})\b/g, (match, h, m) => {
            replaced = true;
            return `<span class="highlight">${h}:${m}</span>`;
        });
        return {text, replaced};
    }
}

module.exports = Translator;