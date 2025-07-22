import { useEffect, useRef} from 'react';
import Layout from './components/Layout';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as THREE from 'three';
import './styles/App.scss';

function App() {
  const canvasRef = useRef(null);


  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth/window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0,5,10);
    const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#111');

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({color: 0x777});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0,0,-1.5);
    scene.add(cube);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 0);
    scene.add(light);

    // Text
    const loader = new FontLoader();
    loader.load('/fonts/OpenSans_Bold.json', function (font) {
      const textGeometry = new TextGeometry('Hello World', {
        font: font,
        size: 1,
        height: 0.02,
      });
      textGeometry.center();

      const material = new THREE.MeshStandardMaterial({
        color: 0xff6600,
        metalness: 0.4,
        roughness: 0.3
      });
      const mesh = new THREE.Mesh(textGeometry, material);
      mesh.castShadow = true;
      mesh.scale.set(1, 1, 0.008);

      scene.add(mesh);
    });

    // Animation
    const animation = () => {

      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animation);
    
    return () => {
      renderer.setAnimationLoop(null);
      renderer.dispose();
    };

  },[]);

  return (
    <Layout>
      <canvas ref={canvasRef} />
    </Layout>
  );
}

export default App;
