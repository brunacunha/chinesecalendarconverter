// Dictionary for UI Translations
const translations = {
    en: {
        pageTitle: "Chinese Calendar Converter",
        mainHeading: "Chinese Calendar Converter",
        lunarToSolarHeader: "Lunar ➔ Solar",
        lunarYearLabel: "Lunar Year:",
        lunarMonthLabel: "Lunar Month:",
        isLeapLabel: "Leap Month?",
        lunarDayLabel: "Lunar Day:",
        lunarToSolarBtn: "Convert to Solar",
        solarToLunarHeader: "Solar ➔ Lunar",
        solarYearLabel: "Solar Year:",
        solarMonthLabel: "Solar Month:",
        solarDayLabel: "Solar Day:",
        solarToLunarBtn: "Convert to Lunar",
        alertLunar: "Please fill out all lunar date fields.",
        alertSolar: "Please fill out all solar date fields.",
        errorLunar: "Invalid lunar date combination.",
        errorSolar: "Invalid solar date combination.",
        gregorianLabel: "Gregorian (Solar) Date:",
        lunarLabel: "Chinese Lunar Date:"
    },
    zh: {
        pageTitle: "中国农历转换器",
        mainHeading: "中国农历转换器",
        lunarToSolarHeader: "农历 ➔ 阳历",
        lunarYearLabel: "农历年份：",
        lunarMonthLabel: "农历月份：",
        isLeapLabel: "闰月？",
        lunarDayLabel: "农历日期：",
        lunarToSolarBtn: "转换成阳历",
        solarToLunarHeader: "阳历 ➔ 农历",
        solarYearLabel: "阳历年份：",
        solarMonthLabel: "阳历月份：",
        solarDayLabel: "阳历日期：",
        solarToLunarBtn: "转换成农历",
        alertLunar: "请填写所有的农历日期字段。",
        alertSolar: "请填写所有的阳历日期字段。",
        errorLunar: "无效的农历日期组合。",
        errorSolar: "无效的阳历日期组合。",
        gregorianLabel: "公历（阳历）日期：",
        lunarLabel: "中国农历日期："
    },
    pt: {
        pageTitle: "Conversor de Calendário Chinês",
        mainHeading: "Conversor de Calendário Chinês",
        lunarToSolarHeader: "Lunar ➔ Solar",
        lunarYearLabel: "Ano Lunar:",
        lunarMonthLabel: "Mês Lunar:",
        isLeapLabel: "Mês Bissexto?",
        lunarDayLabel: "Dia Lunar:",
        lunarToSolarBtn: "Converter para Solar",
        solarToLunarHeader: "Solar ➔ Lunar",
        solarYearLabel: "Ano Solar:",
        solarMonthLabel: "Mês Solar:",
        solarDayLabel: "Dia Solar:",
        solarToLunarBtn: "Converter para Lunar",
        alertLunar: "Por favor, preencha todos os campos da data lunar.",
        alertSolar: "Por favor, preencha todos os campos da data solar.",
        errorLunar: "Combinação de data lunar inválida.",
        errorSolar: "Combinação de data solar inválida.",
        gregorianLabel: "Data Gregoriana (Solar):",
        lunarLabel: "Data Lunar Chinesa:"
    }
};

let currentLang = 'en';

function updateTexts() {
    const t = translations[currentLang];
    
    // Update browser tab title
    document.title = t.pageTitle;

    // Update all elements with data-i18n attribute automatically
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerText = t[key];
        }
    });
}

// Wait for DOM to load so buttons are guaranteed to exist before adding listeners
document.addEventListener('DOMContentLoaded', function() {
    // Language Button Event Listeners
    document.getElementById('enBtn').addEventListener('click', function() {
        currentLang = 'en';
        updateTexts();
    });

    document.getElementById('zhBtn').addEventListener('click', function() {
        currentLang = 'zh';
        updateTexts();
    });

    document.getElementById('ptBtn').addEventListener('click', function() {
        currentLang = 'pt';
        updateTexts();
    });

    // 1. Lunar to Solar Conversion
    document.getElementById('lunarToSolarBtn').addEventListener('click', function() {
        const year = parseInt(document.getElementById('lunarYear').value);
        const month = parseInt(document.getElementById('lunarMonth').value);
        const day = parseInt(document.getElementById('lunarDay').value);
        const isLeap = document.getElementById('isLeap').checked;
        const resultBox = document.getElementById('lunarToSolarResult');
        const t = translations[currentLang];

        if (!year || !month || !day) {
            alert(t.alertLunar);
            return;
        }

        try {
            const lunarMonth = isLeap ? -month : month;
            const lunar = Lunar.fromYmd(year, lunarMonth, day);
            const solar = lunar.getSolar();

            resultBox.style.display = 'block';
            resultBox.style.borderLeftColor = '#2a9d8f';
            resultBox.style.background = '#f1faee';
            resultBox.innerHTML = `<strong>${t.gregorianLabel}</strong><br>${solar.toYmd()} (${solar.getWeekInChinese()})`;
        } catch (error) {
            resultBox.style.display = 'block';
            resultBox.style.borderLeftColor = '#e63946';
            resultBox.style.background = '#ffe5e5';
            resultBox.innerHTML = `<strong>Error:</strong> ${t.errorLunar}`;
            console.error(error);
        }
    });

    // 2. Solar to Lunar Conversion
    document.getElementById('solarToLunarBtn').addEventListener('click', function() {
        const year = parseInt(document.getElementById('solarYear').value);
        const month = parseInt(document.getElementById('solarMonth').value);
        const day = parseInt(document.getElementById('solarDay').value);
        const resultBox = document.getElementById('solarToLunarResult');
        const t = translations[currentLang];

        if (!year || !month || !day) {
            alert(t.alertSolar);
            return;
        }

        try {
            const solar = Solar.fromYmd(year, month, day);
            const lunar = solar.getLunar();

            resultBox.style.display = 'block';
            resultBox.style.borderLeftColor = '#2a9d8f';
            resultBox.style.background = '#f1faee';
            resultBox.innerHTML = `<strong>${t.lunarLabel}</strong><br>${lunar.toFullString()}`;
        } catch (error) {
            resultBox.style.display = 'block';
            resultBox.style.borderLeftColor = '#e63946';
            resultBox.style.background = '#ffe5e5';
            resultBox.innerHTML = `<strong>Error:</strong> ${t.errorSolar}`;
            console.error(error);
        }
    });
});