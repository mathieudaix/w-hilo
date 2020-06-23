# Neptune

Front-end boilerplate for web projects.

## Table of contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Images](#images)
4. [Webpack](#webpack)
5. [Stylesheet](#stylesheet)
6. [Fonts](#fonts)
7. [Javascript](#javascript)
8. [Templating](#templating)

## Installation

```shell script
npm i
```

## Usage

```shell script
# Run the development server (open a new page with hot reload)
npm run dev

# Build productions files (update the dist folder)
npm run prod 
```

## Images

### Convert to multiples sizes

You can define new images sizes and their suffixes by modifying or adding lines in table size. Images must be in the folder `images/resize`.

`sharp.config.js`

```javascript
// ...
const sizes = [
    {name: 'small', size: 500},
    {name: 'medium', size: 1000},
    {name: 'large', size: 1500}
]
// ...
```

### Convert to webp

To convert all images in .webp, you just need to run one command. Images must be in the folder `images`.

```shell script
npm run img
```

## Webpack

If you have more than one page in your website, you need to update the `webpack.config.js` file. First, create your files in `src` with `.ejs` in extension. When you update the `webpack.config.js`, you always need to reload the development server.

```javascript
// ...
...['your-page', 'your-page2'].map(el => {
    return new HtmlWebpackPlugin({
        template: `./src/${el}.ejs`,
        filename: `${el}.html`,
        // ...
    })
})
// ...
```

## Stylesheet

This boilerplate use scss and BEM syntax. You find all styles in `src/scss`. The scss files uses the 7-1 pattern structure. All basics files are already created, if you need to add a file, go to `src/scss/pages` and create your file like this `_your-page.scss`. To import your files, go to `src/scss/index.scss`.

```scss
// ...
@import './pages/your-page';
``` 

## Fonts

You need to upload your fonts in `src/fonts` and load them in `src/scss/elements/_fonts.scss`.

```scss
// ...
@font-face {
    font-family: 'rubik-light';
    src: url('../fonts/Rubik-Light.eot'), url('../fonts/Rubik-Light.woff') format('woff'), url('../fonts/Rubik-Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}
// ...
``` 

## Javascript

This boilerplate comes with [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll) and [Gsap](https://github.com/greensock/GSAP). If you need to add a specific javacript code, you can create new files in `src/javascript` and import them in `src/javascript/index.js`.

`src/javascript/feature.js`
```javascript
// ...
export default function feature() {
    // ...
}
// ...
```

`src/javascript/index.js`
```javascript
// ...
import feature from './feature'
// ...
```

## Templating

You can find all templating file in `src/template`. By default, there's only `header.ejs` and `footer.ejs`. You can add your file in this folder and load them next.

```ejs
<!-- simple require -->
<%= require('./template/template.ejs')() %>

<!-- with variables -->
<%= require('./template/template.ejs')({
    name: 'Lorem ipsum',
    className: 'active'
}) %>

<!-- display variables -->
<%= name %>
<%= className %>
```