function numberToWords(num, lang) {
    if (num.toString().length > 12) {
        throw new Error(lang === 'uk' ? "Число не повинно перевищувати 12 знаків!" : "Number should not exceed 12 digits!");
    }

    const units = {
        uk: ["нуль", "один", "два", "три", "чотири", "п'ять", "шість", "сім", "вісім", "дев'ять"],
        en: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    };
    const teens = {
        uk: ["десять", "одинадцять", "дванадцять", "тринадцять", "чотирнадцять", "п'ятнадцять", "шістнадцять", "сімнадцять", "вісімнадцять", "дев'ятнадцять"],
        en: ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
    };
    const tens = {
        uk: ["", "", "двадцять", "тридцять", "сорок", "п'ятдесят", "шістдесят", "сімдесят", "вісімдесят", "дев'яносто"],
        en: ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
    };
    const hundreds = {
        uk: ["", "сто", "двісті", "триста", "чотириста", "п'ятсот", "шістсот", "сімсот", "вісімсот", "дев'ятсот"],
        en: ["", "one hundred", "two hundred", "three hundred", "four hundred", "five hundred", "six hundred", "seven hundred", "eight hundred", "nine hundred"]
    };
    const thousands = {
        uk: ["", "тисяча", "тисячі", "тисяч"],
        en: ["", "thousand", "thousand", "thousand"]
    };
    const millions = {
        uk: ["", "мільйон", "мільйони", "мільйонів"],
        en: ["", "million", "million", "million"]
    };
    const billions = {
        uk: ["", "мільярд", "мільярди", "мільярдів"],
        en: ["", "billion", "billion", "billion"]
    };
    const trillions = {
        uk: ["", "трильйон", "трильйони", "трильйонів"],
        en: ["", "trillion", "trillion", "trillion"]
    };

    function getUnitCase(number, lang, unitType) {
        if (lang === 'uk') {
            if (unitType === 'kopecks') {
                if (number % 10 === 1 && number % 100 !== 11) {
                    return "копійка";
                } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
                    return "копійки";
                } else {
                    return "копійок";
                }
            } else if (unitType === 'hryvnias') {
                if (number % 10 === 1 && number % 100 !== 11) {
                    return "гривня";
                } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
                    return "гривні";
                } else {
                    return "гривень";
                }
            } else if (unitType === 'thousands') {
                if (number % 10 === 1 && number % 100 !== 11) {
                    return "тисяча";
                } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
                    return "тисячі";
                } else {
                    return "тисяч";
                }
            } else if (unitType === 'millions') {
                if (number % 10 === 1 && number % 100 !== 11) {
                    return "мільйон";
                } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
                    return "мільйони";
                } else {
                    return "мільйонів";
                }
            } else if (unitType === 'billions') {
                if (number % 10 === 1 && number % 100 !== 11) {
                    return "мільярд";
                } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
                    return "мільярди";
                } else {
                    return "мільярдів";
                }
            } else if (unitType === 'trillions') {
                if (number % 10 === 1 && number % 100 !== 11) {
                    return "трильйон";
                } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
                    return "трильйони";
                } else {
                    return "трильйонів";
                }
            }
        }
        return ""; // In English, the form does not change
    }

    function convertInteger(num, lang, isFeminine) {
        if (num === 0) return units[lang][0];

        let words = [];
        if (num >= 1e12) {
            const trillionsValue = Math.floor(num / 1e12);
            words.push(convertInteger(trillionsValue, lang, false));
            words.push(trillions[lang][getUnitCase(trillionsValue, lang, 'trillions')]);
            num %= 1e12;
        }

        if (num >= 1e9) {
            const billionsValue = Math.floor(num / 1e9);
            words.push(convertInteger(billionsValue, lang, false));
            words.push(billions[lang][getUnitCase(billionsValue, lang, 'billions')]);
            num %= 1e9;
        }

        if (num >= 1e6) {
            const millionsValue = Math.floor(num / 1e6);
            words.push(convertInteger(millionsValue, lang, false));
            words.push(millions[lang][getUnitCase(millionsValue, lang, 'millions')]);
            num %= 1e6;
        }

        if (num >= 1e3) {
            const thousandsValue = Math.floor(num / 1e3);
            words.push(convertInteger(thousandsValue, lang, true));
            words.push(thousands[lang][getUnitCase(thousandsValue, lang, 'thousands')]);
            num %= 1e3;
        }

        if (num >= 100) {
            words.push(hundreds[lang][Math.floor(num / 100)]);
            num %= 100;
        }

        if (num >= 20) {
            words.push(tens[lang][Math.floor(num / 10)]);
            num %= 10;
        } else if (num >= 10) {
            words.push(teens[lang][num - 10]);
            num = 0;
        }

        if (num > 0) {
            if (isFeminine && num === 1 && lang === 'uk') {
                words.push("одна");
            } else if (isFeminine && num === 2 && lang === 'uk') {
                words.push("дві");
            } else {
                words.push(units[lang][num]);
            }
        }

        return words.join(' ');
    }

    const integerPart = Math.floor(num);
    const fractionalPart = Math.round((num - integerPart) * 100);

    const integerWords = convertInteger(integerPart, lang, false);
    const fractionalWords = fractionalPart > 0 ? fractionalPart.toString().padStart(2, '0') : '00';

    let result;
    if (lang === 'uk') {
        result = `${integerWords.charAt(0).toUpperCase() + integerWords.slice(1)} ${getUnitCase(integerPart, lang, 'hryvnias')} ${fractionalWords} ${getUnitCase(fractionalPart, lang, 'kopecks')}`;
    } else {
        result = `${integerWords.charAt(0).toUpperCase() + integerWords.slice(1)} dollars ${fractionalWords} cents`;
    }

    return result;
}

module.exports = numberToWords;