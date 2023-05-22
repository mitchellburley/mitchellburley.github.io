import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

export class Background extends Component {
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 30000 );
  container = document.getElementById( 'container' );
	renderer = new THREE.WebGLRenderer();
	scene = new THREE.Scene();
	waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );
	water = new Water(
		this.waterGeometry,
		{
			textureWidth: 512,
			textureHeight: 512,
			waterNormals: new THREE.TextureLoader().load( 'assets/textures/waternormals.jpg', function ( texture ) {

				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

			} ),
			alpha: 1.0,
			sunDirection: new THREE.Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 3.7,
			fog: this.scene.fog !== undefined,
		}
	);
	sky = new Sky();
	sun = new THREE.Vector3();
	geometry = new THREE.BoxGeometry( 30, 30, 30 );
	material = new THREE.MeshStandardMaterial( { roughness: 0 } );
	mesh = new THREE.Mesh( this.geometry, this.material );
	controls = new OrbitControls( this.camera, this.renderer.domElement );
	pmremGenerator = new THREE.PMREMGenerator( this.renderer );

  static propTypes = {
    
  }

  async componentDidMount() {
    this.init();
    this.animate();
  }

  init() {
    this.container = document.getElementById( 'container' );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.container?.appendChild( this.renderer.domElement );
  
    this.camera.position.set(-15000, 0, -15000);
  
    // Add water
    this.water.rotation.x = - Math.PI / 2;
    this.scene.add( this.water );
  
    // Add skybox
    let skyboxImage = ""
    const materialArray = createMaterialArray(skyboxImage);
    var skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    var skybox = new THREE.Mesh(skyboxGeo, materialArray);
    this.scene.add(skybox);
   
    function createPathStrings(filename: any) {
      const basePath = "assets/skybox/";
      const baseFilename = basePath + filename;
      const fileType = ".jpg";
      const sides = ["nz", "pz", "py", "ny", "px", "nx"];
      const pathStings = sides.map(side => {
        return baseFilename + side + fileType;
      });
      return pathStings;
      }
    
      
    function createMaterialArray(filename: any) {
    const skyboxImagepaths = createPathStrings(filename);
    const materialArray = skyboxImagepaths.map(image => {
      let texture = new THREE.TextureLoader().load(image);
      return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    });
    return materialArray;
    }
  
    this.sky.scale.setScalar( 10000 );
    this.scene.add( this.sky );
  
    var skyUniforms = this.sky.material.uniforms as any;
  
    skyUniforms[ 'turbidity' ].value = 10;
    skyUniforms[ 'rayleigh' ].value = 2;
    skyUniforms[ 'mieCoefficient' ].value = 0.005;
    skyUniforms[ 'mieDirectionalG' ].value = 0.8;
  
    this.updateSun();
  
    // Add controls
    this.controls.enabled = false;
    this.controls.maxPolarAngle = Math.PI * 0.495;
    this.controls.target.set( 0, 10, 0 );
    this.controls.minDistance = 40.0;
    this.controls.maxDistance = 40.0;
    this.controls.update();
  
  
    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
  }

    updateSun() {
      var parameters = {
        inclination: 0.7,
        azimuth: 0.3
      };
      var theta = Math.PI * ( parameters.inclination - 0.5 );
      var phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );
  
      this.sun.x = Math.cos( phi );
      this.sun.y = Math.sin( phi ) * Math.sin( theta );
      this.sun.z = Math.sin( phi ) * Math.cos( theta );
  
      this.sky.material.uniforms[ 'sunPosition' ].value.copy( this.sun );
      this.water.material.uniforms[ 'sunDirection' ].value.copy( this.sun ).normalize();
  
      this.scene.environment = this.pmremGenerator.fromScene( this.sky as any ).texture;
  
    }
    
	onWindowResize() {

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

	}

	animate() {
		requestAnimationFrame( this.animate.bind(this) );
		this.renderAnimation();

	}

	renderAnimation() {
    var time = performance.now() * 0.001;

    this.mesh.position.y = Math.sin( time ) * 20 + 5;
    this.mesh.rotation.x = time * 0.5;
    this.mesh.rotation.z = time * 0.51;

    this.water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

    this.renderer.render( this.scene, this.camera );
    console.log(this.renderer);
    console.log(this.scene);
	}

  render() {
    return (
      <div>
        <div id="container">
        </div>
      </div>
    )
  }
}

export default Background