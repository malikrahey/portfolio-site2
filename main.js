import './style.css'
import * as THREE from './node_modules/three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene,camera);



const geometry = new THREE.TorusGeometry(10,3,16,100);

const material = new THREE.PointsMaterial({size: 0.005});
const torus = new THREE.Points(geometry,material);
torus.position.z = -30;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15,5,-5);


const particlesMaterial = new THREE.PointsMaterial({
  size: 0.005,

});
const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 50000;

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount*3; i++) {
  posArray[i] = 5000*(Math.random() - 0.5);
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray,3));


const particlesMesh = new THREE.Points(particlesGeometry,material);

scene.add(pointLight);
scene.add(torus, particlesMesh);


const cameraOffset = 50;
const cameraBeginPos = camera.position.z;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;


  camera.position.z = t * -0.01;
  camera.position.x = t * 0.01;

}

document.body.onscroll = moveCamera;
const clock = new THREE.Clock();
function animate() {


  const elapsedTime = clock.getElapsedTime();

  particlesMesh.rotation.x = 0.05*elapsedTime;
  torus.rotation.y += 0.005;


  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

animate()