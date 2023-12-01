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


    // Fetch bookings from database
    const fetchBookings = () => {
        const selectedDate = currentDate.toISOString().split('T')[0];
        axios.get(`http://localhost:8000/api/bookings?date=${selectedDate}`)
            .then(response => {
                markBookedSlots(response.data);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
            });
    };

    function markBookedSlots(bookings) {
        bookings.forEach(booking => {
            const startTime = booking.start_time; // need to adjust according to date format
            const endTime = booking.end_time; // ^
            const amenityId = booking.amenity_id; // ^
            // TO-DO: implement logic to find the cell in the table and mark it as booked
        });
    }

    // Call fetchBookings whenever the date changes
    updateDateDisplay();
    fetchBookings();
    document.getElementById('prevDay').addEventListener('click', function() {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateDisplay();
        fetchBookings();
    });

    document.getElementById('nextDay').addEventListener('click', function() {
        currentDate.setDate(currentDate.getDate() + 1);
        updateDateDisplay();
        fetchBookings();
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

