var Menu = require('./menu')

module.exports = {
  init: function(engine, configure) {
    engine.menu = new Menu(engine)
    configure(engine.menu.configure())
  }
}
