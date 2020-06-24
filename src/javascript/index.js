import '../scss/index.scss'

import gsap from 'gsap'

const menu = gsap.timeline({ paused: true, reversed: true, defaults: { duration: 0.6, ease: 'power4.inOut' } })

menu.set(document.body, { overflow: 'hidden' })
menu.to(document.querySelector('.nav__icon span:first-of-type'), { translateY: 3.5, rotate: -45 }, 0)
menu.to(document.querySelector('.nav__icon span:last-of-type'), { translateY: -3.5, rotate: 45 }, 0)
menu.to(document.querySelector('.nav__menu'), { autoAlpha: 1 }, 0)

document.querySelector('.nav__icon').addEventListener('click', () => {
	menu.reversed() ? menu.play() : menu.reverse()
})