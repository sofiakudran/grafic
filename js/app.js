document.getElementById('enter').addEventListener('click', function() {
    const deltaX = parseInt(document.getElementById('x').value, 10);
    const deltaY = parseInt(document.getElementById('y').value, 10);

    if (isNaN(deltaX) || isNaN(deltaY)) {
        alert('Будь ласка, введіть обидва значення Δx і Δy');
        return;
    }

    console.log(`Введене значення Δx: ${deltaX}`);
    console.log(`Введене значення Δy: ${deltaY}`);

    const coordinates = performCalculation(deltaX, deltaY);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Визначаємо масштабування, щоб графік не виходив за межі полотна
    const maxX = Math.max(...coordinates.map(coord => coord.x));
    const maxY = Math.max(...coordinates.map(coord => coord.y));
    const scaleX = (canvas.width) / maxX;
    const scaleY = (canvas.height) / maxY;
    const scale = Math.min(scaleX, scaleY);

    // Малюємо сітку з цифрами
    drawGrid(ctx, canvas.width, canvas.height, scale, maxX, maxY);

    // Малюємо графік
    ctx.beginPath();
    ctx.moveTo(50, canvas.height); // Початкова точка з лівого нижнього кута

    coordinates.forEach(coord => {
        ctx.lineTo(coord.x * scale, canvas.height - coord.y * scale); // Масштабування координат для візуалізації
    });

    ctx.stroke();
});

function performCalculation(x, y) {
    let tempX = 0.0;
    let tempY = 0.0;

    let coordinates = [];

    let bp = compareNumbers(x, y);
    let mp = (bp === x) ? y : x;

    let resultsOF = [];

    let of0 = Math.floor(bp / 2);
    resultsOF.push(of0);
    coordinates.push({ x: tempX, y: tempY });

    let of;

    for (let i = 0; i <= bp; i++) {
        if (resultsOF[i] < 0) {
            of = (resultsOF[i] + bp - mp);
            resultsOF.push(of);
        } else {
            of = (resultsOF[i] - mp);
            resultsOF.push(of);
        }
        console.log(`OF${i} = ${resultsOF[i]}`);
    }

    for (let i = 1; i < resultsOF.length - 1; i++) {
        if (resultsOF[i] < 0) {
            tempX++;
            tempY++;
        } else {
            if (bp === x) tempX++;
            else tempY++;
        }
        coordinates.push({ x: tempX, y: tempY });
    }

    coordinates.forEach((coord, index) => {
        console.log(`Coordinates ${index}: x = ${coord.x}, y = ${coord.y}`);
    });

    return coordinates;
}

function compareNumbers(x, y) {
    return (x > y) ? x : y;
}

// Функція для малювання сітки з цифрами
function drawGrid(ctx, width, height, scale, maxX, maxY) {
    ctx.strokeStyle = '#e0e0e0'; // Колір ліній сітки
    ctx.lineWidth = 1;

    // Малюємо вертикальні лінії та цифри на осі X
    for (let x = 0; x <= width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(x, 0);
        ctx.stroke();
        
        // Додаємо цифри на осі X
        let value = (x) / scale;
        ctx.fillStyle = '#000000';
        ctx.font = '10px Arial';
        ctx.fillText(value.toFixed(0), x, height);
    }

    // Малюємо горизонтальні лінії та цифри на осі Y
    for (let y = height; y >= 0; y -= scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        // Додаємо цифри на осі Y
        let value = (height - y) / scale;
        ctx.fillStyle = '#000000';
        ctx.font = '10px Arial';
        ctx.fillText(value.toFixed(0), 0, y);
    }

    // Малюємо осі
    ctx.strokeStyle = '#000000'; // Чорний колір для осей
    ctx.lineWidth = 2;

    // Горизонтальна вісь
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(width, height);
    ctx.stroke();

    // Вертикальна вісь
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.stroke();
}
