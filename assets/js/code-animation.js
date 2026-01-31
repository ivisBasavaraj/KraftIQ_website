
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('code-canvas-container');
    if (!container) return;

    // Create Canvas
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Configuration
    const fontSize = 14;
    const fontFamily = 'monospace';
    const textColor = 'rgba(18, 18, 23, 0.15)'; // Low opacity primary color
    // const highlightColor = 'rgba(18, 18, 23, 0.4)';
    const speed = 2; // Frame skip for speed control

    // Symbols (Code snippets/tech keywords)
    const symbols = '01{}[]<>/\\*!@#$%^&()_+-=;:?.,|~`const let var function return import export class interface type'.split('');

    let drops = [];
    let columns = 0;

    function resize() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        
        columns = Math.ceil(canvas.width / fontSize);
        
        // Reset drops if resizing
        drops = [];
        for(let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize) * -1;
        }
    }

    // Initial resize
    resize();

    let frameCount = 0;

    function draw() {
        requestAnimationFrame(draw);

        // Control speed
        frameCount++;
        if(frameCount % speed !== 0) return;

        // Fade effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Trail fade
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = textColor;
        ctx.font = `${fontSize}px ${fontFamily}`;

        for(let i = 0; i < drops.length; i++) {
            const text = symbols[Math.floor(Math.random() * symbols.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Randomly highlight some characters
            if(Math.random() > 0.98) {
                 ctx.fillStyle = 'rgba(18, 18, 23, 0.5)';
            } else {
                 ctx.fillStyle = textColor;
            }

            ctx.fillText(text, x, y);

            // Reset drop to top randomly
            if(y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    draw();

    window.addEventListener('resize', resize);
});
