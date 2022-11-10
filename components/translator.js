const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    getMultipleAmericanOnly() {
        let americanOnlyArray = [];
        for(const key of Object.keys(americanOnly)) {
            if(key.includes(' ')) {
                americanOnlyArray.push(key);
            }
        }
        return americanOnlyArray;
    }

    getMultipleBritishOnly() {
        let britishOnlyArray = [];
        for(const key of Object.keys(britishOnly)) {
            if(key.includes(' ')) {
                britishOnlyArray.push(key);
            }
        }
        return britishOnlyArray;
    }

    translationNeeded(strWord, locale) {

        if(locale == 'american-to-british') {
            if(strWord.match(/^[0-9]{1,2}:[0-9]{1,2}$/)) {
                return true;
            }

            for(const key of Object.keys(americanOnly)) {
                if(strWord.toLowerCase() == key.toLowerCase()) {
                    return true;
                }
            }

            for(const key of Object.keys(americanToBritishSpelling)) {
                if(strWord.toLowerCase() == key.toLowerCase()) {
                    return true;
                }
            }

            for(const key of Object.keys(americanToBritishTitles)) {
                if(strWord.toLowerCase() == key.toLowerCase()) {
                    return true;
                }
            }
            return false;

        } else if(locale == 'british-to-american') {
            if(strWord.match(/^[0-9]{1,2}.[0-9]{1,2}$/)) {
                return true;
            }

            for(const key of Object.keys(britishOnly)) {
                if(strWord.toLowerCase() == key.toLowerCase()) {
                    return true;
                }
            }

            for(const key of Object.keys(americanToBritishSpelling)) {
                if(strWord.toLowerCase() == americanToBritishSpelling[key].toLowerCase()) {
                    return true;
                }
            }

            for(const key of Object.keys(americanToBritishTitles)) {
                if(strWord.toLowerCase() == americanToBritishTitles[key].toLowerCase()) {
                    return true;
                }
            }
            return false;

        } else {
            return false;
        }

    }


    translate(strWord, locale) {
        //console.log('strW', strWord, amO, )
        if(locale == 'american-to-british') {
            if(strWord.match(/^[0-9]{1,2}:[0-9]{1,2}$/)) {
                return `<span class="highlight">${strWord.replace(':','.')}</span>`;
            }
            if(americanOnly[strWord.toLowerCase()]) {
                let firstLetter = americanOnly[strWord.toLowerCase()][0].toUpperCase();
                let w = (strWord[0] == strWord[0].toUpperCase()) ? (/*strWord[0]*/firstLetter + americanOnly[strWord.toLowerCase()].slice(1)) : americanOnly[strWord.toLowerCase()];
                return `<span class="highlight">${w/*americanOnly[strWord.toLowerCase()]*/}</span>`;
            }
            if(americanToBritishSpelling[strWord.toLowerCase()]) {
                let firstLetter = americanToBritishSpelling[strWord.toLowerCase()][0].toUpperCase();
                let w = (strWord[0] == strWord[0].toUpperCase()) ? (/*strWord[0]*/firstLetter + americanToBritishSpelling[strWord.toLowerCase()].slice(1)) : americanToBritishSpelling[strWord.toLowerCase()];
                return `<span class="highlight">${w/*americanToBritishSpelling[strWord.toLowerCase()]*/}</span>`;
            }
            if(americanToBritishTitles[strWord.toLowerCase()]) {
                let firstLetter = americanToBritishTitles[strWord.toLowerCase()][0].toUpperCase();
                let w = (strWord[0] == strWord[0].toUpperCase()) ? (/*strWord[0]*/firstLetter + americanToBritishTitles[strWord.toLowerCase()].slice(1)) : americanToBritishTitles[strWord.toLowerCase()];
                return `<span class="highlight">${w/*americanToBritishTitles[strWord.toLowerCase()]*/}</span>`;
            }
            return strWord;

            /*return ((strWord.match(/^[0-9]{1,2}:[0-9]{1,2}$/) ? `<span class="highlight">${strWord.replace(':','.')}</span>` : strWord) ||
                `<span class="highlight">${americanOnly[strWord]}</span>` || 
                `<span class="highlight">${americanToBritishSpelling[strWord]}</span>` ||
                `<span class="highlight">${americanToBritishTitles[strWord]}</span>`);*/

        } else if(locale == 'british-to-american') {
            if(strWord.match(/^[0-9]{1,2}.[0-9]{1,2}$/)) {
                return `<span class="highlight">${strWord.replace('.',':')}</span>`;
            }
            if(britishOnly[strWord.toLowerCase()]) {
                let firstLetter = britishOnly[strWord.toLowerCase()][0].toUpperCase();
                let w = (strWord[0] == strWord[0].toUpperCase()) ? (/*strWord[0]*/firstLetter + britishOnly[strWord.toLowerCase()].slice(1)) : britishOnly[strWord.toLowerCase()];
                return `<span class="highlight">${w/*britishOnly[strWord.toLowerCase()]*/}</span>`;
            }
            if(Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] == strWord.toLowerCase())) {
                let firstLetter = Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] == strWord.toLowerCase())[0].toUpperCase();
                let w = (strWord[0] == strWord[0].toUpperCase()) ? (/*strWord[0]*/firstLetter + Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] == strWord.toLowerCase()).slice(1)) : Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] == strWord.toLowerCase());
                return `<span class="highlight">${w/*Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] == strWord.toLowerCase())*/}</span>`;
            }
            if(Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] == strWord.toLowerCase())) {
                let firstLetter = Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] == strWord.toLowerCase())[0].toUpperCase();
                let w = (strWord[0] == strWord[0].toUpperCase()) ? (/*strWord[0]*/firstLetter + Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] == strWord.toLowerCase()).slice(1)) : Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] == strWord.toLowerCase()); 
                return `<span class="highlight">${w/*Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] == strWord.toLowerCase())*/}</span>`;
            }
            return strWord;

            /*return ((strWord.match(/^[0-9]{1,2}.[0-9]{1,2}$/) ? `<span class="highlight">${strWord.replace('.',':')}</span>` : strWord) ||
                `<span class="highlight">${britishOnly[strWord]}</span>` || 
                `<span class="highlight">${Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] == strWord)}</span>` ||
                `<span class="highlight">${Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] == strWord)}</span>`);*/

        } else {
            return strWord;
        }
    }

}

module.exports = Translator;