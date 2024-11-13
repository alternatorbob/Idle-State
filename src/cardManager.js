import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

export async function createCard(scene, imagePath, index) {
    try {
        const texture = await textureLoader.loadAsync(imagePath);
        const aspectRatio = texture.image.width / texture.image.height;

        // Card dimensions
        const width = 2;
        const height = width / aspectRatio;
        const depth = 0.01;

        const geometry = new THREE.BoxGeometry(width, height, depth);

        // Create emissive material for the front
        const emissiveMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            emissive: 0xffffff,            // Make the card emissive
            emissiveIntensity: 0.7,        // Adjust emissive brightness
            emissiveMap: texture           // Use the same texture for emissive map
        });

        // Create other materials for the remaining sides
        const sideMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

        const materials = [
            sideMaterial, // right
            sideMaterial, // left
            sideMaterial, // top
            sideMaterial, // bottom
            emissiveMaterial, // front
            sideMaterial // back
        ];

        const card = new THREE.Mesh(geometry, materials);
        card.castShadow = true;

        // Position cards in a row
        card.position.x = (index - 1) * (width + 0.5);
        card.position.y = height / 2 + 0.5;
        card.position.z = 0;

        scene.add(card);
        return card;
    } catch (error) {
        console.error('Error creating card:', error);
        return null;
    }
}


export async function loadCards(scene) {
    // Updated array with static paths to match the provided image names
    const cardImages = [
        '/cards/Contents.png',
        '/cards/Design Feature.png',
        '/cards/Music Photo 2.png',
        '/cards/Noise Cancellation-1.png',
        '/cards/Noise Cancellation.png',
        '/cards/Pink.png',
        '/cards/Share Play.png',
        '/cards/Spatial Audio.png'
    ];

    const cards = await Promise.all(
        cardImages.map((imagePath, index) => createCard(scene, imagePath, index))
    );

    return cards.filter(card => card !== null);
}
