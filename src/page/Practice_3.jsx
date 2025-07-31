import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import planetaryData from '../utils/planetaryDatax100.js';
import FocusPlanetBtn from '../components/FocusPlanetBtn.jsx';

const Practice_3 = () => {
    const canvasRef = useRef(null);
    const planetRefs = useRef({});
    const cameraRef = useRef(null);
    const orbitControlsRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const cameraTransition = useRef(null);


    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight,
            0.000001, 10000
        );
        camera.position.set(0, 5, 15);
        camera.up.set(0, 1, 0);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.zoomSpeed = 5;
        orbitControls.update();
        orbitControlsRef.current = orbitControls;

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
        const sunshine = new THREE.PointLight(0xfffffff, 5000);
        scene.add(sunshine);

        const objects = [];

        // Sphere Celestial Body Geometry
        function createSphereCB(celestialBody) {
            const widhtSegments = 6;
            const heightSegments = 6;
            const geometry = new THREE.SphereGeometry(celestialBody.radius, widhtSegments, heightSegments);
            const material = new THREE.MeshPhongMaterial({ color: celestialBody.color, emissive: celestialBody.emissiveColor });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = celestialBody.distance;
            return mesh;
        }

        const solarSystem = new THREE.Object3D();
        scene.add(solarSystem);
        objects.push(solarSystem);

        const sunMesh = createSphereCB(planetaryData.sun);
        solarSystem.add(sunMesh);
        planetRefs.current.sun = sunMesh;
        objects.push(sunMesh);

        const mercuryOrbit = new THREE.Object3D();
        solarSystem.add(mercuryOrbit);
        objects.push(mercuryOrbit);

        const mercuryMesh = createSphereCB(planetaryData.mercury);
        mercuryOrbit.add(mercuryMesh);
        planetRefs.current.mercury = mercuryMesh;
        objects.push(mercuryMesh);

        const venusOrbit = new THREE.Object3D();
        solarSystem.add(venusOrbit);
        objects.push(venusOrbit);

        const venusMesh = createSphereCB(planetaryData.venus);
        venusOrbit.add(venusMesh);
        planetRefs.current.venus = venusMesh;
        objects.push(venusMesh);

        const earthOrbit = new THREE.Object3D();
        solarSystem.add(earthOrbit);
        objects.push(earthOrbit);

        const earthMesh = createSphereCB(planetaryData.earth);
        earthOrbit.add(earthMesh);
        planetRefs.current.earth = earthMesh;
        objects.push(earthMesh);

        // const moonOrbit = new THREE.Object3D();
        // moonOrbit.position.set(2, 0, 0);
        // earthOrbit.add(moonOrbit);

        // const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
        // const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
        // moonMesh.scale.set(.5, .5, .5);
        // moonOrbit.add(moonMesh);
        // objects.push(moonMesh);

        const marsOrbit = new THREE.Object3D();
        solarSystem.add(marsOrbit);
        objects.push(marsOrbit);

        const marsMesh = createSphereCB(planetaryData.mars);
        marsOrbit.add(marsMesh);
        planetRefs.current.mars = marsMesh;
        objects.push(marsMesh);

        const jupiterOrbit = new THREE.Object3D();
        solarSystem.add(jupiterOrbit);
        objects.push(jupiterOrbit);

        const jupiterMesh = createSphereCB(planetaryData.jupiter);
        jupiterOrbit.add(jupiterMesh);
        planetRefs.current.jupiter = jupiterMesh;
        objects.push(jupiterMesh);

        const saturnOrbit = new THREE.Object3D();
        solarSystem.add(saturnOrbit);
        objects.push(saturnOrbit);

        const saturnMesh = createSphereCB(planetaryData.saturn);
        saturnOrbit.add(saturnMesh);
        planetRefs.current.saturn = saturnMesh;
        objects.push(saturnMesh);

        const uranusOrbit = new THREE.Object3D();
        solarSystem.add(uranusOrbit);
        objects.push(uranusOrbit);

        const uranusMesh = createSphereCB(planetaryData.uranus);
        uranusOrbit.add(uranusMesh);
        planetRefs.current.uranus = uranusMesh;
        objects.push(uranusMesh);

        const neptuneOrbit = new THREE.Object3D();
        solarSystem.add(neptuneOrbit);
        objects.push(neptuneOrbit);

        const neptuneMesh = createSphereCB(planetaryData.neptune);
        neptuneOrbit.add(neptuneMesh);
        planetRefs.current.neptune = neptuneMesh;
        objects.push(neptuneMesh);

        const plutoOrbit = new THREE.Object3D();
        solarSystem.add(plutoOrbit);
        objects.push(plutoOrbit);

        const plutoMesh = createSphereCB(planetaryData.pluto);
        plutoOrbit.add(plutoMesh);
        planetRefs.current.pluto = plutoMesh;
        objects.push(plutoMesh);


        function animation(time) {
            if (cameraTransition.current) {
                const { startTime, duration, start, targetPos, targetLook } = cameraTransition.current;
                const elapsed = (time - startTime) / duration;
                const t = Math.min(elapsed, 1);

                cameraRef.current.position.lerpVectors(start.pos, targetPos, t);
                orbitControlsRef.current.target.lerpVectors(start.target, targetLook, t);
                orbitControlsRef.current.update();

                if (t >= 1) {
                    cameraTransition.current = null;
                }
            }

            // objects.forEach(object => {
            //     object.rotation.y += 0.01;
            // });
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animation);

        setIsReady(true);
        
        return () => {
            window.removeEventListener('resize', onWindowResize);
            orbitControls.update();
            renderer.setAnimationLoop(null);
            renderer.dispose();
        };
    }, []);

    // Función para enfocar la cámara en un planeta
    const focusOnPlanet = (planetName) => {
        const mesh = planetRefs.current[planetName];
        if (!mesh) { console.error('No mesh:', planetName); return; }

        const pos = new THREE.Vector3();
        mesh.getWorldPosition(pos);

        const radius = planetaryData[planetName]?.radius || 1;
        const offset = new THREE.Vector3(0, 0, radius * 4);
        const targetPos = pos.clone().add(offset);

        const cam = cameraRef.current;
        cam.rotation.y = Math.PI / 4;
        const ctrl = orbitControlsRef.current;

        cameraTransition.current = {
            startTime: performance.now(),
            duration: 1000,
            start: {
                pos: cam.position.clone(),
                target: ctrl.target.clone()
            },
            targetPos,
            targetLook: pos
        };
    };

    return (
        <>
            <canvas ref={canvasRef} />
            {isReady && <FocusPlanetBtn focusOnPlanet={focusOnPlanet} />}
        </>
    );
};

export default Practice_3;
