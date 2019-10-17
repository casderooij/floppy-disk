interface Options {
	threshold: number;
	dotNav: boolean;
}

export const slider = (sliderItems: any, options: Options) => {
	const slides = sliderItems.getElementsByClassName('slide');
	slides[0].classList.add('active');
	sliderItems.style.width = `${slides.length * 100}vw`;

	const slideSize = window.innerWidth;

	options.threshold = options.threshold === undefined ? 10 : options.threshold;

	let active = false;
	let shift = false;
	let pos1: any;
	let pos2;
	let posDelta: any;
	let newPos;
	let lastPos = 0;
	let index = 0;

	// Create dot navigation
	const nav = document.createElement('nav');
	nav.classList.add('slide-nav');
	const dot = document.createElement('i');
	dot.classList.add('slide-nav__dot');
	for (let i = 0; i < slides.length; i++) {
		nav.appendChild(dot.cloneNode(true));
	}
	sliderItems.parentElement.appendChild(nav);
	nav.children[0].classList.add('active');
	const navDots = nav.getElementsByClassName('slide-nav__dot');
	for (let i = 0; i < navDots.length; i++) {
		navDots[i].addEventListener('click', () => {
			easyShift(i);
		});
	}

	if (!options.dotNav) {
		nav.style.display = 'none';
	}

	sliderItems.addEventListener('mousedown', (e: MouseEvent) => {
		e.preventDefault();
		shift = false;
		active = true;
		pos1 = e.clientX;
		sliderItems.classList.add('active');
	});

	sliderItems.addEventListener('mousemove', (e: MouseEvent) => {
		if (!active) return;
		pos2 = e.clientX;
		posDelta = pos2 - pos1;
		if (shift) {
			shiftSlide(posDelta);
		}
		newPos = lastPos + posDelta;
		sliderItems.style.transform = `translateX(${newPos}px)`;
	});

	sliderItems.addEventListener('mouseup', () => {
		active = false;
		shiftSlide(posDelta);
		shifting(true);
		sliderItems.classList.remove('active');
	});

	sliderItems.addEventListener('transitionend', () => {
		shifting(false);
	});

	const shiftSlide = (dir: any) => {
		const lastIndex = index;
		if (index === 0 && dir > 0) {
			sliderItems.style.transform = `translateX(${lastPos}px)`;
		} else if (index === slides.length - 1 && dir < 0) {
			sliderItems.style.transform = `translateX(${lastPos}px)`;
		} else if (dir < -options.threshold) {
			lastPos = lastPos - slideSize;
			sliderItems.style.transform = `translateX(${lastPos}px)`;
			index++;
		} else if (dir > options.threshold) {
			lastPos = lastPos + slideSize;
			sliderItems.style.transform = `translateX(${lastPos}px)`;
			index--;
		} else {
			sliderItems.style.transform = `translateX(${lastPos}px)`;
		}
		slides[lastIndex].classList.remove('active');
		slides[index].classList.add('active');
		nav.children[lastIndex].classList.remove('active');
		nav.children[index].classList.add('active');
	};

	const easyShift = (nextIndex: any) => {
		lastPos = -(slideSize * nextIndex);
		sliderItems.style.transform = `translateX(${lastPos}px)`;
		const lastIndex = index;
		index = nextIndex;
		slides[lastIndex].classList.remove('active');
		slides[index].classList.add('active');
		nav.children[lastIndex].classList.remove('active');
		nav.children[index].classList.add('active');
		shifting(true);
	};

	const shifting = (doShift: any) => {
		if (doShift) {
			sliderItems.classList.add('shifting');
			shift = true;
		} else {
			sliderItems.classList.remove('shifting');
			shift = false;
		}
	};
};
