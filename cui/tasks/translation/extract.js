import fs from 'fs';
import gulp from 'gulp';

gulp.task('intl-extract', () => {
  /* eslint-disable */
  const through = require('through2');
  const babel = require('babel-core');
  /* eslint-enable */

  const messages = [];
  const getReactIntlMessages = code => babel.transform(code, {
    plugins: [
      'react-intl',
      'transform-runtime',
      'add-module-exports'
    ],
    presets: ['react', 'es2015', 'stage-1']
  }).metadata['react-intl'].messages;

  return gulp.src([
    'src/**/*.js'
  ])
  .pipe(through.obj((file, enc, cb) => {
    const code = file.contents.toString();
    messages.push(...getReactIntlMessages(code));
    cb(null, file);
  }))
  .on('end', () => {
    messages.sort((a, b) => a.id.localeCompare(b.id));
    const messagesObject = Object.assign(...messages.map(d => ({ [d.id]: d.defaultMessage })));
    const messagesString = JSON.stringify(messagesObject, null, 2)
                              .replace(/\n {2}\}/g, ',\n  }')
                              .replace(/\}\n\]/g, '},\n]');
    fs.writeFileSync('translations/source/en.js', `/* eslint-disable */\nexport default ${messagesString}`);
  });
});
