const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')

imagemin(['images/*.{png,jpg}'], {
	destination: 'images',
	plugins: [
		imageminWebp({ quality: 100 })
	]
})