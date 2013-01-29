var Menu = require('./menu')

module.exports = {
  init: function(engine) {
    if(!engine.ui) throw new Error("primo-ui is not loaded, this is required for primo-menu to work")
    engine.menu = new Menu(engine)
  }
}
