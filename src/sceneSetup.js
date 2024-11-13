import * as THREE from 'three';
import {
    assignNamesToMeshes,
    initRaycaster,
    toggleAxesHelper,
    toggleGridHelper,
    toggleSpotLightHelper,
    toggleDirectionalLightHelper,
    togglePointLightHelper,
    toggleCameraHelper
} from './THREEutils'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene, camera, renderer, controls;

export function initScene() {
    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 9);

    // Renderer setup

    function isWebGLAvailable() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
        } catch (e) {
            return false;
        }
    }

    if (isWebGLAvailable()) {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

    } else {
        console.error('WebGL not supported in this environment.');
    }

    // OrbitControls setup
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;  // Enable damping for smoother controls
    controls.dampingFactor = 0.05;  // Damping inertia
    controls.enableZoom = true;     // Allow zooming
    controls.enablePan = true;      // Allow panning
    controls.maxDistance = 50;      // Set maximum zoom-out distance
    controls.minDistance = 2;       // Set minimum zoom-in distancein THREEU


    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Initialize raycaster for click detection
    initRaycaster(scene, camera);

    // Initial helper toggles
    setupHelpers(scene);

    assignNamesToMeshes(scene);

    return { scene, camera, renderer, controls };
}

// Function to toggle helpers for initial setup or debugging
function setupHelpers(scene) {
    toggleAxesHelper(scene);
    toggleGridHelper(scene);
    toggleCameraHelper(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
