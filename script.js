// script.js
document.getElementById('birthdateForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally
    const birthdate = document.getElementById('birthdate').value;
    const resultsContainer = document.getElementById('result');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (birthdate) {
        const saturdayBirthdays = findSaturdays(birthdate);
        const resultList = document.createElement('ul');
        saturdayBirthdays.forEach(date => {
            const item = document.createElement('li');
            const age = date.getFullYear() - new Date(birthdate + 'T12:00').getFullYear();
            const formattedDate = `${padZero(date.getMonth() + 1)}/${padZero(date.getDate())}/${date.getFullYear()}`;
            item.textContent = `${formattedDate} - Let the Truth Be Told, You're ${age} Years Old`;
            resultList.appendChild(item);
        });
        resultsContainer.appendChild(resultList);
    } else {
        resultsContainer.textContent = 'Please enter a valid date.';
    }
});

function findSaturdays(birthdate) {
    const date = new Date(birthdate + 'T12:00'); // Set time to noon to avoid timezone issues
    const results = [];
    for (let year = date.getFullYear(); year < date.getFullYear() + 123; year++) {
        const newDate = new Date(date);
        newDate.setFullYear(year);
        if (newDate.getDay() === 6) { // 6 is Saturday in JavaScript's Date
            results.push(new Date(newDate));
        }
    }
    return results;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}
