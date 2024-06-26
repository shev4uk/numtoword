const numberToWords = require('./numberToWords'); // Імпорт функції, яку ми тестуємо

describe("numberToWords", function() {
    it("should convert integer part to words in Ukrainian", function() {
        expect(numberToWords(123, 'uk')).toBe("сто двадцять три гривень");
    });

    it("should convert integer part to words in English", function() {
        expect(numberToWords(123, 'en')).toBe("one hundred twenty three dollars");
    });

    it("should convert fractional part to words in Ukrainian", function() {
        expect(numberToWords(123.45, 'uk')).toBe("сто двадцять три гривень сорок п'ять копійок");
    });

    it("should convert fractional part to words in English", function() {
        expect(numberToWords(123.45, 'en')).toBe("one hundred twenty three dollars forty five cents");
    });

    it("should handle zero in Ukrainian", function() {
        expect(numberToWords(0, 'uk')).toBe("нуль гривень");
    });

    it("should handle zero in English", function() {
        expect(numberToWords(0, 'en')).toBe("zero dollars");
    });

    it("should handle numbers with spaces", function() {
        expect(numberToWords(parseFloat("1 234.56".replace(/\s+/g, '')), 'uk')).toBe("одна тисяча двісті тридцять чотири гривень п'ятдесят шість копійок");
    });

    it("should convert large numbers correctly in Ukrainian", function() {
        expect(numberToWords(123456789012, 'uk')).toBe("сто двадцять три мільярди чотириста п'ятдесят шість мільйонів сімсот вісімдесят дев'ять тисяч дванадцять гривень");
    });

    it("should convert large numbers correctly in English", function() {
        expect(numberToWords(123456789012, 'en')).toBe("one hundred twenty three billion four hundred fifty six million seven hundred eighty nine thousand twelve dollars");
    });

    it("should handle numbers longer than 12 digits", function() {
        expect(() => numberToWords(1234567890123, 'uk')).toThrowError("Число не повинно перевищувати 12 знаків!");
    });
});
