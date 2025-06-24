  async function fetchData(tipo, categoria) {
    try {
        const response = await fetch(`https://api.waifu.pics/${tipo}/${categoria}`);
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        const data = await response.json();
        console.log(data);
        
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados: ' + error);
    }
}

function displayWaifu(waifusRay) {
    const container = document.querySelector('#pictureWaifu');
    container.innerHTML = '';

    if (waifusRay && waifusRay.length > 0) {
        waifusRay.forEach(waifus => {
            if (waifus && waifus.url) {
                const card = document.createElement('div');
                card.className = 'waifu-card';
                card.innerHTML = `<img src="${waifus.url}" alt="request image" />`;
                container.appendChild(card);
    }
        });
    } else {
        container.innerHTML = '<p>Nenhuma waifu encontrada</p>'
    }
}

addEventListener('click', () => {
    const trash = document.querySelector('#pictureWaifu');
    trash.innerHTML = '';
});

function setType() {
    const radioType = document.querySelector('input[name="type"]:checked');
    const catType = document.querySelector('#flags');
    catType.innerHTML = '';

    if(radioType) {
        const sfw = radioType.value;

        if(sfw === 'sfw'){
            const card = document.createElement('div');
            card.setAttribute('class', 'nsfw');
            if (window.innerWidth < 768) {
            document.body.style.backgroundImage = "url('./assets/imgs/safe_bg.jpg')";
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';} else {
            document.body.style.backgroundImage = "url('./assets/imgs/safe_bg_desk.png')";
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';                
            }

            card.innerHTML = `<p><label><input type='radio' name='nosafe' value='waifu'> waifu</label> <label><input type='radio' name='nosafe' value='neko'> neko</label> <label><input type='radio' name='nosafe' value='shinobu'> shinobu</label> <label><input type='radio' name='nosafe' value='megumin'> megumin</label> <label><input type='radio' name='nosafe' value='bully'> bully</label> <label><input type='radio' name='nosafe' value='cuddle'> cuddle</label> <label><input type='radio' name='nosafe' value='cry'> cry</label> <label><input type='radio' name='nosafe' value='hug'> hug</label> <label><input type='radio' name='nosafe' value='awoo'> awoo</label> <label><input type='radio' name='nosafe' value='kiss'> kiss</label> <label><input type='radio' name='nosafe' value='lick'> lick</label> <label><input type='radio' name='nosafe' value='pat'> pat</label> <label><input type='radio' name='nosafe' value='smug'> smug</label> <label><input type='radio' name='nosafe' value='bonk'> bonk</label> <label><input type='radio' name='nosafe' value='yeet'> yeet</label> <label><input type='radio' name='nosafe' value='blush'> blush</label> <label><input type='radio' name='nosafe' value='smile'> smile</label> <label><input type='radio' name='nosafe' value='wave'> wave</label> <label><input type='radio' name='nosafe' value='highfive'> highfive</label> <label><input type='radio' name='nosafe' value='handhold'> handhold</label> <label><input type='radio' name='nosafe' value='nom'> nom</label> <label><input type='radio' name='nosafe' value='bite'> bite</label> <label><input type='radio' name='nosafe' value='glomp'> glomp</label> <label><input type='radio' name='nosafe' value='slap'> slap</label> <label><input type='radio' name='nosafe' value='kill'> kill</label> <label><input type='radio' name='nosafe' value='kick'> kick</label> <label><input type='radio' name='nosafe' value='happy'> happy</label> <label><input type='radio' name='nosafe' value='wink'> wink</label> <label><input type='radio' name='nosafe' value='poke'> poke</label> <label><input type='radio' name='nosafe' value='dance'> dance</label> <label><input type='radio' name='nosafe' value='cringe'> cringe</label></p>`;
            catType.appendChild(card);
        } else if (sfw === 'nsfw'){
            const card = document.createElement('div');
            card.setAttribute('class', 'nsfw')
            const noCheck = document.querySelectorAll("input[name='nosafe']");
            if (window.innerWidth < 768) {
            document.body.style.backgroundImage = "url('./assets/imgs/nsf_bg.jpg')";
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';} else {
            document.body.style.backgroundImage = "url('./assets/imgs/nsf_bg_desk.png')";
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center'; }

            card.innerHTML = '<label><input type="radio" name="nosafe" value="waifu"> Waifu</label> <label><input type="radio" name="nosafe" value="neko"> Neko</label> <label><input type="radio" name="nosafe" value="trap"> Trap</label> <label><input type="radio" name="nosafe" value="blowjob"> Blowjob</label>';
            noCheck.forEach(radio => () => {
                radio.addEventListener('change', () => {
                    if(this.checked) {
                        noCheck.forEach(otherRadios => {
                            if (otherRadios !== this) {
                                otherRadios.checked = false;
                            }
                        });
                    }
                });
            });

            catType.appendChild(card);
        } 
    }
     
}

const radios = document.querySelectorAll('input[name="type"]');
radios.forEach(radio => {
    radio.addEventListener('change', setType);
});

document.querySelector('#searchWaifu').addEventListener('click', async () => {

const container = document.querySelector('#pictureWaifu');
container.innerHTML = '<img src="./oppais-loading.gif" alt="request image" />';

const tipo = document.querySelector('input[name="type"]:checked');
    const categoria = document.querySelector('input[name="nosafe"]:checked');

    if (!tipo) {
        alert('Selecione ao menos um tipo!');
        return;
    } else if (!categoria) {
        alert ('Vocé é tapado? Selecione a categoria!');
        return;
    }

    try {
        const request = Array(20).fill().map(() => fetchData(tipo.value, categoria.value));
        const result = await Promise.all(request);
        displayWaifu(result);
    } catch (e) {
        console.error('Erro ao buscar waifus:', error);
        container.innerHTML = '<p>Ocorreu um erro ao buscar as waifus.</p>';
    }

    // const data = await fetchData(tipo.value, categoria.value); // Usa o valor do tipo selecionado
    // displayWaifu(data);
    
});