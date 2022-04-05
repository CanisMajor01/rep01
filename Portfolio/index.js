import i18n from "./translate.js";

(function () {
    const header__burgerItem = document.querySelector('.hamburger');
    const menu = document.querySelector('.header__nav');
    const menuLinks = document.querySelectorAll('.header_link');
    const portfolioWinterBtn = document.querySelector('.winterButton');
    const portfolioSpringBtn = document.querySelector('.springButton');
    const portfolioSummerBtn = document.querySelector('.summerButton');
    const portfolioAutumnBtn = document.querySelector('.autumnButton');
    const portfolioImages = document.querySelectorAll('.portfolio-image');
    const portfolioBtns = document.querySelectorAll('.content__Portfolio_button');
    const textToTranslate = document.querySelectorAll('[data-i18n]')
    const langEn = document.querySelector('.en')
    const langRu = document.querySelector('.ru')
    const langSwitchBtn = document.querySelectorAll('.language_switch')
    // language_switch - кнопки добавить .language_switch_active
    const themeChange = document.querySelector('.theme_change_btn')
    const lightDarkTheme = document.querySelectorAll('.theme_change')
    let languageMem = 'en'
    let theme = 'dark'

    header__burgerItem.addEventListener('click', () => {
        header__burgerItem.classList.toggle('is-active')
        menu.classList.toggle('header__nav_active')
    });

    menu.addEventListener('click', () => {
        menu.classList.remove('header__nav_active');
    });

    if (window.innerWidth < 768) {
        for (let i = 0; i < menuLinks.length; i++) {
            menuLinks[i].addEventListener('click', () => {
                menu.classList.remove('header__nav_active');
                header__burgerItem.classList.add('is-active')
            }
            )};
    };

    portfolioWinterBtn.addEventListener('click', () => {
        portfolioImages.forEach((img, index) => img.src = `./assets/img/portfolio-winter${index + 1}.jpg`);
        portfolioBtns.forEach( (elem) => {elem.classList.remove('button_active')})
        event.target.classList.add('button_active')
    });

    portfolioSpringBtn.addEventListener('click', () => {
        portfolioImages.forEach((img, index) => img.src = `./assets/img/portfolio-spring${index + 1}.jpg`);
        portfolioBtns.forEach( (elem) => {elem.classList.remove('button_active')})
        event.target.classList.add('button_active')
    });

    portfolioSummerBtn.addEventListener('click', () => {
        portfolioImages.forEach((img, index) => img.src = `./assets/img/portfolio-summer${index + 1}.jpg`);
        portfolioBtns.forEach( (elem) => {elem.classList.remove('button_active')})
        event.target.classList.add('button_active')
    });

    portfolioAutumnBtn.addEventListener('click', () => {
        portfolioImages.forEach((img, index) => img.src = `./assets/img/portfolio-autumn${index + 1}.jpg`);
        portfolioBtns.forEach( (elem) => {elem.classList.remove('button_active')})
        event.target.classList.add('button_active')
    });

    function setColorTheme() {
        if (theme === 'dark') {
            themeChange.classList.add('theme_change_btn_light');
            lightDarkTheme.forEach( (elem) => {elem.classList.add('light_theme')})
            theme = 'light'
            console.log(`Set ${theme} theme`) 
        } else {
            themeChange.classList.remove('theme_change_btn_light');
            lightDarkTheme.forEach( (elem) => {elem.classList.remove('light_theme')})
            theme = 'dark'
            console.log(`Set ${theme} theme`) 
        }
    }
    
    themeChange.addEventListener('click', () => {
        setColorTheme()
    });

    const getTranslate = (lang) => {
            textToTranslate.forEach( (element) => {
                element.textContent = i18n[lang][element.dataset.i18n];
                
            });
            
    }
    

    langRu.addEventListener('click', () => {
        getTranslate('ru');
        langEn.classList.remove('language_switch_active');
        event.target.classList.add('language_switch_active');
        console.log("tranlate to RU done")
        languageMem = (languageMem === 'en' ? 'ru' : 'en');
        console.log(`languageMem = ${languageMem}`)

    });

    langEn.addEventListener('click', () => {
        getTranslate('en');
        langRu.classList.remove('language_switch_active');
        event.target.classList.add('language_switch_active');
        console.log("tranlate to EN done")
        languageMem = (languageMem === 'en' ? 'ru' : 'en');
        console.log(`languageMem = ${languageMem}`)
    });

    function setLocalStorage() {
        localStorage.setItem('lang', languageMem);
        localStorage.setItem('theme', theme);
    }

    window.addEventListener('beforeunload', setLocalStorage)

    function getLocalStorage() {
        if(localStorage.getItem('lang')) {
          const lang = localStorage.getItem('lang');
          if (lang === languageMem) {
            console.log('Localstorage language set')
        } else {
            getTranslate(lang);
            languageMem = lang;
            console.log('Language changed through Localstorage')
        }
        }

        if(localStorage.getItem('theme')) {
            const themeSet = localStorage.getItem('theme');
            if (themeSet === theme) {
                console.log('Localstorage theme set')
            } else {
                setColorTheme(themeSet);    
                console.log('Theme changed through Localstorage')
            }
          }
    }

    window.addEventListener('load', getLocalStorage)
    
    const animateButton = (e) => {

        e.preventDefault;
        //reset animation
        e.target.classList.remove('animate');
        
        e.target.classList.add('animate');
        setTimeout(function(){
          e.target.classList.remove('animate');
        },750);
    };
      
    const bubblyButtons = document.getElementsByClassName("bubbly-button");
      
    for (let i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
    }
}()); 

console.log(`Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/portfolio/portfolio-part3.md)
Deploy: https://rolling-scopes-school.github.io/canismajor01-JSFEPRESCHOOL/Portfolio/
Done --.01.2022 / deadline 31.01.2022
Score: 85 / 85

Отзыв по пункам ТЗ:
1) + Смена изображений в секции portfolio +25
2) + Перевод страницы на два языка +25
3) + Переключение светлой и тёмной темы +25
4) + Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5
5) + Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5 `)
