function convertNumber() {
    const numberInput = document.getElementById('numberInput').value.replace(/\s+/g, '');
    const number = parseFloat(numberInput.replace(',', '.'));
    const language = document.getElementById('languageSelect').value;
    const errorAlert = document.getElementById('errorAlert');
    if (numberInput.length > 12) {
        errorAlert.style.display = 'block';
        setTimeout(() => {
            errorAlert.style.display = 'none';
        }, 2000);
        return;
    }
    if (isNaN(number)) {
        document.getElementById('result').innerText = language === 'uk' ? "Невірний формат числа" : "Invalid number format";
        return;
    }
    const words = numberToWords(number, language);
    document.getElementById('result').innerText = words;
}

function copyToClipboard() {
    const result = document.getElementById('result').innerText;
    navigator.clipboard.writeText(result).then(() => {
        const copyAlert = document.getElementById('copyAlert');
        copyAlert.style.display = 'block';
        setTimeout(() => {
            copyAlert.style.display = 'none';
        }, 2000);
    }).catch(err => {
        console.error('Помилка при копіюванні: ', err);
    });
}
