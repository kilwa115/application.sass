document.addEventListener('DOMContentLoaded', function() {
    const formReclamation = document.getElementById('formReclamation');

    if (formReclamation) {
        // Initialize or increment the ID counter
        const idKey = 'reclamationIdCounter';
        let idCounter = parseInt(localStorage.getItem(idKey)) || 0;

        // Generate a unique ID for ID-Réclamation in the format REC 000000001
        function generateIdReclamation() {
            idCounter += 1;
            localStorage.setItem(idKey, idCounter); // Store the updated counter
            const formattedId = `REC ${String(idCounter).padStart(9, '0')}`;
            return formattedId;
        }

        const idReclamation = generateIdReclamation();
        const idReclamationField = document.getElementById("idReclamation");
        if (idReclamationField) {
            idReclamationField.value = idReclamation;
        } else {
            console.error('ID Réclamation element not found');
        }

        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        const dateField = document.getElementById("date");
        if (dateField) {
            dateField.value = today;
        } else {
            console.error('Date element not found');
        }

        // Dropdown options
        const projets = ["Projet A", "Projet B", "Projet C"];
        const marches = ["Marché 1", "Marché 2", "Marché 3"];
        const equipements = ["Équipement X", "Équipement Y", "Équipement Z"];
        const typeEquipements = ["Type 1", "Type 2", "Type 3"];
        const references = ["Référence A", "Référence B", "Référence C"];
        const matriculations = ["Matriculation A", "Matriculation B", "Matriculation C"];

        populateDropdown("projet", projets);
        populateDropdown("marche", marches);
        populateDropdown("equipement", equipements);
        populateDropdown("typeEquipement", typeEquipements);
        populateDropdown("reference", references);
        populateDropdown("Matriculation", matriculations);

        // Set default value for Statut
        const statutField = document.getElementById("statut");
        if (statutField) {
            statutField.value = 'Nv Réclam';
        } else {
            console.error('Statut element not found');
        }

        function populateDropdown(id, options) {
            const select = document.getElementById(id);
            if (select) {
                select.innerHTML = ''; // Clear existing options
                options.forEach(option => {
                    const opt = document.createElement("option");
                    opt.value = option;
                    opt.innerHTML = option;
                    select.appendChild(opt);
                });
            } else {
                console.error(`Dropdown with ID ${id} not found`);
            }
        }

        // Handle form submission
        formReclamation.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get all form values
            const formData = {
                idReclamation: document.getElementById('idReclamation').value,
                date: document.getElementById('date').value,
                projet: document.getElementById('projet').value,
                marche: document.getElementById('marche').value,
                equipement: document.getElementById('equipement').value,
                typeEquipement: document.getElementById('typeEquipement').value,
                reference: document.getElementById('reference').value,
                matriculation: document.getElementById('Matriculation').value,
                statut: document.getElementById('statut').value,
                observation: document.getElementById('observation').value
            };

            // Save data to localStorage
            let reclamations = JSON.parse(localStorage.getItem('reclamations')) || [];
            reclamations.push(formData);
            localStorage.setItem('reclamations', JSON.stringify(reclamations));

            // Redirect to Table.html
            window.location.href = 'Table.html';
        });
    } else {
        console.error('Form Réclamation element not found');
    }
});
