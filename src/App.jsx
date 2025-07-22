import { useEffect, useRef} from 'react';
import Layout from './components/Layout';
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
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#111');

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0x777});
    const cube = new THREE.Mesh(geometry, material);
    cube.rotateX(0.5);
    scene.add(cube);

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
