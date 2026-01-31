
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create a geometry - Icosahedron looks techy
    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    
    // Material - Wireframe style
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x000000, // Black
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    
    // Create mesh
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Inner sphere for depth
    const innerGeometry = new THREE.IcosahedronGeometry(1.5, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF5722, // Orange
        wireframe: true
    });
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerSphere);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.08,
        color: 0xFF5722 // Orange
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.002;

        innerSphere.rotation.x -= 0.002;
        innerSphere.rotation.y -= 0.001;
        
        particlesMesh.rotation.y += 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});
