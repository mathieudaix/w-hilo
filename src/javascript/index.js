import '../scss/index.scss'

import gsap from 'gsap'

// navigation
const menu = gsap.timeline({ paused: true, reversed: true, defaults: { duration: 0.6, ease: 'power4.inOut' } })

menu.set(document.body, { overflow: 'hidden' })
menu.to(document.querySelector('.nav__icon span:first-of-type'), { translateY: 3.5, rotate: -45 }, 0)
menu.to(document.querySelector('.nav__icon span:last-of-type'), { translateY: -3.5, rotate: 45 }, 0)
menu.to(document.querySelector('.nav__menu'), { autoAlpha: 1 }, 0)

document.querySelector('.nav__icon').addEventListener('click', () => {
	menu.reversed() ? menu.play() : menu.reverse()
})

// dashboard slide toggle
document.querySelectorAll('.news__card').forEach(element => {
	element.addEventListener('click', () => {
		const content = element.querySelector('.news__card__content')
		const icon = element.querySelector('.news__card__title img')
		if (element.classList.contains('close')) {
			gsap.to(content, { height: 'auto', duration: 0.2, ease: 'power4.inOut' })
			gsap.to(icon, { rotate: 0, duration: 0.2, ease: 'power4.inOut' })
			element.classList.remove('close')
		} else {
			gsap.set(content, { height: 'auto' })
			gsap.to(icon, { rotate: 180, duration: 0.2, ease: 'power4.inOut' })
			gsap.to(content, { height: 0, duration: 0.2, ease: 'power4.inOut' })
			element.classList.add('close')
		}
	})
})