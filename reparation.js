document.addEventListener('DOMContentLoaded', function() {
    const tableReparation = document.getElementById('tableReparation').getElementsByTagName('tbody')[0];

    // Retrieve data from localStorage
    let reclamations = JSON.parse(localStorage.getItem('reclamations')) || [];

    // Populate table with data
    reclamations.forEach((reclamation, index) => {
        const row = tableReparation.insertRow();
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${reclamation.idReclamation}</td>
            <td>${reclamation.projet}</td>
            <td>${reclamation.marche}</td>
            <td>${reclamation.equipement}</td>
            <td>${reclamation.typeEquipement}</td>
            <td>${reclamation.reference}</td>
            <td>${reclamation.matriculation}</td>
            <td>${reclamation.statut}</td>
            <td>${reclamation.observation}</td>
            <td><button onclick="reviseRow(this)">Réviser</button></td> <!-- Add button to each row -->
        `;
    });
});

// Function to handle row revision
function reviseRow(button) {
    // Get the data from the row of the clicked button
    const row = button.closest('tr');
    const rowData = {
        IDreclamation : row.cells[1].textContent,
        projet: row.cells[2].textContent,
        marche: row.cells[3].textContent,
        equipement: row.cells[4].textContent,
        typeEquipement: row.cells[5].textContent,
        reference: row.cells[6].textContent,
        matriculation: row.cells[7].textContent,
        statut: row.cells[8].textContent,
        observation: row.cells[9].textContent
    };

    // Store the data in localStorage to pass it to the new page
    localStorage.setItem('revisionData', JSON.stringify(rowData));

    // Navigate to the revision page
    window.location.href = 'revision.html';
}

// Function to handle navigation
function navigateTo(url) {
    window.location.href = url;
}
