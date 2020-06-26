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

document.querySelectorAll('.choice__card').forEach(element => {
	element.addEventListener('click', item => {
		document.querySelector('.choice__title__filtre a').textContent = 'Attribuer à ' + item.currentTarget.querySelector('h2').innerHTML
		document.querySelector('.choice__title__filtre a').classList.add('btn--full--green')
		item.currentTarget.style.backgroundColor = '#17e8c3'
	})
})


import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

if (document.querySelector('.page-home') || document.querySelector('.page-projet-rendu')) {

	const
		colors = [
			{
				texture: '../../images/wood_.jpg',
				size: [2, 2, 2],
				shininess: 60
			},

			{
				texture: '../../images/fabric_.jpg',
				size: [4, 4, 4],
				shininess: 0
			},

			{
				texture: '../../images/pattern_.jpg',
				size: [8, 8, 8],
				shininess: 10
			},

			{
				texture: '../../images/denim_.jpg',
				size: [3, 3, 3],
				shininess: 0
			},

			{
				texture: '../../images/quilt_.jpg',
				size: [6, 6, 6],
				shininess: 0
			},

			{
				color: 'ffffff'
			},

			{
				color: '0f62fe'
			},

			{
				color: '393939'
			},

			{
				color: 'da1e28'
			},

			{
				color: '97a1a7'
			},

			{
				color: 'acb4b9'
			}
		],
		BACKGROUND_COLOR = 0xf1f1f1,
		scene = new THREE.Scene(),
		canvas = document.getElementById('model'),
		renderer = new THREE.WebGLRenderer({ canvas }),
		camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000),
		INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 }),
		INITIAL_MAP = [
			{ childID: "back", mtl: INITIAL_MTL },
			{ childID: "base", mtl: INITIAL_MTL },
			{ childID: "cushions", mtl: INITIAL_MTL },
			{ childID: "legs", mtl: INITIAL_MTL },
			{ childID: "supports", mtl: INITIAL_MTL }
		],
		hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61),
		dirLight = new THREE.DirectionalLight(0xffffff, 0.54),
		floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1),
		floorMaterial = new THREE.MeshPhongMaterial({ color: 0xeeeeee }),
		floor = new THREE.Mesh(floorGeometry, floorMaterial),
		controls = new OrbitControls(camera, renderer.domElement),
		options = document.getElementById('options').children,
		swatches = document.getElementsByClassName('tray__swatch')

	let
		theModel,
		activeOption = 'legs',
		loaded = false

	scene.background = new THREE.Color(BACKGROUND_COLOR)
	scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100)

	renderer.shadowMap.enabled = true
	renderer.setPixelRatio(window.devicePixelRatio)

	document.body.appendChild(renderer.domElement)

	camera.position.z = 5
	camera.position.x = 0

	new GLTFLoader().load('../../images/chair.glb', gltf => {
		theModel = gltf.scene

		theModel.traverse(o => {
			if (o.isMesh) {
				o.castShadow = true
				o.receiveShadow = true
			}
		})

		theModel.scale.set(0.6, 0.6, 0.6)
		theModel.rotation.y = Math.PI
		theModel.position.y = -1

		INITIAL_MAP.forEach(({ childID, mtl }) => initColor(theModel, childID, mtl))

		scene.add(theModel)

	}, undefined, error => console.error(error))

	function initColor(parent, type, mtl) {
		parent.traverse(o => {
			if (o.isMesh) {
				if (o.name.includes(type)) {
					o.material = mtl
					o.nameID = type
				}
			}
		})
	}

	hemiLight.position.set(0, 50, 0)
	scene.add(hemiLight)

	dirLight.position.set(-8, 12, 8)
	dirLight.castShadow = true
	dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
	scene.add(dirLight)

	floor.rotation.x = -0.5 * Math.PI
	floor.receiveShadow = true
	floor.position.y = -1
	scene.add(floor)

	controls.maxPolarAngle = Math.PI / 2
	controls.minPolarAngle = Math.PI / 3
	controls.enableDamping = true
	controls.enablePan = false
	controls.dampingFactor = 0.1
	controls.autoRotate = false
	controls.autoRotateSpeed = 0.2

	function initialRotationClosure() {
		let rotate = 0
		function initRotate() {
			rotate++
			rotate <= 120 ? theModel.rotation.y += Math.PI / 60 : loaded = true
			return rotate
		}
		return initRotate
	}

	const initialRotation = initialRotationClosure()

	function animate() {

		controls.update()
		renderer.render(scene, camera)
		requestAnimationFrame(animate)

		if (resizeRendererToDisplaySize(renderer)) {
			const canvas = document.querySelector('.modele__right').appendChild(renderer.domElement)
			camera.aspect = canvas.clientWidth / canvas.clientHeight
			camera.updateProjectionMatrix()
		}

		if (theModel && loaded === false) {
			initialRotation()
			document.getElementById('js-drag-notice').classList.add('start')
		}
	}
	animate()


	function resizeRendererToDisplaySize(renderer) {
		const
			canvas = document.querySelector('.modele__right').appendChild(renderer.domElement),
			{ innerWidth: width, innerHeight: height, devicePixelRatio } = window,
			needResize = canvas.width / devicePixelRatio !== width || canvas.height / devicePixelRatio !== height

		if (needResize)
			renderer.setSize(width, height, false)

		return needResize
	}

	function buildColors(colors) {
		Object.values(colors).forEach(({ texture, color }, i) => {
			const swatch = document.createElement('div')
			swatch.classList.add('tray__swatch')

			swatch.style.background = texture ? `url(${texture})` : `#${color}`

			swatch.setAttribute('data-key', i)
			document.getElementById('js-tray-slide').append(swatch)
		})
	}
	buildColors(colors)


	Array.from(options).forEach(option => option.addEventListener('click', selectOption))

	function selectOption({ target }) {
		Array.from(options).forEach(option => option.classList.remove('--is-active'))
		activeOption = target.dataset.option
		target.classList.add('--is-active')
	}


	Array.from(swatches).forEach(swatch => swatch.addEventListener('click', selectSwatch))

	function selectSwatch({ target }) {
		const color = colors[parseInt(target.dataset.key)]
		let texture

		if (color.texture) {
			texture = new THREE.TextureLoader().load(color.texture)
			texture.repeat.set(color.size[0], color.size[1], color.size[2])
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping
		}

		const new_mtl = new THREE.MeshPhongMaterial({
			map: color.texture ? texture : null,
			color: color.texture ? null : parseInt('0x' + color.color),
			shininess: color.shininess ? color.shininess : 10
		})

		setMaterial(theModel, activeOption, new_mtl)
	}

	function setMaterial(parent, type, mtl) {
		parent.traverse(o => {
			if (o.isMesh && o.nameID) {
				if (o.nameID === type)
					o.material = mtl
			}
		})
	}

}
