let instructions = document.querySelector('#instructions')


function buscaCep() {
  inputCep = document.querySelector("#cep");
  const CEP = inputCep.value.replace("-", "");
  const url = `https://viacep.com.br/ws/${CEP}/json/`;

  const dataContainer = document.querySelector("#data_container");
  const lista = document.querySelector("#lista");

  if (!CEP) {
    alert("Digite um CEP.");
    inputCep.focus();
  } else if (CEP.length != 8) {
    alert("Digite um cep com 8 dígitos.");
  } else {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const cep = document.querySelector("#cepConsultado");

        const rua = document.createElement("li");
        const bairro = document.createElement("li");
        const cidade = document.createElement("li");
        const estado = document.createElement("li");

        if (!data.erro) {
          lista.innerHTML = "";
          cep.innerHTML = `  <span class="text-light px-2 shadow rounded">CEP PESQUISADO: </span> <span class="text-warning">${data.cep}</span>`;
          rua.innerHTML = `<strong>Logradouro</strong>: ${data.logradouro}`;
          bairro.innerHTML = `<strong>Bairro</strong>: ${data.bairro}`;
          cidade.innerHTML = `<strong>Cidade</strong>: ${data.localidade}`;
          estado.innerHTML = `<strong>Estado</strong>: ${data.uf}`;

          lista.appendChild(rua);
          lista.appendChild(bairro);
          lista.appendChild(cidade);
          lista.appendChild(estado);

          dataContainer.classList.remove('invisible')
          instructions.classList.add('invisible')

        } else {
          dataContainer.classList.remove('invisible');
          lista.innerHTML = "<p class='text-danger'>Digite um CEP válido</p>";
          cep.innerHTML = `<span>Erro 😐</span>`;
        }

        inputCep.value = "";
        inputCep.focus();
      })
      .catch((error) => {
        inputCep.value = "";
        inputCep.focus();
        console.log(error);
      });
  }
}

btnProcurar = document.querySelector("#btn_procurar");

btnProcurar.addEventListener("click", (event) => {
  event.preventDefault();
  buscaCep();
});
