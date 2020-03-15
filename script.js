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
    if(screenHorizontal.classList.contains('opacity')){
        screenHorizontal.classList.remove('opacity');
    }else{
        screenHorizontal.classList.add('opacity');
    }
});