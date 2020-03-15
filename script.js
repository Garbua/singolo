const MENU = document.getElementById('menu');

const ARROW_LEFT = document.querySelector('.arrow-left');
const ARROW_RIGHT = document.querySelector('.arrow-right');
let sliders = document.querySelectorAll('.carousel .slide');
let currentSlide = 0;
let isEnabled = true;

let screenVertical = document.querySelector('.non-screen.vertical');
let screenHorizontal = document.querySelector('.non-screen.horizontal');
let iphoneVertical = document.querySelector('.phone-vert');
let iphoneHorizontal = document.querySelector('.phone-horz');

let portfolioFilter = document.getElementById('filters-btn');
let listPortfolio = document.getElementById('portfolio-list');
let portfolioRandom = [];

const BTN = document.getElementById('submit-btn');
const CLOSE_BTN = document.getElementById('close-btn');
const FORM = document.getElementById('form');

// Navigation

MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
});

// Sliders

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

// Screen

iphoneVertical.addEventListener('click', function() {
    if(screenVertical.classList.contains('opacity')){
        screenVertical.classList.remove('opacity');
    }else{
        screenVertical.classList.add('opacity');
    }
});

iphoneHorizontal.addEventListener('click', function() {
    // if(screenHorizontal.classList.contains('opacity')){
    //     screenHorizontal.classList.remove('opacity');
    // }else{
    //     screenHorizontal.classList.add('opacity');
    // }
    screenHorizontal.classList.toggle('opacity');
    
});

// Portfolio

portfolioFilter.addEventListener('click', (ev) => {
    portfolioFilter.querySelectorAll('button').forEach(el => el.classList.remove('filter-active'));
    ev.target.classList.add('filter-active');
});

listPortfolio.addEventListener('click', (ev) => {
    listPortfolio.querySelectorAll('li.project-item').forEach(element => element.classList.remove('focus'));
    ev.target.classList.add('focus');
});

// Forms

    BTN.addEventListener('click', (event) => {

        FORM.addEventListener('click', (event) => {
            event.preventDefault();
        });

        const subject = document.getElementById('subject').value.toString();
        const description = document.getElementById('description').value.toString();

        event.preventDefault();

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
});