var blog = require('./index.js');

blog.start({
	navbar: [
    {
      title: 'Github',
      path: 'http://www.github.com'
    },
    {
      title: 'Google+',
      path: 'http://www.google.de'
    }
  ]
});