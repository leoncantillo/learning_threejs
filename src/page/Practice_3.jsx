import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

const Practice_3 = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight,
            1, 1000
        );
        camera.position.set(0, 50, 0);
        camera.up.set(0,0,1);
        camera.lookAt(0,0,0);

        const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);

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

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.update();

        // Lights
        const sunshine = new THREE.PointLight(0xfffffff, 500);
        scene.add(sunshine);

        const objects = [];

        // Sphere Geometry
        const radius = 1;  
        const widhtSegments = 6;
        const heightSegments = 6;
        const sphereGeometry = new THREE.SphereGeometry(radius, widhtSegments, heightSegments);

        const solarSystem = new THREE.Object3D();
        scene.add(solarSystem);
        objects.push(solarSystem);

        const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
        const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        sunMesh.position.set(0, 0, 0);
        sunMesh.scale.set(5,5,5);
        solarSystem.add(sunMesh);
        objects.push(sunMesh);

        const earthOrbit = new THREE.Object3D();
        earthOrbit.position.x = 10;
        solarSystem.add(earthOrbit);
        objects.push(earthOrbit);

        const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });
        const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
        earthOrbit.add(earthMesh);
        objects.push(earthMesh);

        const moonOrbit = new THREE.Object3D();
        moonOrbit.position.set(2, 0, 0);
        earthOrbit.add(moonOrbit);

        const moonMaterial = new THREE.MeshPhongMaterial( {color: 0x888888, emissive: 0x222222} );
        const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
        moonMesh.scale.set(.5, .5, .5);
        moonOrbit.add(moonMesh);
        objects.push(moonMesh);

        objects.forEach((node) => {
            const axes = new THREE.AxesHelper();
                axes.material.depthTest = false;
                axes.renderOrder = 1;
                node.add(axes);
        });

        function animation() {
            objects.forEach(object => {
                object.rotation.y += 0.01;
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
