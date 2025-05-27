const quantity = document.querySelector(".quantity")
const start = document.querySelector(".start")
const end = document.querySelector(".end")
const numbers = document.querySelector(".numbers")
const form = document.querySelector("form")

const centralSection = document.querySelector(".central")
const main = document.querySelector("main")
const notRepeatCheckbox = document.querySelector("#notRepeat") // Suponha que tenha um checkbox no HTML


numberFormated(quantity, start, end) 

//----------: VALIDANDO OS INPUTS PARA QUE RECEBA SOMENTE NÚMEROS
function numberFormated(inputNumber) {
  // Observa o evento de escrever no input
  inputNumber.addEventListener("input", () => {
    inputNumber.value = inputNumber.value.replace(/\D/g, "") // valor digitado no input = valor do input substituindo tudo que for caracter por espaç0 vazio
  })
}

// Variavel mutavel para o objeto = vazio
let NumbersInput = null 

//----------: OBSERVANDO O EVENTO DE SUBMIT
form.onsubmit = (e) => {
  // Previne a atualização padrão da janela de acontecer ao enviar
  e.preventDefault() 

  // - Criando um objeto para receber todos as propriedades necessarias
  NumbersInput = {
    number_quantity: parseInt(quantity.value), // passa o valor (value) da quantidade (quantity) para numeros inteiros (parseInt)
    number_start: parseInt(start.value),
    number_end: parseInt(end.value),
    notRepeat: notRepeatCheckbox.checked,
  }

  // - Verficia se número de inicio é maior que número de fim
  if (NumbersInput.number_start > NumbersInput.number_end) {
    const alertMessage = document.createElement("div")
    const icon = document.createElement("img")
    const message = document.createElement("span")
    message.textContent = "O valor inicial não pode ser maior que o final."

    icon.setAttribute("src", "/img/alert-icon.svg")
    alertMessage.classList.add("alert")
    alertMessage.append(icon, message)
  
    form.insertBefore(alertMessage, numbers)
    return 
  }

  // - Verifica se a quantidade deseja de números é maior do que o intervalo de números disponiveis para sorteio
  const rangeSize = NumbersInput.number_end - NumbersInput.number_start + 1;
  if (NumbersInput.number_quantity > rangeSize) {
    alert("Quantidade de números a sortear excede o intervalo disponível.");
    return;
  }

  const resultado = sorteando(NumbersInput); // pega os sorteados
  showNumbers(resultado); // mostra os sorteados

  console.log(`Quantidade de números a sortear: ${NumbersInput.number_quantity}, de ${NumbersInput.number_start} à ${NumbersInput.number_end}`) 
}

// ----------: FUNÇÃO PARA SORTEAR NÚMEROS 
function sorteando(NumbersInput){
  // - Array com todos os numeros entre o intervalo de start e end
  const allNumbers = [];
  for (let i = NumbersInput.number_start; i <= NumbersInput.number_end; i++) {
    allNumbers.push(i);
  } // ex: Se number_start = 10 e number_end = 15, o allNumbers ficará assim: [10, 11, 12, 13, 14, 15]

  const sortedNumbers = [];

  // - For repete a quantidade de vezes que tiver em number_quantity
  for (let i = 0; i < NumbersInput.number_quantity; i++) {
    const randomIndex = Math.floor(Math.random() * allNumbers.length);
    if (NumbersInput.notRepeat) {
      // ❌ Sem repetição permitida: retira do array
      const selected = allNumbers.splice(randomIndex, 1)[0];
      sortedNumbers.push(selected);

    } else {
      // ✅ Com repetição 
      const randomIndex = Math.floor(Math.random() * allNumbers.length);
      sortedNumbers.push(allNumbers[randomIndex]);
    }
  }

  console.log(`Números sorteados: ${sortedNumbers.join(", ")}`)
  return sortedNumbers;
}

//----------: FUNÇÃO PARA MOSTRAR NÚMEROS
function showNumbers(sortedNumbers) {
  try {
    // Remove a seção anterior, se já tiver uma na tela
    const previousSection = document.querySelector(".central-result");
    if (previousSection) previousSection.remove();

    // Cria os elementos principais
    const sectionCentralResult = document.createElement("section");
    sectionCentralResult.classList.add("central-result");

    const divHeader = document.createElement("div");
    divHeader.classList.add("header");

    const divHeaderH2 = document.createElement("h2");
    divHeaderH2.textContent = "RESULTADO DO SORTEIO";

    const divHeaderP = document.createElement("p");
    const divHeaderPSmall = document.createElement("small");
    divHeaderPSmall.textContent = "Números sorteados";
    divHeaderP.append(divHeaderPSmall);

    divHeader.append(divHeaderH2, divHeaderP);

    const divNumbers = document.createElement("div");
    divNumbers.classList.add("results");

    // Adiciona os números sorteados dinamicamente
    sortedNumbers.forEach(num => {
      const result = document.createElement("h2");
      result.textContent = num;
      divNumbers.appendChild(result);
    });

    // Botão para sortear novamente
    const buttonAgain = document.createElement("button");
    buttonAgain.classList.add("sortedAgain");
    buttonAgain.innerHTML = 'SORTEAR NOVAMENTE <img src="img/arrow-rotate.svg" alt="">';
    
    buttonAgain.addEventListener("click", () => {
      const newResult = sorteando(NumbersInput);
      updateNumbersOnScreen(newResult);
    });
    
    // Junta tudo na nova seção
    sectionCentralResult.append(divHeader, divNumbers, buttonAgain);

    // Esconde a seção antiga e mostra a nova
    centralSection.classList.add("hidden");
    const footer = document.querySelector(".footer")
    main.insertBefore(sectionCentralResult, footer);

  } catch (error) {
    alert("Ocorreu um erro ao exibir os números sorteados.");
    console.error(error);
  }
}

//----------: FUNÇÃO PARA ATUALIZAR OS NÚMEROS
function updateNumbersOnScreen(newNumbers) {
  const resultsContainer = document.querySelector(".central-result .results");

  if (!resultsContainer) return;

  // Limpa os números antigos
  resultsContainer.innerHTML = "";

  // Adiciona os novos números
  newNumbers.forEach(num => {
    const h2 = document.createElement("h2");
    h2.textContent = num;
    resultsContainer.appendChild(h2);
  });
}








