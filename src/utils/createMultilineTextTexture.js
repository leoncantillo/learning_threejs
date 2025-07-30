import * as THREE from 'three';

export default function createMultilineTextTexture(text, width = 1024, height = 512, lineHeight = 40, backgroundColor = '#ffffff', textColor = '#000000') {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = backgroundColor; // fondo blanco (opcional)
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = textColor;
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    const marginLeft = 20;
    const marginTop = 20;
    const maxWidth = canvas.width - 40;

    const allLines = [];

    // Primero dividir por líneas explícitas (\n)
    const rawLines = text.split('\n');

    for (let rawLine of rawLines) {
        const words = rawLine.trim().split(' ');
        let currentLine = '';
        for (let word of words) {
            const testLine = currentLine + word + ' ';
            const { width: testWidth } = ctx.measureText(testLine);
            if (testWidth > maxWidth) {
                allLines.push(currentLine);
                currentLine = word + ' ';
            } else {
                currentLine = testLine;
            }
        }
        allLines.push(currentLine);
    }

    // Dibujar todas las líneas
    allLines.forEach((line, i) => {
        ctx.fillText(line, marginLeft, marginTop + i * lineHeight);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}
