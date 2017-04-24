// Create a socket plugin
const socketIO = require('socket.io');
const extend = require('extend');

const server = require('server');
const { join } = server.router;

const listeners = {};

module.exports = {
  name: 'socket',
  options: {},
  router: (ctx, path, middle) => {
    listeners[path] = listeners[path] || [];
    listeners[path].push(middle);
  },
  launch: ctx => {
    ctx.io = socketIO(ctx.server);
    ctx.io.on('connect', socket => {
      for (name in listeners) {
        (name => {
          listeners[name].forEach(cb => {
            socket.on(name, data => {
              cb(extend({}, ctx, { path: name, socket: socket, data: data }));
            });
          });
        })(name);
      }
    });
  }
};
