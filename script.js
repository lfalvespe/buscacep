
function buscaCep() {
    inputCep = document.querySelector('#cep');
    const CEP = inputCep.value.replace('-', '');
    const url = `https://viacep.com.br/ws/${CEP}/json/`;

    const dataContainer = document.querySelector('#data_container');
    const lista = document.querySelector('#lista');

    
    if(!CEP) {
        alert('Digite um CEP.');
        inputCep.focus();
    } else if (CEP.length != 8) {
        alert('Digite um cep com 8 dígitos.')
    } else {   
        fetch(url).then(res => res.json()).then(data => {
            console.log(data);
    
            const cep = document.querySelector('#cepConsultado');
            cep.innerText = `${data.cep}`;
            
            const rua = document.createElement('li');
            const bairro = document.createElement('li');
            const cidade = document.createElement('li');
            const estado = document.createElement('li');
    
            rua.innerText = `RUA: ${data.logradouro}`;
            bairro.innerText = `Bairro: ${data.bairro}`;
            cidade.innerText = `Cidade: ${data.localidade}`;
            estado.innerText = `Estado: ${data.uf}`;

            lista.innerHTML = '';
            dataContainer.classList.remove('hide');

            lista.appendChild(rua);
            lista.appendChild(bairro);
            lista.appendChild(cidade);
            lista.appendChild(estado);
    
            inputCep.value = '';
            inputCep.focus();
    
        }).catch(erro => {
            lista.innerHTML = 'Digite um CEP válido';
            dataContainer.classList.remove('hide');

            inputCep.value = '';
            inputCep.focus();
        })
    }
    
}


btnProcurar = document.querySelector('#btn_procurar');

btnProcurar.addEventListener("click", (event) => {
    event.preventDefault();

    buscaCep();
})