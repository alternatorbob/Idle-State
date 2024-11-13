import * as THREE from 'three';

export function setupLights(scene) {
    // Sun Light
    const sunLight = new THREE.DirectionalLight(0xFFE499, 5);
    sunLight.castShadow = true;
    sunLight.shadow.camera.near = .1;
    sunLight.shadow.camera.far = 5;
    sunLight.shadow.camera.right = 2;
    sunLight.shadow.camera.left = - 2;
    sunLight.shadow.camera.top = 2;
    sunLight.shadow.camera.bottom = - 2;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = - 0.001;
    sunLight.position.set(.5, 3, .5);
    // scene.add(sunLight)

    // Area Light
    const areaLight = new THREE.RectAreaLight(0xffffff, 5, 10, 10);
    areaLight.position.set(0, 8, 0);
    areaLight.rotation.x = -Math.PI / 2;
    // scene.add(areaLight);

    // Spot Light 1
    const spotLight1 = new THREE.SpotLight(0xffffff, 50);
    spotLight1.position.set(-3, 10, 0);
    spotLight1.angle = Math.PI / 6;
    spotLight1.penumbra = 0.5;
    spotLight1.decay = 2;
    spotLight1.distance = 50;
    spotLight1.castShadow = true;
    // scene.add(spotLight1);

    // Spot Light 2
    const spotLight2 = new THREE.SpotLight(0xffffff, 50);
    spotLight2.position.set(3, 10, 0);
    spotLight2.angle = Math.PI / 6;
    spotLight2.penumbra = 0.5;
    spotLight2.decay = 2;
    spotLight2.distance = 50;
    spotLight2.castShadow = true;
    // scene.add(spotLight2);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);
}
