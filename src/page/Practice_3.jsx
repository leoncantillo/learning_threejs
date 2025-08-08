import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import planetaryDataReal from '../utils/planetaryData.js';
import planetaryDataX100 from '../utils/planetaryDatax100.js';
import planetaryDataBig from '../utils/planetaryDataBig.js';
import FocusPlanetBtn from '../components/FocusPlanetBtn.jsx';
import SwitchDataSizeBtn from '../components/SwitchDataSizeBtn.jsx';

const Practice_3 = () => {
    const [dataScale, setDataScale] = useState('big');
    const planetaryData = useRef(null);
    const canvasRef = useRef(null);
    const planetRefs = useRef({});
    const cameraRef = useRef(null);
    const orbitControlsRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const cameraTransition = useRef(null);
    const [focusedPlanet, setFocusedPlanet] = useState(null);
    const pauseRevolutionRef = useRef(false);
    const pauseStartTime = useRef(null);
    const pauseOffset = useRef(0);
    const clock = useRef(new THREE.Clock());

    useEffect(() => {
        planetaryData.current = dataScale == 'big' && planetaryDataBig ||
            dataScale == 'x100' && planetaryDataX100 || planetaryDataReal;

        const scene = new THREE.Scene();
        const near = dataScale == 'big' && 0.1 ||
            dataScale == 'x100' && 0.001 || 0.0001;
        const far = dataScale == 'big' && 1000 ||
            dataScale == 'x100' && 2000 || 12000;
        const camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight,
            near, far
        );
        camera.position.set(0, 5, 5);
        camera.up.set(0, 1, 0);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, depth: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.zoomSpeed = dataScale == 'big' && 5 ||
            dataScale == 'x100' && 10 || 15;
        orbitControls.maxDistance = dataScale == 'big' && 600 ||
            dataScale == 'x100' && 1000 || 10000;
        orbitControls.update();
        orbitControlsRef.current = orbitControls;

        animateCameraWhenScaling(dataScale);

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
        {
            const intensity = dataScale == 'big' && 10000 ||
                dataScale == 'x100' && 10000 || 500000;
            const sunshine = new THREE.PointLight(0xfffffff, intensity);
            scene.add(sunshine);
        }

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
        solarSystem.name = 'solarSystem';
        scene.add(solarSystem);
        objects.push(solarSystem);

        const sunMesh = createSphereCB(planetaryData.current.sun);
        sunMesh.name = 'sun';
        solarSystem.add(sunMesh);
        planetRefs.current.sun = sunMesh;
        objects.push(sunMesh);

        const mercuryOrbit = new THREE.Object3D();
        mercuryOrbit.name = 'mercuryOrbit';
        solarSystem.add(mercuryOrbit);
        objects.push(mercuryOrbit);

        const mercuryMesh = createSphereCB(planetaryData.current.mercury);
        mercuryMesh.name = 'mercury';
        mercuryOrbit.add(mercuryMesh);
        planetRefs.current.mercury = mercuryMesh;
        objects.push(mercuryMesh);

        const venusOrbit = new THREE.Object3D();
        venusOrbit.name = 'venusOrbit';
        solarSystem.add(venusOrbit);
        objects.push(venusOrbit);

        const venusMesh = createSphereCB(planetaryData.current.venus);
        venusMesh.name = 'venus';
        venusOrbit.add(venusMesh);
        planetRefs.current.venus = venusMesh;
        objects.push(venusMesh);

        const earthOrbit = new THREE.Object3D();
        earthOrbit.name = 'earthOrbit';
        solarSystem.add(earthOrbit);
        objects.push(earthOrbit);

        const earthMesh = createSphereCB(planetaryData.current.earth);
        earthMesh.name = 'earth';
        earthOrbit.add(earthMesh);
        planetRefs.current.earth = earthMesh;
        objects.push(earthMesh);

        // const moonOrbit = new THREE.Object3D();
        // moonOrbit.name = 'moonOrbit';
        // moonOrbit.position.set(2, 0, 0);
        // earthOrbit.add(moonOrbit);

        // const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
        // const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
        // moonMesh.scale.set(.5, .5, .5);
        // moonMesh.name = 'moon';
        // moonOrbit.add(moonMesh);
        // objects.push(moonMesh);

        const marsOrbit = new THREE.Object3D();
        marsOrbit.name = 'marsOrbit';
        solarSystem.add(marsOrbit);
        objects.push(marsOrbit);

        const marsMesh = createSphereCB(planetaryData.current.mars);
        marsMesh.name = 'mars';
        marsOrbit.add(marsMesh);
        planetRefs.current.mars = marsMesh;
        objects.push(marsMesh);

        const jupiterOrbit = new THREE.Object3D();
        jupiterOrbit.name = 'jupiterOrbit';
        solarSystem.add(jupiterOrbit);
        objects.push(jupiterOrbit);

        const jupiterMesh = createSphereCB(planetaryData.current.jupiter);
        jupiterMesh.name = 'jupiter';
        jupiterOrbit.add(jupiterMesh);
        planetRefs.current.jupiter = jupiterMesh;
        objects.push(jupiterMesh);

        const saturnOrbit = new THREE.Object3D();
        saturnOrbit.name = 'saturnOrbit';
        solarSystem.add(saturnOrbit);
        objects.push(saturnOrbit);

        const saturnMesh = createSphereCB(planetaryData.current.saturn);
        saturnMesh.name = 'saturn';
        saturnOrbit.add(saturnMesh);
        planetRefs.current.saturn = saturnMesh;
        objects.push(saturnMesh);

        const uranusOrbit = new THREE.Object3D();
        uranusOrbit.name = 'uranusOrbit';
        solarSystem.add(uranusOrbit);
        objects.push(uranusOrbit);

        const uranusMesh = createSphereCB(planetaryData.current.uranus);
        uranusMesh.name = 'uranus';
        uranusOrbit.add(uranusMesh);
        planetRefs.current.uranus = uranusMesh;
        objects.push(uranusMesh);

        const neptuneOrbit = new THREE.Object3D();
        neptuneOrbit.name = 'neptuneOrbit';
        solarSystem.add(neptuneOrbit);
        objects.push(neptuneOrbit);

        const neptuneMesh = createSphereCB(planetaryData.current.neptune);
        neptuneMesh.name = 'neptune';
        neptuneOrbit.add(neptuneMesh);
        planetRefs.current.neptune = neptuneMesh;
        objects.push(neptuneMesh);

        const plutoOrbit = new THREE.Object3D();
        plutoOrbit.name = 'plutoOrbit';
        solarSystem.add(plutoOrbit);
        objects.push(plutoOrbit);

        const plutoMesh = createSphereCB(planetaryData.current.pluto);
        plutoMesh.name = 'pluto';
        plutoOrbit.add(plutoMesh);
        planetRefs.current.pluto = plutoMesh;
        objects.push(plutoMesh);

        Object.entries(planetaryData.current).forEach(([name, planet]) => {
            if (name !== 'sun') {
                const orbit = createOrbit(planet.distance);
                scene.add(orbit);
            }
        });

        function animation(time) {
            // Focus on Celestial Body
            if (cameraTransition.current) {
                const { startTime, duration, start, targetPos, targetLook } = cameraTransition.current;
                const elapsed = (time - startTime) / duration;
                const t = Math.min(elapsed, 1);

                cameraRef.current.position.lerpVectors(start.pos, targetPos, t);
                orbitControlsRef.current.target.lerpVectors(start.target, targetLook, t);
                orbitControlsRef.current.update();

                if (t >= 1) {
                    cameraTransition.current = null;
                    orbitControlsRef.current.enabled = true;
                }
            }

            // Planet's Revolution Animation 
            const elapsedTime = clock.current.getElapsedTime() - pauseOffset.current;
            if (!pauseRevolutionRef.current) {
                objects.forEach(object => {
                    const data = planetaryData.current[object.name];
                    if (data && data.orbitalPeriod > 0) {
                        const angle = data.initialAngle + elapsedTime * (1 / data.orbitalPeriod) * Math.PI * 2;
                        object.position.set(
                            Math.cos(angle) * data.distance,
                            0,
                            Math.sin(angle) * data.distance
                        );
                    }
                });
            }
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
    }, [dataScale]);

    const focusOnPlanet = (planetName) => {
        setFocusedPlanet(planetName);
    };

    const stopFocus = () => setFocusedPlanet(null);


    useEffect(() => {
        const controls = orbitControlsRef.current;
        if (!controls) return;

        if (focusedPlanet) {
            const mesh = planetRefs.current[focusedPlanet];
            if (!mesh) { console.warn('No mesh:', focusedPlanet); return; }

            const sunMesh = planetRefs.current['sun'];
            if (!sunMesh) { console.warn('No mesh: sun'); return; }

            const planetPos = new THREE.Vector3();
            mesh.getWorldPosition(planetPos);

            const sunPos = new THREE.Vector3();
            sunMesh.getWorldPosition(sunPos);

            const directionToSun = new THREE.Vector3().subVectors(sunPos, planetPos).normalize();

            const radius = planetaryData.current[focusedPlanet]?.radius || 1;
            const distanceBehind = radius * 5;
            const verticalOffset = radius * 2;

            const targetPos = planetPos.clone()
                .sub(directionToSun.clone().multiplyScalar(distanceBehind)) // behind
                .add(new THREE.Vector3(0, verticalOffset, 0)); // top left

            const cam = cameraRef.current;
            const ctrl = orbitControlsRef.current;

            cameraTransition.current = {
                startTime: performance.now(),
                duration: 1000,
                start: {
                    pos: cam.position.clone(),
                    target: ctrl.target.clone()
                },
                targetPos,
                targetLook: planetPos
            };

            orbitControlsRef.current.enabled = false;
            orbitControlsRef.current.enablePan = false;
            pauseRevolutionRef.current = true;
            pauseStartTime.current = clock.current.getElapsedTime();
        } else {
            pauseOffset.current = clock.current.getElapsedTime() - pauseStartTime.current;
            pauseRevolutionRef.current = false;
            orbitControlsRef.current.enablePan = true;
        }
    }, [focusedPlanet]);

    function createOrbit(radius, segments = 100, color = 0xffffff) {
        const curve = new THREE.EllipseCurve(
            0, 0,
            radius, radius,
            0, 2 * Math.PI,
            false, 0
        );

        const points = curve.getPoints(segments);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({ color });
        const orbit = new THREE.LineLoop(geometry, material);

        orbit.rotation.x = Math.PI / 2;

        return orbit;
    }

    function animateCameraWhenScaling() {
        const cam = cameraRef.current;
        const ctrl = orbitControlsRef.current;

        const transition = {
            startTime: performance.now(),
            duration: 1000,
            start: {
                pos: cam.position.clone(),
                target: ctrl.target.clone()
            },
            targetLook: new THREE.Vector3(0, 0, 0),
            targetPos: new THREE.Vector3(0, 40, 150)
        };

        switch (dataScale) {
            case 'real':
                transition.targetPos = new THREE.Vector3(0, 60, 100);
                break;
            case 'x100':
                transition.targetPos = new THREE.Vector3(0, 50, 200);
                break;
            case 'big':
                break;
            default:
                console.error('Option not available.');
                return;
        }

        cameraTransition.current = transition;
    }


    return (
        <>
            <canvas ref={canvasRef} />
            {isReady && <FocusPlanetBtn
                focusOnPlanet={focusOnPlanet}
                focusedPlanet={focusedPlanet}
                stopFocus={stopFocus}
            />}
            {isReady && <SwitchDataSizeBtn setDataScale={setDataScale} />}
        </>
    );
};

export default Practice_3;
