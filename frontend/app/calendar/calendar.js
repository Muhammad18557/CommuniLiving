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

    // Fetch data from API and update table
    fetchDataAndUpdateTable();

    function fetchDataAndUpdateTable() {
        fetch('http://localhost:8000/api/timetable/')
            .then(response => response.json())
            .then(data => {
                updateTableWithBookingData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function updateTableWithBookingData(data) {
        data.forEach(amenity => {
            amenity.time_slots.forEach(slot => {
                if (slot.is_booked) {
                    // Adjusting the time format from API to match the table format
                    let formattedStartTime = formatTime(slot.start_time);
                    let formattedEndTime = formatTime(slot.end_time);
                    markSlotAsBooked(amenity.amenity, formattedStartTime, formattedEndTime);
                }
            });
        });
    }

    function markSlotAsBooked(amenity, startTime, endTime) {
        let timeSlot = `${startTime} - ${endTime}`;
        let rows = document.querySelectorAll('#scheduleTable tr');
    
        rows.forEach((row, index) => {
            if (index === 0) return;
    
            let timeCell = row.cells[0];
            if (timeCell.textContent === timeSlot) {
                for (let i = 1; i < row.cells.length; i++) {
                    let cell = row.cells[i];
                    let cellHeader = document.querySelector(`#scheduleTable th:nth-child(${i + 1})`).textContent;
                    if (cellHeader === amenity) {
                        cell.classList.add('booked');
                        break;
                    }
                }
            }
        });
    }

    function formatTime(apiTime) {
        // Converts time from "HH:MM" to "HHMM"
        return apiTime.replace(':', '');
    }
});

function generateTimeSlots() {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} - ${hour.toString().padStart(2, '0')}:${(minute + 30).toString().padStart(2, '0')}`;
            slots.push(time);
        }
    }
    return slots;
}
