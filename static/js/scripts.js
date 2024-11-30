document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const resultElement = document.getElementById('result');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const inputData = {};

        formData.forEach((value, key) => {
            inputData[key] = isNaN(value) || value === '' ? value : parseFloat(value);
        });

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.prediction !== undefined) {
                resultElement.textContent = `${data.prediction === 1 ? "Likely Attrition" : "No Attrition"}`;
            } else if (data.error) {
                resultElement.textContent = `Error: ${data.error}`;
            }

        } catch (error) {
            console.error('Error occurred:', error);
            resultElement.textContent = 'An error occurred while fetching the prediction.';
        }
    });
});
