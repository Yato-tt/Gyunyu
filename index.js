async function fetchData(tipo, categoria) {
    try {
        const response = await fetch(`https://api.waifu.pics/${tipo}/${categoria}`);
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados: ' + error);
    }
}

function displayWaifu(waifus) {
    const container = document.getElementById('pictureWaifu')
    container.innerHTML = '';
    if (waifus && waifus.url) {
        const card = document.createElement('div');
        card.className = 'waifu-card';
        card.innerHTML = `
        <h2>Waifu</h2>
        <img src="${waifus.url}" alt="Waifu Image" />
        `;
        container.appendChild(card)
    } else {
        container.innerHTML = '<p>Nenhuma waifu encontrada</p>'
    }
}

document.getElementById('searchWaifu').addEventListener('click', async () => {
    const tipo = document.querySelector('input[name="type"]:checked');
    const categoria = document.getElementById('categoria').value;

    if (!tipo) {
        alert('Selecione ao menos um tipo!');
        return;
    }

    const data = await fetchData(tipo.value, categoria); // Usa o valor do tipo selecionado
    displayWaifu(data);
})