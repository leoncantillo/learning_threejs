import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import planetaryData from '../utils/planetaryData.js';

const Practice_3 = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight,
            1, 10000
        );
        camera.position.set(0, 2, 10);
        camera.up.set(0, 1, 0);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.zoomSpeed = 5;
        orbitControls.update();
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

        // Lights
        const sunshine = new THREE.PointLight(0xfffffff, 500);
        scene.add(sunshine);

        const objects = [];

        // Sphere Geometry
        function createSpherePlanet(radius, color, emissiveColor) {
            const widhtSegments = 6;
            const heightSegments = 6;
            const geometry = new THREE.SphereGeometry(radius, widhtSegments, heightSegments);
            const material = new THREE.MeshPhongMaterial({color: color, emissive: emissiveColor });
            return new THREE.Mesh(geometry, material);
        }

        const solarSystem = new THREE.Object3D();
        scene.add(solarSystem);
        objects.push(solarSystem);

        const sunMesh = createSpherePlanet(
            planetaryData.sun.radius,
            planetaryData.sun.color,
            planetaryData.sun.emissiveColor
        );
        sunMesh.position.set(0, 0, 0);
        solarSystem.add(sunMesh);
        objects.push(sunMesh);

        const earthOrbit = new THREE.Object3D();
        earthOrbit.position.x = 10;
        solarSystem.add(earthOrbit);
        objects.push(earthOrbit);

        const earthMesh = createSpherePlanet(
            planetaryData.earth.radius,
            planetaryData.earth.color,
            planetaryData.earth.emissiveColor
        );
        earthOrbit.add(earthMesh);
        objects.push(earthMesh);

        // const moonOrbit = new THREE.Object3D();
        // moonOrbit.position.set(2, 0, 0);
        // earthOrbit.add(moonOrbit);

        // const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
        // const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
        // moonMesh.scale.set(.5, .5, .5);
        // moonOrbit.add(moonMesh);
        // objects.push(moonMesh);

        const jupiterOrbit = new THREE.Object3D();
        jupiterOrbit.position.x = 10;
        solarSystem.add(jupiterOrbit);
        objects.push(jupiterOrbit);

        const jupiterMesh = createSpherePlanet(
            planetaryData.jupiter.radius,
            planetaryData.jupiter.color,
            planetaryData.jupiter.emissiveColor
        );
        jupiterOrbit.add(jupiterMesh);
        objects.push(jupiterMesh);


        function animation() {
            // objects.forEach(object => {
            //     object.rotation.y += 0.01;
            // });
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animation);


        return () => {
            orbitControls.update();
            renderer.setAnimationLoop(null);
            renderer.dispose();
        };
    }, []);

    return (
        <canvas ref={canvasRef} />
    );
};

export default Practice_3;
