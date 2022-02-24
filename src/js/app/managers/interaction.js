import * as THREE from 'three';
import Keyboard from '../../utils/keyboard';
import Helpers from '../../utils/helpers';
import Config from '../../data/config';

const pointer = new THREE.Vector2();
const point = new THREE.Vector3();
const groundPlane = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 );

// Manages all input interactions
export default class Interaction {
  constructor(renderer, scene, camera, controls, furnitureFactory) {
    // Properties
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.furnitureFactory = furnitureFactory;

    this.timeout = null;

    // Instantiate keyboard helper
    this.keyboard = new Keyboard();

    // Listeners
    // Mouse events
    this.renderer.domElement.addEventListener('mousemove', (event) => Helpers.throttle(this.onMouseMove(event), 250), false);
    this.renderer.domElement.addEventListener('mouseleave', (event) => this.onMouseLeave(event), false);
    this.renderer.domElement.addEventListener('mouseover', (event) => this.onMouseOver(event), false);

    this.raycaster = new THREE.Raycaster();
    this.renderer.domElement.addEventListener('pointerdown', (event) => this.onPointerDown(event), false);

    // Keyboard events
    this.keyboard.domElement.addEventListener('keydown', (event) => {
      // Only once
      if(event.repeat) {
        return;
      }

      if(this.keyboard.eventMatches(event, 'escape')) {
        console.log('Escape pressed');
      }
    });
  }

  onMouseOver(event) {
    event.preventDefault();

    Config.isMouseOver = true;
  }

  onMouseLeave(event) {
    event.preventDefault();

    Config.isMouseOver = false;
  }

  onMouseMove(event) {
    event.preventDefault();

    clearTimeout(this.timeout);

    this.timeout = setTimeout(function() {
      Config.isMouseMoving = false;
    }, 200);

    Config.isMouseMoving = true;
  }

  onPointerDown(event) {
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this.raycaster.setFromCamera(pointer, this.camera)
    this.raycaster.ray.intersectPlane(groundPlane, point);
    this.furnitureFactory.add(point);
  }
}
