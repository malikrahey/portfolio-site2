import * as THREE from './node_modules/three';
import './style.css';

//Initialization
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,2)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });


const loader = new THREE.TextureLoader();
const texture = loader.load('/texture.jpg');
const height = loader.load('/clouds.jpg');
const alpha = loader.load('/alpha.png');

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
//renderer.setClearColor(new THREE.Color('#21282a'),1);
renderer.render(scene,camera);

//Light
const pointLight = new THREE.PointLight('#00b3ff');
pointLight.position.set(2,3,4);

//objects

const geometry = new THREE.PlaneGeometry(3,3,64,64);

//materials

const material = new THREE.MeshStandardMaterial({
    color:'gray',
    map: texture,
    displacementMap: height,
    displacementScale: 0.7,
    alphaMap: alpha
});

const plane = new THREE.Mesh(geometry,material);
plane.rotation.x = 181
plane.position.z = -1
scene.add(pointLight,plane)

const cameraOffset = 50;
const cameraBeginPos = camera.position.z;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;


  camera.position.z = 2 + t * -0.001;

}

document.body.onscroll = moveCamera;
const clock = new THREE.Clock();
function animate() {


  const elapsedTime = clock.getElapsedTime();

  plane.rotation.z += 0.00075;
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

animate()