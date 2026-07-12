
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const Practice_1 = () => {
  const canvasRef = useRef(null);
  const clock = new THREE.Clock();
  let mixers = [];

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#d4d4d4');

    // FOV control variables
    const tanFOV = Math.tan((Math.PI / 180) * camera.fov / 2);
    const windowHeight = window.innerHeight;

    // Handle resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;

      // Ajustar el FOV según nuevo tamaño de ventana
      camera.fov = (360 / Math.PI) * Math.atan(tanFOV * (window.innerHeight / windowHeight));
      camera.updateProjectionMatrix();
      camera.lookAt(scene.position);

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', onWindowResize);

    // Controls (OrbitControls)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 1;
    controls.maxDistance = 1000;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.update();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 0);
    scene.add(light);

    // Cube
    const cubeGeometry = new THREE.BoxGeometry();
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x777 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0, -1.5);
    scene.add(cube);

    // Text
    const loader = new FontLoader();
    loader.load(`${import.meta.env.BASE_URL}fonts/helvetiker_bold.typeface.json`, function (font) {
      const textGeometry = new TextGeometry('Hello Cube', {
        font: font,
        size: 1,
        depth: 0.4,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.04,
        bevelOffset: 0,
        bevelSegments: 1
      });
      textGeometry.center();

      const material = new THREE.MeshStandardMaterial({
        color: 0xff6600,
        metalness: 0.4,
        roughness: 0.3
      });
      const mesh = new THREE.Mesh(textGeometry, material);
      mesh.castShadow = true;

      scene.add(mesh);
    }, () => { }, () => console.log('Error With the text loader.'));

    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const meshPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    meshPlane.rotation.x = Math.PI / 2;
    meshPlane.position.y = -0.5;
    scene.add(meshPlane);
    // Animation
    const animation = () => {
      const delta = clock.getDelta();
      mixers.forEach(mixer => mixer.update(delta));

      controls.update();
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animation);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      controls.dispose();
      renderer.setAnimationLoop(null);
      renderer.dispose();
    };

  }, []);
  return (
    <canvas ref={canvasRef} />
  );
};

export default Practice_1;
