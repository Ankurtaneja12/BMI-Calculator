document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateBMI();
});

function calculateBMI() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    // Calculate BMI
    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);

    // Determine BMI status based on age, gender, and BMI value
    let bmiResultText = '';
    if (age >= 18) {
        if (gender === 'male') {
            if (bmi < 18.5) {
                bmiResultText = 'Underweight';
            } else if (bmi >= 18.5 && bmi < 25) {
                bmiResultText = 'Healthy weight';
            } else if (bmi >= 25 && bmi < 30) {
                bmiResultText = 'Overweight';
            } else {
                bmiResultText = 'Obese';
            }
        } else if (gender === 'female') {
            if (bmi < 18.5) {
                bmiResultText = 'Underweight';
            } else if (bmi >= 18.5 && bmi < 24) {
                bmiResultText = 'Healthy weight';
            } else if (bmi >= 24 && bmi < 29) {
                bmiResultText = 'Overweight';
            } else {
                bmiResultText = 'Obese';
            }
        }
    } else {
        bmiResultText = 'BMI calculation is applicable only for adults (age 18 and above).';
    }

    // Store BMI result and diet plan in session storage
    sessionStorage.setItem('bmiResult', `${bmi} (${bmiResultText})`);
    sessionStorage.setItem('bmiStatus', bmiResultText);
    sessionStorage.setItem('age', age);
    sessionStorage.setItem('gender', gender);
    sessionStorage.setItem('weight', weight)

    // Calculate and store diet plan
    const dietPlan = calculateDietPlan(bmiResultText);
    sessionStorage.setItem('dietPlan', dietPlan);

    // Redirect to result page
    window.location.href = 'result.php';
}

function calculateDietPlan(bmiResult) {
    let dietPlan = '';
    switch (bmiResult) {
        case 'Underweight':
            dietPlan = 'Increase intake of proteins and healthy fats. Include more calories in your diet.';
            break;
        case 'Healthy weight':
            dietPlan = 'Maintain a balanced diet with a variety of fruits, vegetables, lean proteins, and whole grains.';
            break;
        case 'Overweight':
            dietPlan = 'Reduce calorie intake by limiting processed foods and sugary drinks. Increase physical activity.';
            break;
        case 'Obese':
            dietPlan = 'Consult a healthcare professional for a personalized weight loss plan. Focus on healthy eating and regular exercise.';
            break;
        default:
            dietPlan = 'Unable to retrieve diet plan.';
    }
    return dietPlan;
}
