import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
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
    var container
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

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 30000 );
				camera.position.set(-15000, 0, -15000);

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
						waterColor: 0x001e0f,
						distortionScale: 3.7,
						fog: scene.fog !== undefined
					}
				);

				water.rotation.x = - Math.PI / 2;

				scene.add( water );

				// Skybox
				let skyboxImage = ""
				const materialArray = createMaterialArray(skyboxImage);
				var skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
				var skybox = new THREE.Mesh(skyboxGeo, materialArray);
				scene.add(skybox);

				const ft = new THREE.TextureLoader().load("pz.jpg");
				const bk = new THREE.TextureLoader().load("nz.jpg");
				const up = new THREE.TextureLoader().load("py.jpg");
				const dn = new THREE.TextureLoader().load("ny.jpg");
				const rt = new THREE.TextureLoader().load("px.jpg");
				const lf = new THREE.TextureLoader().load("nx.jpg");

				function createPathStrings(filename) {
					const basePath = "assets/skybox/";
					const baseFilename = basePath + filename;
					const fileType = ".jpg";
					const sides = ["nz", "pz", "py", "ny", "px", "nx"];
					const pathStings = sides.map(side => {
					  return baseFilename + side + fileType;
					});
					return pathStings;
				  }
				
				  
				  function createMaterialArray(filename) {
					const skyboxImagepaths = createPathStrings(filename);
					const materialArray = skyboxImagepaths.map(image => {
					  let texture = new THREE.TextureLoader().load(image);
					  return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
					});
					return materialArray;
				  }


				var sky = new Sky();
				sky.scale.setScalar( 10000 );
				scene.add( sky );

				var uniforms = sky.material.uniforms as any;

				uniforms[ 'turbidity' ].value = 10;
				uniforms[ 'rayleigh' ].value = 2;
				uniforms[ 'mieCoefficient' ].value = 0.005;
				uniforms[ 'mieDirectionalG' ].value = 0.8;

				var parameters = {
					inclination: 0.7,
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


				controls = new OrbitControls( camera, renderer.domElement );
				controls.enabled = false;
				controls.maxPolarAngle = Math.PI * 0.495;
				controls.target.set( 0, 10, 0 );
				controls.minDistance = 40.0;
				controls.maxDistance = 40.0;
				controls.update();

				var uniforms = water.material.uniforms;


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
