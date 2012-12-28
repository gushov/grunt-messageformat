# grunt-messageformat

messageformat.js's command line tool ported to a grunt plugin

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-messageformat`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-messageformat');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Example
In your InitConfig object

```javascript
// Project configuration.
grunt.initConfig({
  //...
  messageformat: {
    en: {
      locale: 'en',
      inputdir: './static/messages/en',
      output: './locales/en/i18n.js'
    },
    de: {
      locale: 'de',
      inputdir: './static/messages/de',
      output: './public/locales/de/i18n.js'
    }
  }
  //...
}
```

## License
Copyright (c) 2012 Gus Hovland  
Licensed under the MIT license.
