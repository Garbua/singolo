const MENU = document.getElementById('menu');

const ARROW_LEFT = document.querySelector('.arrow-left');
const ARROW_RIGHT = document.querySelector('.arrow-right');
let sliders = document.querySelectorAll('.carousel .slide');
let currentSlide = 0;
let isEnabled = true;

let screenVertical = document.querySelector('.non-screen.vertical');
let screenHorizontal = document.querySelector('.non-screen.horizontal');
let iphoneVertical = document.querySelector('.home1');
let iphoneHorizontal = document.querySelector('.home2');

let portfolioFilter = document.getElementById('filters-btn');
let listPortfolio = document.getElementById('portfolio-list');

const BTN = document.getElementById('submit-btn');
const CLOSE_BTN = document.getElementById('close-btn');
const FORM = document.getElementById('form');

// Navigation  _________________________________________________________________________________

document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const cursPos = window.scrollY;
    const sections = document.querySelectorAll('#main>section');
    
    sections.forEach((el, index) => {
        if(index == sections.length - 1) {
            removeAddActive(0.3);
        }else{
            removeAddActive(0.12);
        }
        function removeAddActive(n) {
            if( (el.offsetTop - (window.innerHeight * n)) <= cursPos && (el.offsetTop + el.offsetHeight) > cursPos ) {
                MENU.querySelectorAll('a').forEach((a) => {
                    a.classList.remove('active');
                    if(el.querySelector('a').getAttribute('id') === a.getAttribute('href').substring(1)) {
                        a.classList.add('active');
                    }
                })
            }
        }
    })
}

// Sliders  __________________________________________________________________________________

function changeCurrentSlide(n) {
	currentSlide = (n + sliders.length) % sliders.length;
};

function hideSlide(direction) {
	isEnabled = false;
	sliders[currentSlide].classList.add(direction);
	sliders[currentSlide].addEventListener('animationend', function() {
		this.classList.remove('current', direction);
	});
}

function showSlide(direction) {
	sliders[currentSlide].classList.add('next', direction);
	sliders[currentSlide].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('current');
		isEnabled = true;
	});
}

function nextSlide(n) {
    hideSlide('to-left');
    changeCurrentSlide(n + 1);
    showSlide('from-right');
};

function previousSlide(n) {
    hideSlide('to-right');
    changeCurrentSlide(n - 1);
    showSlide('from-left');
};

ARROW_LEFT.addEventListener('click', function() {
    if(isEnabled){
        previousSlide(currentSlide);
    }
});

ARROW_RIGHT.addEventListener('click', function() {
    if(isEnabled){
        nextSlide(currentSlide);
    }
});

// Screen ______________________________________________________________________________________________________________________

iphoneVertical.addEventListener('click', function() {
    screenVertical.classList.toggle('opacity');
});

iphoneHorizontal.addEventListener('click', function() {
    screenHorizontal.classList.toggle('opacity');
});

// Portfolio ________________________________________________________________________________________________________________

let pictures = listPortfolio.querySelectorAll('li');
let randoms = [];

portfolioFilter.addEventListener('click', (ev) => {
    portfolioFilter.querySelectorAll('button').forEach(el => el.classList.remove('filter-active'));
    ev.target.classList.add('filter-active');
    randoms = shuffleArray(arrIndexes());
    mixPictures();
});

listPortfolio.addEventListener('click', (ev) => {
    listPortfolio.querySelectorAll('.project-item').forEach(element => element.classList.remove('focus'));
    ev.target.classList.add('focus');
});

function arrIndexes() {
    let arrIndexes = Array.from(listPortfolio.querySelectorAll('li')).map((item, index, arr) => arr.indexOf(item));
    return arrIndexes;
};

function mixPictures() {
    pictures.forEach((item, index) => {
        item.style.order = randoms[index];
    })
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Forms __________________________________________________________________________________________________

    BTN.addEventListener('click', (event) => {
        const subject = document.getElementById('subject').value.toString();
        const description = document.getElementById('description').value.toString();
        event.preventDefault();

        FORM.addEventListener('click', (event) => {
            event.preventDefault();
        });

        if(FORM.checkValidity()){
            if(subject){
                document.getElementById('text-subject').innerText = `Тема: ${subject}`;
            }else{
                document.getElementById('text-subject').innerText = 'Без темы';
            }
        
            if(description){
                document.getElementById('text-description').innerText = `Описание: ${description}`;
            }else{
                document.getElementById('text-description').innerText = 'Без описания';
            }
        
            document.getElementById('message-block').classList.remove('hidden');
        }else{
            alert('Проверте правильность введённых данных!');
        }

    });
    
CLOSE_BTN.addEventListener('click', () => {
    document.getElementById('text-subject').innerText = '';
    document.getElementById('text-description').innerText = '';
    document.getElementById('message-block').classList.add('hidden');
    FORM.reset();
});

// Burger-menu ____________________________________________________________

let burgerMenu = document.querySelector('.header-navigation');
let headerFlex = document.querySelector('.header-flex');
let head = document.querySelector('.header');
let logo = document.querySelector('.header-logo');
let main = document.getElementById('main');
burgerMenu.onclick = function() {
    head.classList.toggle('open');
    burgerMenu.classList.toggle('open');
    MENU.classList.toggle('open');
    main.classList.toggle('open');
    headerFlex.classList.toggle('open');
    logo.classList.toggle('open');
  };