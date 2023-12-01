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

    // Fetch and generate table
    fetch('http://localhost:8000/api/timetable/')
        .then(response => response.json())
        .then(data => {
            generateTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function generateTable(data) {
    const table = document.getElementById('scheduleTable');
    const timeSlots = generateTimeSlots();

    // Clear existing table
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Generate the header row
    const headerRow = table.rows[0];
    headerRow.innerHTML = '<th>Time</th>'; // Reset the header row
    data.amenities.forEach(amenity => {
        const th = document.createElement('th');
        th.textContent = amenity.amenity_name;
        headerRow.appendChild(th);
    });

    // Populate table rows
    timeSlots.forEach(time => {
        const row = table.insertRow();
        const timeCell = row.insertCell();
        timeCell.textContent = time;

        data.amenities.forEach(amenity => {
            const cell = row.insertCell();
            const timeSlot = amenity.time_slots.find(slot => `${slot.start_time} - ${slot.end_time}` === time);
            if (timeSlot && timeSlot.is_booked) {
                cell.classList.add('booked');
            }
            cell.addEventListener('click', function() {
                this.classList.toggle('highlighted');
            });
        });
    });
}

function generateTimeSlots() {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const endTime = `${hour.toString().padStart(2, '0')}:${(minute + 30).toString().padStart(2, '0')}`;
            slots.push(`${startTime} - ${endTime}`);
        }
    }
    return slots;
}
