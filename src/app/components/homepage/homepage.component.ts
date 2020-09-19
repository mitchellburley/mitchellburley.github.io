import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var container, stats;
			var camera, scene, renderer;
			var controls, water, sun, mesh;

			init();
			animate();

			function init() {

				container = document.getElementById( 'container' );

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
				camera.position.set( 30, 30, 100 );

				//

				sun = new THREE.Vector3();

				// Water

				var waterGeometry = new THREE.PlaneBufferGeometry( 10000, 10000 );

				water = new Water(
					waterGeometry,
					{
						textureWidth: 512,
						textureHeight: 512,
						waterNormals: new THREE.TextureLoader().load( 'assets/textures/waternormals.jpg', function ( texture ) {

							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

						} ),
						alpha: 1.0,
						sunDirection: new THREE.Vector3(),
						sunColor: 0xffffff,
						waterColor: 0x16ADD8,
						distortionScale: 2,
						fog: scene.fog !== undefined
					}
        );

				water.rotation.x = - Math.PI / 2;

				scene.add( water );

				// Skybox

				var sky = new Sky();
				sky.scale.setScalar( 10000 );
				scene.add( sky );

				var uniforms = sky.material.uniforms as any;

				uniforms[ 'turbidity' ].value = 10;
				uniforms[ 'rayleigh' ].value = 2;
				uniforms[ 'mieCoefficient' ].value = 0.005;
				uniforms[ 'mieDirectionalG' ].value = 0.8;

				var parameters = {
					inclination: 0.49,
					azimuth: 0.3
				};

        var pmremGenerator = new THREE.PMREMGenerator( renderer );

				function updateSun() {

					var theta = Math.PI * ( parameters.inclination - 0.5 );
					var phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

					sun.x = Math.cos( phi );
					sun.y = Math.sin( phi ) * Math.sin( theta );
					sun.z = Math.sin( phi ) * Math.cos( theta );

					sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
					water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

					scene.environment = pmremGenerator.fromScene( sky as any ).texture;

				}

				updateSun();

				//

				var geometry = new THREE.BoxBufferGeometry( 30, 30, 30 );
				var material = new THREE.MeshStandardMaterial( { roughness: 0 } );

				mesh = new THREE.Mesh( geometry, material );
				// scene.add( mesh );

				//

				controls = new OrbitControls( camera, renderer.domElement );
				controls.maxPolarAngle = Math.PI * 0.495;
				controls.target.set( 0, 10, 0 );
				controls.minDistance = 40.0;
				controls.maxDistance = 200.0;
				controls.update();

				//

				// GUI

				// var gui = new GUI();

				// var folder = gui.addFolder( 'Sky' );
				// folder.add( parameters, 'inclination', 0, 0.5, 0.0001 ).onChange( updateSun );
				// folder.add( parameters, 'azimuth', 0, 1, 0.0001 ).onChange( updateSun );
				// folder.open();

        // does this break
				var uniforms = water.material.uniforms;

				// var folder = gui.addFolder( 'Water' );
				// folder.add( uniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
				// folder.add( uniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
				// folder.add( uniforms.alpha, 'value', 0.9, 1, .001 ).name( 'alpha' );
				// folder.open();

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			function render() {

				var time = performance.now() * 0.001;

				mesh.position.y = Math.sin( time ) * 20 + 5;
				mesh.rotation.x = time * 0.5;
				mesh.rotation.z = time * 0.51;

				water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

				renderer.render( scene, camera );

			}
  }

}
