import * as THREE from 'three';
import path from 'path';

let raycaster, mouse = new THREE.Vector2()
const helpers = {}; // Store references to helpers for toggling

/**
 * Assigns a name to each mesh in the scene based on the file name of the texture
 * or the object's name. This function modifies each mesh's `.name` property.
 *
 * @param {THREE.Scene} scene - The scene containing the objects to rename.
 */

export function assignNamesToMeshes(scene) {
    console.log('assignNamesToMeshes');
    scene.traverse((object) => {
        // Check if the object is a mesh
        if (object instanceof THREE.Mesh) {
            let name = '';

            // Check if the mesh has a material with a texture map
            if (object.material && object.material.map) {
                // Extract texture file name without extension
                const textureFileName = path.basename(object.material.map.image.src || object.material.map.image.currentSrc);
                name = textureFileName ? textureFileName.split('.')[0] : '';
            }

            // If no texture file name is available, use the object's name or ID
            if (!name) {
                name = object.name || `UnnamedMesh_${object.id}`;
                console.log(`the name is ${name}`);
            }

            // Assign the generated name to the mesh
            object.name = name;
        }
    });
}

// Initialize Raycaster
export function initRaycaster(scene, camera) {
    raycaster = new THREE.Raycaster();

    // Event listener for mouse clicks
    window.addEventListener('click', (event) => {
        // Update mouse position in normalized device coordinates (-1 to +1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        // Set the raycaster based on the camera and updated mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the 
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            console.log('Clicked on mesh:', intersects[0].object.name);
        } else {
            console.log('No mesh clicked.');
        }
    });
}

// Toggle Axes Helper
export function toggleAxesHelper(scene, size = 5) {
    if (helpers.axesHelper) {
        scene.remove(helpers.axesHelper);
        delete helpers.axesHelper;
    } else {
        const axesHelper = new THREE.AxesHelper(size);
        scene.add(axesHelper);
        helpers.axesHelper = axesHelper;
    }
}

// Toggle Grid Helper
export function toggleGridHelper(scene, size = 10, divisions = 10) {
    if (helpers.gridHelper) {
        scene.remove(helpers.gridHelper);
        delete helpers.gridHelper;
    } else {
        const gridHelper = new THREE.GridHelper(size, divisions);
        scene.add(gridHelper);
        helpers.gridHelper = gridHelper;
    }
}

// Toggle SpotLight Helper
export function toggleSpotLightHelper(scene, light) {
    const helperKey = `spotLightHelper_${light.uuid}`;
    if (helpers[helperKey]) {
        scene.remove(helpers[helperKey]);
        delete helpers[helperKey];
    } else {
        const spotLightHelper = new THREE.SpotLightHelper(light);
        scene.add(spotLightHelper);
        helpers[helperKey] = spotLightHelper;
    }
}

// Toggle Directional Light Helper
export function toggleDirectionalLightHelper(scene, light, size = 5) {
    const helperKey = `directionalLightHelper_${light.uuid}`;
    if (helpers[helperKey]) {
        scene.remove(helpers[helperKey]);
        delete helpers[helperKey];
    } else {
        const directionalLightHelper = new THREE.DirectionalLightHelper(light, size);
        scene.add(directionalLightHelper);
        helpers[helperKey] = directionalLightHelper;
    }
}

// Toggle Point Light Helper
export function togglePointLightHelper(scene, light, size = 1) {
    const helperKey = `pointLightHelper_${light.uuid}`;
    if (helpers[helperKey]) {
        scene.remove(helpers[helperKey]);
        delete helpers[helperKey];
    } else {
        const pointLightHelper = new THREE.PointLightHelper(light, size);
        scene.add(pointLightHelper);
        helpers[helperKey] = pointLightHelper;
    }
}

// Toggle Camera Helper
export function toggleCameraHelper(scene, camera) {
    if (helpers.cameraHelper) {
        scene.remove(helpers.cameraHelper);
        delete helpers.cameraHelper;
    } else {
        const cameraHelper = new THREE.CameraHelper(camera);
        scene.add(cameraHelper);
        helpers.cameraHelper = cameraHelper;
    }
}
