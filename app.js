var blog = require('./index.js');

var navbar = {
  navbar: [
    {
      title: 'Github',
      path: 'https://github.com/aortmannm'
    },
    {
      title: 'Google+',
      path: 'http://google.com/+AdrianOrtmann'
    }
  ]
};

var transport = {
  host: 'smtp.strato.de',
  secureConnection: true,
  port: 465,
  auth: {
    user: 'blog@blog.ronny5.de',
    pass: '123456'
  },
  mailReceiver: 'adrian.ortmann@online.de'
};

blog.start(navbar, transport);