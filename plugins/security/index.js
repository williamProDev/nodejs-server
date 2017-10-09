const modern = require('../../src/modern');
const csurf = require('csurf');

module.exports = {
  name: 'security',
  options: {
    csrf: {
      default: {},
      type: Object
    }
  },
  before: [
    ctx => modern(csurf(ctx.options.security.csrf))(ctx),
    ctx => {
      // Set the csrf for render(): https://expressjs.com/en/api.html#res.locals
      ctx.csrf = ctx.req.csrfToken();
      ctx.res.locals.csrf = ctx.csrf;
    }
  ]
};
