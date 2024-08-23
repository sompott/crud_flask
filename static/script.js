document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('item-form');
    const itemList = document.getElementById('item-list');

    // Function to fetch and display items
    function fetchItems() {
        fetch('/items')
            .then(response => response.json())
            .then(data => {
                itemList.innerHTML = '';
                data.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item';
                    listItem.innerHTML = `
                        <strong>${item.name}</strong>
                        <p>${item.description}</p>
                        <small>Created At: ${item.created_at}</small>
                        <small>Updated At: ${item.updated_at}</small>
                        <button class="btn btn-danger btn-sm float-right ml-2" onclick="deleteItem(${item.id})">Delete</button>
                    `;
                    itemList.appendChild(listItem);
                });
            });
    }

    // Fetch items on page load
    fetchItems();

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;

        fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
        })
        .then(response => response.json())
        .then(() => {
            form.reset();
            fetchItems();
        });
    });

    // Function to delete an item
    window.deleteItem = function(id) {
        fetch(`/items/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            fetchItems();
        });
    }
});
