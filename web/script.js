document.getElementById('jsonForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const jsonString = document.getElementById('jsonInput').value.trim();

    fetch('/parse-json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jsonString })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error); });
        }
        return response.json();
    })
    .then(data => {
        const jsonBlob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });
        const jsonUrl = URL.createObjectURL(jsonBlob);
        window.open(jsonUrl, '_blank');
    })
    .catch(error => {
        alert(`Error: ${error.message}`);
    });
});
