import Furniture from "./furniture"
import Config from '../../data/config';
import * as THREE from 'three';

const ROTATION_AMOUNT = 45 // degrees
const MOVE_AMOUNT = 2

export default class FurnitureStack {
  constructor(scene, camera) {
      this.stack = []
      this.scene = scene
      this.camera = camera
  }

  add(point) {
      const furniture = new Furniture(this.scene, Config.model.type)
      furniture.ref.position.copy(point)
      this.push(furniture)      
  }

  push(furniture) {
      this.stack.push(furniture)
  }

  pop() {
    if(this.stack.length > 0) {
        this.stack[this.stack.length - 1].unload()
        this.stack.pop()
    }
  }

  clear() {
    while(this.stack.length > 0) {
        this.pop()
    }
  }

  rotate() {
    if(this.stack.length > 0) {
        const furniture = this.stack[this.stack.length - 1]
        furniture.ref.rotation.y += THREE.MathUtils.DEG2RAD * ROTATION_AMOUNT
    }
  }

  move(offset) {
    if(this.stack.length > 0) {
        const furniture = this.stack[this.stack.length - 1]
        offset.applyQuaternion(this.camera.threeCamera.quaternion)
        furniture.ref.position.add(offset)
    }
  }

  up() {
    this.move(new THREE.Vector3(0, MOVE_AMOUNT, 0))
  }

  down() {
    this.move(new THREE.Vector3(0, -MOVE_AMOUNT, 0))
  }

  left() {
    this.move(new THREE.Vector3(-MOVE_AMOUNT, 0, 0))
  }

  right() {
    this.move(new THREE.Vector3(MOVE_AMOUNT, 0, 0))
  }
}
