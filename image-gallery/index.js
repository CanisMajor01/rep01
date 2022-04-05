// Finding elements

const images = document.querySelectorAll('.img_item')
const links = document.querySelectorAll('.img__link')
const container = document.querySelector('.container')
const searchBtn = document.querySelector('.search_button')
const searchField = document.querySelector('.search')
const searchCrossButton = document.querySelector('.clear_search_field')
const nextPage = document.querySelector('.next_page')
const prevPage = document.querySelector('.prev_page')
const numPage = document.querySelector('.page_num')


// Setting up

let url = 'https://api.unsplash.com/search/photos?query=summer&page=1&per_page=30&orientation=landscape&client_id=RP2kGjMMfbXNSpKHzKNKJnFc9jqu3DS0YAqMgjprdro'
searchField.focus()
let currentPage = 1
let currentSearchRequest = 'summer'


// Functions
async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
}

function showData (data) {
    data.results.forEach( (image, index) => {
        const link = document.createElement('a')
        link.classList.add('img_link')
        link.href = data.results[index].urls.regular;
                
        const img = link.appendChild(document.createElement('img'));
        img.classList.add('img_item')
        img.src = data.results[index].urls.regular;
        img.alt = data.results[index].alt_description;

        const descr = document.createElement('p')
        descr.classList.add('img_text')
        descr.innerText =  capitalizeFirstLetter(data.results[index].alt_description);
        
        container.append(link);
        link.append(img);
        link.append(descr);
        setLocalStorage(currentSearchRequest)
        setPageNumber ()
    })
}

function searchData () {
    deleteImages()
    url = `https://api.unsplash.com/search/photos?query=${searchField.value}&page=${currentPage}&&per_page=30&orientation=landscape&client_id=RP2kGjMMfbXNSpKHzKNKJnFc9jqu3DS0YAqMgjprdro`;
        if (searchField.value !== '') {
        currentSearchRequest = searchField.value
        searchField.placeholder = searchField.value;
        searchField.value = '';
        currentPage = 1;
        }   else { url = `https://api.unsplash.com/search/photos?query=${currentSearchRequest}&page=${currentPage}&&per_page=30&orientation=landscape&client_id=RP2kGjMMfbXNSpKHzKNKJnFc9jqu3DS0YAqMgjprdro`;
            }
    getData();
}

const deleteImages = () => {
    let imageToDelete = document.querySelectorAll('.img_item')
    for(let i = 0; i < imageToDelete.length; i++) {
        imageToDelete[i].remove();}
    let linkToDelete = document.querySelectorAll('.img_link')
    for(let i = 0; i < linkToDelete.length; i++) {
        linkToDelete[i].remove();}
    let textToDelete = document.querySelectorAll('.img_text')
    for(let i = 0; i < textToDelete.length; i++) {
        textToDelete[i].remove();}
}

const clearInput = () => {
    searchField.value = '';
    searchField.placeholder = 'Searching for summer?';
}

function capitalizeFirstLetter(string) {
    if (string !== null) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

function switchToNextPage () {
    let pagePosition = url.indexOf('page=')
    currentPage++
    url[pagePosition + 5] = currentPage
    setLocalStorage(currentPage)
}

function switchToPrevPage () {
    let pagePosition = url.indexOf('page=')
    currentPage--
    url[pagePosition + 5] = currentPage
    setLocalStorage(currentPage)
}

function getLocalStorage() {
    if(localStorage.getItem('currentPage')) {
      const page = localStorage.getItem('currentPage');
        if (page === currentPage) {
        }   else {
            currentPage = page
            }
    }

    if(localStorage.getItem('searchRequest')) {
        const searchRequest = localStorage.getItem('searchRequest');
        if (searchRequest === currentSearchRequest) {
        }   else {
                currentSearchRequest = searchRequest
                searchField.placeholder = `Still searching for ${searchRequest}?`
            }
    }
      searchData()
}

function setLocalStorage() {
    localStorage.setItem('currentPage', currentPage);
    localStorage.setItem('searchRequest', currentSearchRequest);
}

function setPageNumber () {
    numPage.innerHTML = `Page : ${currentPage}`
}

// Listeners

searchBtn.addEventListener('click', searchData)

searchField.addEventListener('keypress', function(e){
    if(e.which === 13){
          e.preventDefault();
            searchData()
    }
});

searchCrossButton.addEventListener('click', clearInput)

nextPage.addEventListener('click', () => {
    switchToNextPage()
    searchData()
})

prevPage.addEventListener('click', () => {
    switchToPrevPage()
    searchData()
})

window.addEventListener('load', getLocalStorage)

// Starting up
// window.open('http://www.google.com/')
window.addEventListener('load', setPageNumber)


// Logging
console.log(` Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/js30%23/js30-5.md
Deploy: missing yet
Done 04.02.2022 / deadline 14.02.2022 23:59 UTC
Score: 70 / 60

По пунктам ТЗ:
1) + Вёрстка +10
        на странице есть несколько фото и строка поиска +5
        в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2) + При загрузке приложения на странице отображаются полученные от API изображения +10
3) + Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
2) + Поиск +30
        при открытии приложения курсор находится в поле ввода +5
        есть placeholder +5
        автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
        поисковый запрос можно отправить нажатием клавиши Enter +5
        после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
        в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
3) + Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 
        высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
     +   Добавлен background, описание фото, стилизация фото, работа localstorage (последний поисковый запрос и номер страницы), картинки открываются в новом окне`)
        
        
