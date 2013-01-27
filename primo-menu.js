var Menu = require('./menu')

module.exports = {
  define: function(engine) {
    return new Menu(engine)
  }
}
