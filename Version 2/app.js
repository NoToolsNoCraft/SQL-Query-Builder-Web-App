document.getElementById('generateQuery').addEventListener('click', function() {
    const queryType = document.getElementById('queryType').value;

    // Get table inputs
    const tableInputs = Array.from(document.querySelectorAll('.table-input'))
        .map(input => input.value)
        .filter(value => value.trim() !== '');

    // Get join inputs
    const joinType = document.getElementById('join-type').value;
    const joinTableName = document.querySelector('.join-table-name').value.trim();
    const joinColumnName = document.querySelector('.join-column-name').value.trim();

    // Get column inputs
    const columnInputs = Array.from(document.querySelectorAll('.column-input'))
        .map(input => input.value)
        .filter(value => value.trim() !== '');

    // Get conditions
    const conditions = document.getElementById('conditions').value.trim();

    // Get group by inputs
    const groupByInputs = Array.from(document.querySelectorAll('.group-by-input'))
        .map(input => input.value)
        .filter(value => value.trim() !== '');

    // Get having conditions
    const havingConditions = document.getElementById('havingConditions').value.trim();

    // Get order by inputs
    const orderByInputs = Array.from(document.querySelectorAll('.order-by-input'))
        .map(input => input.value)
        .filter(value => value.trim() !== '');

    // Get limit
    const limit = document.getElementById('limit').value.trim();

    // Construct the SQL query
    let query = queryType;

    // Handle SELECT COUNT(DISTINCT) and AVG() differently
    if (queryType === 'SELECT COUNT(DISTINCT )' && columnInputs.length > 0) {
        query = `SELECT COUNT(DISTINCT ${columnInputs[0]})`;
    } else if (queryType === 'SELECT AVG()' && columnInputs.length > 0) {
        query = `SELECT AVG(${columnInputs[0]})`;
    } else {
        if (columnInputs.length > 0) {
            query += ` ${columnInputs.join(', ')}`;
        } else {
            query += ' *';
        }
    }

    if (tableInputs.length > 0) {
        query += ` \nFROM ${tableInputs[0]}`;
    }

    // Add JOIN clause
    if (joinType && joinTableName && joinColumnName) {
        query += ` \n${joinType} ${joinTableName} ON ${tableInputs[0]}.${joinColumnName} = ${joinTableName}.${joinColumnName}`;
    }

    if (conditions) {
        query += ` \nWHERE ${conditions}`;
    }

    if (groupByInputs.length > 0) {
        query += `\nGROUP BY ${groupByInputs.join(', ')}`;
    }

    // Add HAVING clause if conditions are provided
    if (havingConditions) {
        query += `\nHAVING ${havingConditions}`;
    }

    if (orderByInputs.length > 0) {
        query += `\nORDER BY ${orderByInputs.join(', ')}`;
    }

    if (limit) {
        query += `\nLIMIT ${limit}`;
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

// Add event listener for the "Add Group By" button
document.getElementById('addGroupBy').addEventListener('click', function() {
    const groupByInputsDiv = document.getElementById('groupByInputs');
    
    // Create a new div for group by input and remove button
    const groupByInputContainer = document.createElement('div');
    groupByInputContainer.className = 'group-by-input-container';

    // Create a new input element for a group by column
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'group-by-input';
    newInput.placeholder = 'e.g., category';

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-group-by';
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', function() {
        groupByInputContainer.remove();
    });

    // Append the new input and remove button to the container
    groupByInputContainer.appendChild(newInput);
    groupByInputContainer.appendChild(removeButton);
    
    // Append the container to the group by inputs div
    groupByInputsDiv.appendChild(groupByInputContainer);
});

// Add event listener for the "Add Order By" button
document.getElementById('addOrderBy').addEventListener('click', function() {
    const orderByInputsDiv = document.getElementById('orderByInputs');
    
    // Create a new div for order by input and remove button
    const orderByInputContainer = document.createElement('div');
    orderByInputContainer.className = 'order-by-input-container';

    // Create a new input element for an order by column
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'order-by-input';
    newInput.placeholder = 'e.g., price DESC';

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-order-by';
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', function() {
        orderByInputContainer.remove();
    });

    // Append the new input and remove button to the container
    orderByInputContainer.appendChild(newInput);
    orderByInputContainer.appendChild(removeButton);
    
    // Append the container to the order by inputs div
    orderByInputsDiv.appendChild(orderByInputContainer);
});
