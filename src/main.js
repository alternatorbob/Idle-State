import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';
// import { textureLoader } from 'three/examples/jsm/loaders/textureLoader';
import { initScene, animate } from './sceneSetup.js';
import { setupLights } from './lightSetup.js';
import { loadCards } from './cardManager.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { color, reflector, uv, texture, normalWorld } from 'three/tsl';

async function createReflectivePlane(scene) {
    // Create a plane geometry for the reflector
    const floorGeometry = new THREE.PlaneGeometry(50, 50);

    // Set up the Reflector with a custom material
    const reflector = new Reflector(floorGeometry, {
        color: new THREE.Color(0x222222),   // Dark gray base color
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio
    });

    // Modify the Reflector's material to add roughness and normal map
    reflector.material.roughness = 1.6;           // Add some roughness for matte reflection
    reflector.material.metalness = 0.1;           // Adjust metalness for a metallic look

    // Set position and orientation of the reflector plane
    reflector.rotation.x = -Math.PI / 2; // Lie flat
    reflector.position.set(0, -0.4, 0);            // Adjust height as needed
    reflector.receiveShadow = true;      // Enable receiving shadows

    // Add the reflector to the scene
    scene.add(reflector);

    return reflector;
}

async function init() {
    // Initialize scene, camera, renderer, and controls
    const { scene } = initScene();
    console.log('scene was loaded');

    // Setup lights
    setupLights(scene);

    // Load studio plane
    // await loadStudioPlane(scene);

    await createReflectivePlane(scene);

    // Create cards
    await loadCards(scene);

    // Start animation loop
    animate();
}

// Start the application
init();
