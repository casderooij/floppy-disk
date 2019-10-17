"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slider = function (sliderItems, options) {
    var slides = sliderItems.getElementsByClassName('slide');
    slides[0].classList.add('active');
    sliderItems.style.width = slides.length * 100 + "vw";
    var slideSize = window.innerWidth;
    options.threshold = options.threshold === undefined ? 10 : options.threshold;
    var active = false;
    var shift = false;
    var pos1;
    var pos2;
    var posDelta;
    var newPos;
    var lastPos = 0;
    var index = 0;
    // Create dot navigation
    var nav = document.createElement('nav');
    nav.classList.add('slide-nav');
    var dot = document.createElement('i');
    dot.classList.add('slide-nav__dot');
    for (var i = 0; i < slides.length; i++) {
        nav.appendChild(dot.cloneNode(true));
    }
    sliderItems.parentElement.appendChild(nav);
    nav.children[0].classList.add('active');
    var navDots = nav.getElementsByClassName('slide-nav__dot');
    var _loop_1 = function (i) {
        navDots[i].addEventListener('click', function () {
            easyShift(i);
        });
    };
    for (var i = 0; i < navDots.length; i++) {
        _loop_1(i);
    }
    if (!options.dotNav) {
        nav.style.display = 'none';
    }
    sliderItems.addEventListener('mousedown', function (e) {
        e.preventDefault();
        shift = false;
        active = true;
        pos1 = e.clientX;
        sliderItems.classList.add('active');
    });
    sliderItems.addEventListener('mousemove', function (e) {
        if (!active)
            return;
        pos2 = e.clientX;
        posDelta = pos2 - pos1;
        if (shift) {
            shiftSlide(posDelta);
        }
        newPos = lastPos + posDelta;
        sliderItems.style.transform = "translateX(" + newPos + "px)";
    });
    sliderItems.addEventListener('mouseup', function () {
        active = false;
        shiftSlide(posDelta);
        shifting(true);
        sliderItems.classList.remove('active');
    });
    sliderItems.addEventListener('transitionend', function () {
        shifting(false);
    });
    var shiftSlide = function (dir) {
        var lastIndex = index;
        if (index === 0 && dir > 0) {
            sliderItems.style.transform = "translateX(" + lastPos + "px)";
        }
        else if (index === slides.length - 1 && dir < 0) {
            sliderItems.style.transform = "translateX(" + lastPos + "px)";
        }
        else if (dir < -options.threshold) {
            lastPos = lastPos - slideSize;
            sliderItems.style.transform = "translateX(" + lastPos + "px)";
            index++;
        }
        else if (dir > options.threshold) {
            lastPos = lastPos + slideSize;
            sliderItems.style.transform = "translateX(" + lastPos + "px)";
            index--;
        }
        else {
            sliderItems.style.transform = "translateX(" + lastPos + "px)";
        }
        slides[lastIndex].classList.remove('active');
        slides[index].classList.add('active');
        nav.children[lastIndex].classList.remove('active');
        nav.children[index].classList.add('active');
    };
    var easyShift = function (nextIndex) {
        lastPos = -(slideSize * nextIndex);
        sliderItems.style.transform = "translateX(" + lastPos + "px)";
        var lastIndex = index;
        index = nextIndex;
        slides[lastIndex].classList.remove('active');
        slides[index].classList.add('active');
        nav.children[lastIndex].classList.remove('active');
        nav.children[index].classList.add('active');
        shifting(true);
    };
    var shifting = function (doShift) {
        if (doShift) {
            sliderItems.classList.add('shifting');
            shift = true;
        }
        else {
            sliderItems.classList.remove('shifting');
            shift = false;
        }
    };
};
exports.default = slider;
