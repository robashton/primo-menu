var util = require('primo-utils')

var MenuScreen = function(menu) {
  this.options = []
  this.selectedOption = null
  this.selectedIndex = -1
  this.artifacts = []
  this.menu = menu
}

MenuScreen.prototype = {
  selectIndex: function(index) {
    this.selectedOption = this.options[index]
    this.selectedIndex = index
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
  getCurrentOption: function() {
    return this.selectedOption.action
  },
  render: function(context) {
    var i 
    for(i = 0 ; i < this.artifacts.length; i++)
      this.renderArtifact(context, this.artifacts[i])
    for(i = 0 ; i < this.options.length; i++) 
      this.renderOption(context, this.options[i])
  },
  renderArtifact: function(context, artifact) {
    context.fillStyle = util.valueOrDefault(artifact.colour, this.menu.defaultColour)
    context.font = util.valueOrDefault(artifact.font, this.menu.font)
    context.fillText(artifact.text, artifact.x, artifact.y)
  },
  renderOption: function(context, option) {
    context.fillStyle = util.valueOrDefault(option.colour, this.menu.defaultColour)
    context.font = util.valueOrDefault(option.font, this.menu.font)
    context.fillText(option.text, option.x, option.y)
    if(option === this.selectedOption) 
      this.drawSelectionTokenFor(context, option)
  },
  drawSelectionTokenFor: function(context, option) {
    context.fillStyle = '#F00'
    context.fillRect(option.x - 15, option.y - 20, 10, 10)
  }
}

module.exports = MenuScreen
