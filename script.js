// Dictionary for UI Translations
const translations = {
    en: {
        pageTitle: "Chinese Calendar Converter",
        mainHeading: "Chinese Calendar Converter",
        introText: "This is a simple web tool to convert lunisolar calendar dates to the solar calendar and vice versa. If you, like me, are tired of not knowing the date of your chinese friends' birthday, use this tool and be a nice buddy. You are welcome.",
        recommendationText: "Go watch Pursuit of Jade, please. 🤓",
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
        introText: "这是一个用于在农历和阳历之间进行转换的简单网页工具。如果你和我一样，经常不知道中国朋友的生日是什么时候，用这个工具来当一个贴心的好朋友吧。不客气。",
        recommendationText: "请 去看《逐玉》吧。🤓",
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
        introText: "Esta é uma ferramenta web simples para converter datas do calendário lunissolar para o calendário solar e vice-versa. Se você, assim como eu, está cansado de não saber a data do aniversário do seu amigo chinês, use esta ferramenta e seja um bom amigo. De nada.",
        recommendationText: "Vá assistir Por Você (Em busca de Jade) na Netflix, por favor. 🤓",
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

            // Format Solar Date matching the selected language
            const jsDate = new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
            const localeMap = { en: 'en-US', zh: 'zh-CN', pt: 'pt-BR' };
            const formattedDate = jsDate.toLocaleDateString(localeMap[currentLang], {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            resultBox.style.display = 'block';
            resultBox.style.borderLeftColor = '#2a9d8f';
            resultBox.style.background = '#f1faee';
            resultBox.innerHTML = `<strong>${t.gregorianLabel}</strong><br>${formattedDate}`;
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

            let lunarStr = '';
            const lYear = lunar.getYear();
            const lMonth = Math.abs(lunar.getMonth());
            const lDay = lunar.getDay();
            const isLeap = lunar.getMonth() < 0;

            if (currentLang === 'zh') {
                lunarStr = lunar.toString();
            } else if (currentLang === 'pt') {
                lunarStr = `Ano ${lYear}, ${isLeap ? 'Mês Bissexto - ' : 'Mês '} ${lMonth}, Dia ${lDay}`;
            } else {
                lunarStr = `Year ${lYear}, ${isLeap ? 'Leap Month - ' : 'Month '} ${lMonth}, Day ${lDay}`;
            }

            resultBox.style.display = 'block';
            resultBox.style.borderLeftColor = '#2a9d8f';
            resultBox.style.background = '#f1faee';
            resultBox.innerHTML = `<strong>${t.lunarLabel}</strong><br>${lunarStr}`;
        } catch (error) {
        resultBox.style.display = 'block';
        resultBox.style.borderLeftColor = '#e63946';
        resultBox.style.background = '#ffe5e5';
        // This will show you the exact technical error
        resultBox.innerHTML = `<strong>Error:</strong> ${error.message}`;
        console.error(error);
    }
    });
});