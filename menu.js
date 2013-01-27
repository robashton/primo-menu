var _ = require('underscore')
var MenuConfiguration = require('./menuconfiguration')

var Menu = function(engine) {
  this.engine = engine
  this.screens = {}
  this.activeScreen = null
  this.font = '48px sans-serif'
  this.defaultColour = '#F00'
  this.width = 100
  this.height = 100
  this.render = _.bind(this.render, this)
  this.onKeyDown = _.bind(this.onKeyDown, this)
}

Menu.prototype = {
  configure: function() {
    return new MenuConfiguration(this)
  },
  show: function(screenid) {
    this.setActiveScreen(screenid)
    this.engine.on('render', this.render)
    this.engine.input.on('keydown', this.onKeyDown)
    return this
  },
  hide: function() {
    this.engine.off('render', this.render)
    this.engine.input.off('keydown', this.onKeyDown)
  },
  setActiveScreen: function(screenid) {
    this.activeScreen = this.screens[screenid]
    this.activeScreen.selectIndex(0)
  },
  onKeyDown: function(key) {
    if(key === this.engine.input.UP_ARROW)
      this.activeScreen.decreaseIndex()
    else if(key === this.engine.input.DOWN_ARROW)
      this.activeScreen.increaseIndex()
    else if(key === this.engine.input.RETURN)
      this.executeCurrentOption(this.activeScreen.getCurrentOption())
  },
  executeCurrentOption: function(option) {
    if(_.isFunction(option)) 
      option()
    else if(_.isString(option))
      this.setActiveScreen(option)
  },
  render: function(context) {
    context.save()
    context.setTransform(1,0,0,1,0,0)
    context.scale(context.canvas.width / this.width, context.canvas.height / this.height)
    this.activeScreen.render(context)
    context.restore()
  }
}


module.exports = Menu
