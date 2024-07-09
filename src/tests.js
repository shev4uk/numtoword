const numberToWords = require('./numberToWords'); // Імпорт функції, яку ми тестуємо

describe("numberToWords", function() {
    it("should convert integer part to words in Ukrainian", function() {
        expect(numberToWords(123, 'uk')).toBe("Сто двадцять три гривні 00 копійок");
    });

    it("should convert integer part to words in English", function() {
        expect(numberToWords(123, 'en')).toBe("One hundred twenty three dollars 00 cents");
    });

    it("should convert fractional part to words in Ukrainian", function() {
        expect(numberToWords(123.45, 'uk')).toBe("Сто двадцять три гривні 45 копійок");
    });

    it("should convert fractional part to words in English", function() {
        expect(numberToWords(123.45, 'en')).toBe("One hundred twenty three dollars 45 cents");
    });

    it("should handle zero in Ukrainian", function() {
        expect(numberToWords(0, 'uk')).toBe("Нуль гривень 00 копійок");
    });

    it("should handle zero in English", function() {
        expect(numberToWords(0, 'en')).toBe("Zero dollars 00 cents");
    });

    it("should handle numbers with spaces", function() {
        expect(numberToWords(parseFloat("1 234.56".replace(/\s+/g, '')), 'uk')).toBe("Одна тисяча двісті тридцять чотири гривні 56 копійок");
    });

    it("should convert large numbers correctly in Ukrainian", function() {
        expect(numberToWords(123456789012, 'uk')).toBe("Сто двадцять три мільярди чотириста п'ятдесят шість мільйонів сімсот вісімдесят дев'ять тисяч дванадцять гривень 00 копійок");
    });

    it("should convert large numbers correctly in English", function() {
        expect(numberToWords(123456789012, 'en')).toBe("One hundred twenty three billion four hundred fifty six million seven hundred eighty nine thousand twelve dollars 00 cents");
    });

    it("should handle numbers longer than 12 digits", function() {
        expect(() => numberToWords(1234567890123, 'uk')).toThrowError("Число не повинно перевищувати 12 знаків!");
    });

    it("should handle numbers with fractional part less than 10 correctly in Ukrainian", function() {
        expect(numberToWords(40.02, 'uk')).toBe("Сорок гривень 02 копійки");
    });

    it("should handle numbers with fractional part less than 10 correctly in English", function() {
        expect(numberToWords(40.02, 'en')).toBe("Forty dollars 02 cents");
    });
});
