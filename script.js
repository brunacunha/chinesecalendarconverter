// 1. Lunar to Solar Conversion
document.getElementById('lunarToSolarBtn').addEventListener('click', function() {
    const year = parseInt(document.getElementById('lunarYear').value);
    const month = parseInt(document.getElementById('lunarMonth').value);
    const day = parseInt(document.getElementById('lunarDay').value);
    const isLeap = document.getElementById('isLeap').checked;
    const resultBox = document.getElementById('lunarToSolarResult');

    if (!year || !month || !day) {
        alert('Please fill out all lunar date fields.');
        return;
    }

    try {
        const lunarMonth = isLeap ? -month : month;
        const lunar = Lunar.fromYmd(year, lunarMonth, day);
        const solar = lunar.getSolar();

        resultBox.style.display = 'block';
        resultBox.style.borderLeftColor = '#2a9d8f';
        resultBox.style.background = '#f1faee';
        resultBox.innerHTML = `<strong>Gregorian (Solar) Date:</strong><br>${solar.toYmd()} (${solar.getWeekInChinese()})`;
    } catch (error) {
        resultBox.style.display = 'block';
        resultBox.style.borderLeftColor = '#e63946';
        resultBox.style.background = '#ffe5e5';
        resultBox.innerHTML = `<strong>Error:</strong> Invalid lunar date combination.`;
        console.error(error);
    }
});

// 2. Solar to Lunar Conversion
document.getElementById('solarToLunarBtn').addEventListener('click', function() {
    const year = parseInt(document.getElementById('solarYear').value);
    const month = parseInt(document.getElementById('solarMonth').value);
    const day = parseInt(document.getElementById('solarDay').value);
    const resultBox = document.getElementById('solarToLunarResult');

    if (!year || !month || !day) {
        alert('Please fill out all solar date fields.');
        return;
    }

    try {
        const solar = Solar.fromYmd(year, month, day);
        const lunar = solar.getLunar();

        resultBox.style.display = 'block';
        resultBox.style.borderLeftColor = '#2a9d8f';
        resultBox.style.background = '#f1faee';
        resultBox.innerHTML = `<strong>Chinese Lunar Date:</strong><br>${lunar.toFullString()}`;
    } catch (error) {
        resultBox.style.display = 'block';
        resultBox.style.borderLeftColor = '#e63946';
        resultBox.style.background = '#ffe5e5';
        resultBox.innerHTML = `<strong>Error:</strong> Invalid solar date combination.`;
        console.error(error);
    }
});