import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

const Practice_3 = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight,
            1, 100
        );
        camera.position.set(0, 50, 0);
        camera.up.set(0,0,1);
        camera.lookAt(0,0,0);

        const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.update();


        const objects = [];

        // Sphere Geometry
        const radius = 1;  
        const widhtSegments = 6;
        const heightSegments = 6;
        const sphereGeometry = new THREE.SphereGeometry(radius, widhtSegments, heightSegments);

        const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
        const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        sunMesh.position.set(0, 0, 0);
        sunMesh.scale.set(5,5,5);
        scene.add(sunMesh);
        objects.push(sunMesh);

        function animation() {
            objects.forEach(object => {
                object.rotation.y += 0.004;
            });
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animation);


        return () => {
            orbitControls.update();
            renderer.setAnimationLoop(null);
            renderer.dispose();
        };
    },[]);

  return (
    <canvas ref={canvasRef} />
  );
};

export default Practice_3;
