let instructions = document.querySelector("#instructions");

function buscaCep() {
  inputCep = document.querySelector("#cep");
  const CEP = inputCep.value.replace("-", "");
  const url = `https://viacep.com.br/ws/${CEP}/json/`;

  const dataContainer = document.querySelector("#data_container");
  const lista = document.querySelector("#lista");

  const cep = document.querySelector("#cepConsultado");

  if (!CEP) {
    dataContainer.classList.remove("invisible");
    lista.innerHTML =
      "<div class='col-11 mx-start px-0 text-danger text-center h5'>Campo CEP não pode ser vazio</div>";
    cep.innerHTML = `<span class="px-2">ERRO 😐</span>`;
    instructions.classList.add("hide");

    inputCep.focus();
  } else if (CEP.length != 8) {
    dataContainer.classList.remove("invisible");
    lista.innerHTML =
      "<div class='col-11 mx-start px-0 text-danger text-center h5'>O CEP precisa ter 8 dígitos</div>";
    cep.innerHTML = `<span class="px-2">ERRO 😐</span>`;
    instructions.classList.add("hide");

    inputCep.focus();
  } else {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const rua = document.createElement("li");
        const bairro = document.createElement("li");
        const cidade = document.createElement("li");
        const estado = document.createElement("li");

        if (!data.erro) {
          lista.innerHTML = "";
          cep.innerHTML = ` <div class="text-light px-2 shadow rounded">CEP PESQUISADO: <span class="text-warning ms-1">${data.cep}</span></div>`;
          rua.innerHTML = `<strong>Logradouro</strong>: ${data.logradouro}`;
          bairro.innerHTML = `<strong>Bairro</strong>: ${data.bairro}`;
          cidade.innerHTML = `<strong>Cidade</strong>: ${data.localidade}`;
          estado.innerHTML = `<strong>Estado</strong>: ${data.uf}`;

          lista.appendChild(rua);
          lista.appendChild(bairro);
          lista.appendChild(cidade);
          lista.appendChild(estado);

          dataContainer.classList.remove("invisible");
          instructions.classList.add("hide");
        } else {
          dataContainer.classList.remove("invisible");
          lista.innerHTML =
            "<div class='col-11 mx-start px-0 text-danger text-center h5'>CEP não encontrado</div>";
          cep.innerHTML = `<span class="px-2">ERRO 😐</span>`;
          instructions.classList.add("hide");
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
