(async () => {

	const sharp = require('sharp')
	const fs = require('fs')

	const directoryFrom = 'images/resize'
	const directoryTo = 'images'

	const sizes = [
		{ name: 'small', size: 500 },
		{ name: 'medium', size: 700 },
		{ name: 'large', size: 1000 }
	]

	await fs.readdir(directoryFrom, function (err, list) {
		list.forEach(function (file) {
			if (!/^\..*/.test(file)) {

				const filename = file.split('.').slice(0, -1)
				const extension = file.split('.').pop()

				for (let i = 0; i < sizes.length; i++) {

					const name = sizes[i].name
					const size = sizes[i].size

					if (extension === 'jpg') {
						sharp(`${directoryFrom}/${file}`)
							.resize({ width: size })
							.jpeg({ quality: 100, progressive: true })
							.toFile(`${directoryTo}/${filename}-${name}.${extension}`)
					}

					if (extension === 'png') {
						sharp(`${directoryFrom}/${file}`)
							.resize({ width: size })
							.png({ quality: 100, progressive: true })
							.toFile(`${directoryTo}/${filename}-${name}.${extension}`)
					}

				}
			}
		})
	});

})().catch((err => console.error((err.stack))))