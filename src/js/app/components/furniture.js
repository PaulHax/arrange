import * as THREE from 'three';

const BOX_SIZE = 20;

const CYLINDER_RADIUS = 5;
const CYLINDER_HEIGHT = 10;

export default class Furniture {
  constructor(scene, type) {
    this.scene = scene;
    this.ref = null;

    this.load(type);
  }

  load(type) {
    // Manager is passed in to loader to determine when loading done in main

    if(type === 'box') {
        const geometry = new THREE.BoxGeometry( BOX_SIZE, BOX_SIZE, BOX_SIZE );
        const material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );
        this.ref = cube;
    } else if(type === 'cylinder') {
        const geometry = new THREE.CylinderGeometry( CYLINDER_RADIUS, CYLINDER_RADIUS, CYLINDER_HEIGHT, 16 );
        const material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
        const cylander = new THREE.Mesh( geometry, material );
        this.scene.add( cylander );
        this.ref = cylander;
    }
  }

  unload() {
    this.scene.remove(this.ref);
  }
}
