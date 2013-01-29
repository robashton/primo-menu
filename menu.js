var _ = require('underscore')
var ui = require('primo-ui')

var Menu = function(engine) {
  this.engine = engine
  this.items = []
  this.options = []
  this.selectedIndex = 0
  this.selectionToken = new ui.Rect({ x: 0, y: 0, width: 10, height: 10, colour: '#F00'})
  this.onKeyDown = _.bind(this.onKeyDown, this)
}

Menu.prototype = {
  addOption: function(option, action) {
    this.items.push(option)
    this.options.push(option)
    this.engine.ui.add(option)
    option.action = action
    if(this.options.length === 1) this.selectIndex(0)
    return this
  },
  addDisplay: function(display) {
    this.items.push(display)
    this.engine.ui.add(display)
    return this
  },
  show: function() {
    this.clear()
    this.engine.input.on('keydown', this.onKeyDown)
    this.selectedIndex = 0
    this.engine.ui.add(this.selectionToken)
    return this
  },
  hide: function() {
    this.clear()
    return this
  },
  clear: function() {
    this.engine.input.off('keydown', this.onKeyDown)
    for(var i = 0 ; i < this.items.length; i++)
      this.engine.ui.remove(this.items[i])
    this.items.length = 0
    this.options.length = 0
    this.engine.ui.remove(this.selectionToken)
    return this
  },
  onKeyDown: function(key) {
    if(key === this.engine.input.UP_ARROW)
      this.decreaseIndex()
    else if(key === this.engine.input.DOWN_ARROW)
      this.increaseIndex()
    else if(key === this.engine.input.RETURN)
      this.executeCurrentOption()
  },
  increaseIndex: function() {
    var index = this.selectedIndex+1
    if(index >= this.options.length)
      index = this.options.length-1
    this.selectIndex(index)
  },
  decreaseIndex: function() {
    var index = this.selectedIndex - 1
    if(index < 0) index = 0
    this.selectIndex(index)
  },
  selectIndex: function(index) {
    this.selectedIndex = index
    var option = this.options[this.selectedIndex]
    this.selectionToken.x = option.x - (option.height/2) - 10
    this.selectionToken.y = option.y + (option.height/2)
    this.selectionToken.width = option.height/2
    this.selectionToken.height = option.height/2
  },
  executeCurrentOption: function() {
    var option = this.options[this.selectedIndex]
    option.action()
  }
}


module.exports = Menu
