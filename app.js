const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/calculate-bmi', (req, res) => {
    const { weight, height } = req.body;
    const bmi = (weight / (height * height)).toFixed(2);
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 24.9) category = 'Normal weight';
    else if (bmi < 29.9) category = 'Overweight';
    else category = 'Obese';
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>BMI Result</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;500&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <div class="container text-center">
                <h1 class="title">BMI Result</h1>
                <p class="result-message">Your BMI is <strong>${bmi}</strong> (${category})</p>
                <a href="/" class="btn btn-primary">Back</a>
            </div>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
