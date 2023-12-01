document.addEventListener('DOMContentLoaded', function() {
    
    // Generate date picker
    
    const currentDateElement = document.getElementById('currentDate');
    let currentDate = new Date();

    function updateDateDisplay() {
        currentDateElement.textContent = currentDate.toISOString().split('T')[0];
    }

    updateDateDisplay();

    document.getElementById('prevDay').addEventListener('click', function() {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateDisplay();
    });

    document.getElementById('nextDay').addEventListener('click', function() {
        currentDate.setDate(currentDate.getDate() + 1);
        updateDateDisplay();
    });

    // Generate schedule table
    
    const table = document.getElementById('scheduleTable');
    const timeSlots = generateTimeSlots();

    timeSlots.forEach(time => {
        const row = table.insertRow();
        const timeCell = row.insertCell();
        timeCell.textContent = time;

        for (let i = 1; i <= 3; i++) {
            const cell = row.insertCell();
            cell.addEventListener('click', function() {
                this.classList.toggle('highlighted');
            });
        }
    });
});

function generateTimeSlots() {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')} - ${hour.toString().padStart(2, '0')}${(minute + 30).toString().padStart(2, '0')}`;
            slots.push(time);
        }
    }
    return slots;
}

