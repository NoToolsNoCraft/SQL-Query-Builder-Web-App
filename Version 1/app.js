document.getElementById('generateQuery').addEventListener('click', function() {
    // Get the selected query type
    const queryType = document.getElementById('queryType').value;

    // Collect all table inputs
    const tableInputs = document.querySelectorAll('.table-input');
    const tables = Array.from(tableInputs)
                        .map(input => input.value.trim())
                        .filter(value => value.length > 0);

    // Collect all column inputs
    const columnInputs = document.querySelectorAll('.column-input');
    const columns = Array.from(columnInputs)
                         .map(input => input.value.trim())
                         .filter(value => value.length > 0);

    const condition = document.getElementById('conditions').value;
    
    let query = '';
    if (queryType === 'SELECT') {
        query = `SELECT ${columns.join(', ')} FROM ${tables.join(', ')}`;
    } else if (queryType === 'SELECT AVG()') {
        query = `SELECT AVG(${columns.join(', ')}) FROM ${tables.join(', ')}`;
    } else if (queryType === 'SELECT COUNT(DISTINCT )') {
        query = `SELECT COUNT(DISTINCT ${columns.join(', ')}) FROM ${tables.join(', ')}`;
    }

    if (condition) {
        query += ` WHERE ${condition}`;
    }

    document.getElementById('query').textContent = query;
});

// Add event listener for the "Add Column" button
document.getElementById('addColumn').addEventListener('click', function() {
    const columnInputsDiv = document.getElementById('columnInputs');
    
    // Create a new div for column input and remove button
    const columnInputContainer = document.createElement('div');
    columnInputContainer.className = 'column-input-container';

    // Create a new input element for a column
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'column-input';
    newInput.placeholder = 'e.g., name';

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-column';
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', function() {
        columnInputContainer.remove();
    });

    // Append the new input and remove button to the container
    columnInputContainer.appendChild(newInput);
    columnInputContainer.appendChild(removeButton);
    
    // Append the container to the column inputs div
    columnInputsDiv.appendChild(columnInputContainer);
});

// Add event listener for the "Add Table" button
document.getElementById('addTable').addEventListener('click', function() {
    const tableInputsDiv = document.getElementById('tableInputs');
    
    // Create a new div for table input and remove button
    const tableInputContainer = document.createElement('div');
    tableInputContainer.className = 'table-input-container';

    // Create a new input element for a table
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'table-input';
    newInput.placeholder = 'e.g., orders';

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-table';
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', function() {
        tableInputContainer.remove();
    });

    // Append the new input and remove button to the container
    tableInputContainer.appendChild(newInput);
    tableInputContainer.appendChild(removeButton);
    
    // Append the container to the table inputs div
    tableInputsDiv.appendChild(tableInputContainer);
});

