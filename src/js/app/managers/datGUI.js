import Config from '../../data/config';

// Manages all dat.GUI interactions
export default class DatGUI {
  constructor(stack) {
    this.gui = new dat.GUI();
    this.stack = stack
  }

  load() {
    this.gui.add(Config.model, 'type', [...Config.model.initialTypes]).name('Select Model')
    this.gui.add( { Remove: () => this.stack.pop() }, 'Remove' )
    this.gui.add( { RemoveAll: () => this.stack.clear() }, 'RemoveAll' ).name('Remove All')

    this.gui.add( { rotate: () => this.stack.rotate() }, 'rotate' ).name('Rotate')

    this.gui.add( { up: () => this.stack.up() }, 'up' ).name('Up')
    this.gui.add( { down: () => this.stack.down() }, 'down' ).name('Down')
    this.gui.add( { left: () => this.stack.left() }, 'left' ).name('Left')
    this.gui.add( { right: () => this.stack.right() }, 'right' ).name('Right')
  }

  unload() {
    this.gui.destroy();
    this.gui = new dat.GUI();
  }
}
