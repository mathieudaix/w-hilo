import '../scss/index.scss'

import gsap from 'gsap'

const menu = gsap.timeline({ paused: true, reversed: true, defaults: { duration: 0.6, ease: 'power4.inOut' } })

menu.set(document.body, { overflow: 'hidden' })
menu.to(document.querySelector('.nav__menu'), { autoAlpha: 1 })

document.querySelector('.nav__icon').addEventListener('click', () => {
	menu.reversed() ? menu.play() : menu.reverse()
})