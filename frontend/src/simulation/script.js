document.addEventListener('DOMContentLoaded', function () {
    // Get necessary elements
    const editButton = document.getElementById('editButton');
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');

    // Function to handle edit button click
    editButton.addEventListener('click', () => {
        groupBox.style.display = 'none';
        editModal.style.display = 'block';
    });

    // Function to handle form submission
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const room = document.getElementById('roomSelect').value;
        const action = document.getElementById('actionSelect').value;
        if (action === 'placeInhabitant') {
            alert(`Placing inhabitant in ${room}`);
            // Write the placement of person in simulator
        } else if (action === 'blockWindow') {
            alert(`Blocking window in ${room}`);
            // Write the window block in simulator
        }
        editModal.style.display = 'none';
        groupBox.style.display = 'block';
    });
});

