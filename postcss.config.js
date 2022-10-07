const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano')();
const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
        'public/**/*.html',
        './src/**/*.vue',
        './src/**/*.js',
        // '**/*.php',
    ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});
module.exports = {
    plugins: [
        tailwindcss,
        autoprefixer,
        cssnano,
        purgecss
    ],
};
