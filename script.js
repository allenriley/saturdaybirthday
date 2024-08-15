// script.js
document.getElementById('birthdateForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally
    const birthdate = document.getElementById('birthdate').value;
    const resultsContainer = document.getElementById('result');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (birthdate) {
        const nextSaturdayBirthday = findNextSaturdayBirthday(birthdate);
        if (nextSaturdayBirthday) {
            const age = nextSaturdayBirthday.getFullYear() - new Date(birthdate + 'T12:00').getFullYear();
            const formattedDate = nextSaturdayBirthday.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            resultsContainer.textContent = `Your next Saturday birthday is ${formattedDate}. Let the truth be told, you'll be ${age} years old!`;
        } else {
            resultsContainer.textContent = 'No upcoming Saturday birthday found.';
        }
    } else {
        resultsContainer.textContent = 'Please enter a valid date.';
    }
});

function findNextSaturdayBirthday(birthdate) {
    const date = new Date(birthdate + 'T12:00'); // Set time to noon to avoid timezone issues
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to start of day for accurate comparison
    for (let year = today.getFullYear(); year < today.getFullYear() + 123; year++) {
        const newDate = new Date(date);
        newDate.setFullYear(year);
        if (newDate.getDay() === 6 && newDate >= today) { // 6 is Saturday in JavaScript's Date
            return newDate;
        }
    }
    return null;
}
