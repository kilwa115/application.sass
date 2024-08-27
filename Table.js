document.addEventListener('DOMContentLoaded', function() {
    const reclamationTable = document.getElementById('reclamationTable').getElementsByTagName('tbody')[0];

    // Retrieve data from localStorage
    let reclamations = JSON.parse(localStorage.getItem('reclamation')) || [];

    // Check data structure
    console.log('Reclamations:', reclamations);

    // Populate the table with the reclamation data
    reclamations.forEach(function(reclamation, index) {
        let row = reclamationTable.insertRow();

        // Checkbox cell
        let selectCell = row.insertCell(0);
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'rowSelector';
        checkbox.value = index;
        selectCell.appendChild(checkbox);

        // Populate other cells with reclamation data
        row.insertCell(1).innerText = reclamation.idReclamation;
        row.insertCell(2).innerText = reclamation.date;
        row.insertCell(3).innerText = reclamation.projet;
        row.insertCell(4).innerText = reclamation.marche;
        row.insertCell(5).innerText = reclamation.equipement;
        row.insertCell(6).innerText = reclamation.typeEquipement;
        row.insertCell(7).innerText = reclamation.reference;
        row.insertCell(8).innerText = reclamation.matriculation;
        row.insertCell(9).innerText = reclamation.statut;
        row.insertCell(10).innerText = reclamation.observation;
    });

    // Handle submission of selected rows
    document.getElementById('submitSelected').addEventListener('click', function() {
        const selectedRows = document.querySelectorAll('.rowSelector:checked');
        
        if (selectedRows.length > 0) {
            selectedRows.forEach(function(checkbox) {
                const rowIndex = parseInt(checkbox.value);
                console.log('Selected Réclamation:', reclamations[rowIndex]);
            });
        } else {
            alert('Aucune ligne sélectionnée.');
        }
    });
});
