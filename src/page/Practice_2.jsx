import { useEffect, useRef} from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import * as THREE from 'three';
import createMultilineTextTexture from '../utils/createMultilineTextTexture';

function Practice_2() {
  const canvasRef = useRef(null);
    const fbxLoader = new FBXLoader();
    const gltfLoader = new GLTFLoader();
    const clock = new THREE.Clock();
    let mixers = [];

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth/window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-0.4,1,2.5);
    camera.lookAt(0,0,0);
    
    const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2.02;
    controls.update();

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

    {
      const light = new THREE.PointLight(0xffffff, 160);
      light.position.set(0, 4, 3);
      light.castShadow = true;
      scene.add(light);

      const helper = new THREE.PointLightHelper(light);
      scene.add(helper);
    }

    {
      // CUBE WALLS
      const cubeSize = 6;
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize*1.5);
      const material = new THREE.MeshPhongMaterial({color: '#ccc', side: THREE.BackSide});
      const mesh = new THREE.Mesh(geometry, material);
      mesh.receiveShadow = true;
      mesh.position.set(0, cubeSize/2, cubeSize/4);
      scene.add(mesh);
    }

    {
      const textTexture = createMultilineTextTexture(
        `This 3D models were basen on:
        1. "Metaretail: Escalator"
          (https://sketchfab.com/3d-models/metaretail-escalator-d1706d72bf7943ab9bd7f48f18cb591e)
          by vmmaniac (https://sketchfab.com/vmmaniac)
          licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
        2. "Characteres" (https://mixamo.com)`,
        1920, 620, 40,'#ffffff02', '#000'
      );

      const geometry = new THREE.PlaneGeometry(5, 2);
      const material = new THREE.MeshPhongMaterial({map: textTexture, transparent: true});
      const wallText = new THREE.Mesh(geometry, material);
      wallText.position.set(0, 3, -2.998);
      wallText.receiveShadow = true;
      scene.add(wallText);
    }

    // 3D ESCALATOR MODEL
    gltfLoader.load(`${import.meta.env.BASE_URL}models/escalator.glb`,(glb) => {
        const root = glb.scene;
        root.scale.set(3, 3, 3);
        root.position.set(0, -0.32, -2);
        scene.add(root);
        const mixer = new THREE.AnimationMixer(root);

        if(glb.animations && glb.animations.length > 0) {
          const action = mixer.clipAction(glb.animations[0]);
          action.timeScale = -1;
          action.play();
          mixers.push(mixer);
        } else {
          console.log('El objeto 3d no tiene animación', glb.animations);
        } 
    });

    // CHARACTER JAMES
    fbxLoader.load(`${import.meta.env.BASE_URL}models/character(James).fbx`,
      (fbx) => {
        const root = fbx;
        root.scale.set(0.006,0.006,0.006);
        root.position.set(0, 0.038, 0.54);

        const mixer = new THREE.AnimationMixer(root);

        fbxLoader.load(`${import.meta.env.BASE_URL}models/animations/SwaggerWalk.fbx`,
          (anim) => {
            const animation = anim.animations[0];
            const action = mixer.clipAction(animation);
            action.play();
            mixers.push(mixer);
          }
        );
        scene.add(root);
      }
    );

    // CHARACTER JOE
    fbxLoader.load(`${import.meta.env.BASE_URL}models/character(Joe).fbx`, (fbx) => {
        const root = fbx;
        root.scale.set(0.006,0.006,0.006);
        root.position.set(-0.8, 0, 1.8);

        const mixer = new THREE.AnimationMixer(root);
        mixers.push(mixer);
        const actions = {};

        let currentActionName = 'listening';
        let isReady = {
          listening: false,
          looking: false
        };

        // Load both animations and mark when ready
        fbxLoader.load(`${import.meta.env.BASE_URL}models/animations/ListeningToMusic.fbx`, (anim) => {
          const animation = anim.animations[0];
          actions.listening = mixer.clipAction(animation);
          actions.listening.setLoop(THREE.LoopOnce);
          actions.listening.clampWhenFinished = true;
          isReady.listening = true;
          tryStartSequence();
        });

        fbxLoader.load(`${import.meta.env.BASE_URL}models/animations/LookingBehind.fbx`, (anim) => {
          const animation = anim.animations[0];
          actions.looking = mixer.clipAction(animation);
          actions.looking.setLoop(THREE.LoopOnce);
          actions.looking.clampWhenFinished = true;
          isReady.looking = true;
          tryStartSequence();
        });

        function tryStartSequence() {
          if (isReady.listening && isReady.looking) {
            playAction(currentActionName);

            mixer.addEventListener('finished', () => {
              const next = currentActionName === 'listening' ? 'looking' : 'listening';
              transitionTo(next);
            });
          }
        }

        function playAction(name) {
          actions[name].reset().fadeIn(0.5).play();
        }

        function transitionTo(nextName) {
          actions[currentActionName].fadeOut(0.5);
          playAction(nextName);
          currentActionName = nextName;
        }

        scene.add(root);
    });

    // Animation
    const animation = () => {
      const delta = clock.getDelta();
      mixers.forEach(mixer => mixer.update(delta));

      controls.update();

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animation);
    
    return () => {
      window.removeEventListener('resize', onWindowResize);
      renderer.setAnimationLoop(null);
      renderer.dispose();
    };

  },[]);

  return (
    <canvas ref={canvasRef} />
  );
}

export default Practice_2;
