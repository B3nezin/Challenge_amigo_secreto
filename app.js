const nomes = [];
const inputNome = document.getElementById('nome');
const listaNomesEl = document.getElementById('listaNomes');
const resultadoEl = document.getElementById('resultado');
const sortearBtn = document.getElementById('sortearBtn');
const resetarBtn = document.getElementById('resetarBtn');

function atualizarLista() {
  listaNomesEl.innerHTML = '';
  nomes.forEach((n, i) => {
    const card = document.createElement('div');
    card.className = 'card';

    const span = document.createElement('span');
    span.textContent = n;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'X';
    removeBtn.onclick = () => {
      nomes.splice(i, 1);
      atualizarLista();
    };

    card.appendChild(span);
    card.appendChild(removeBtn);
    listaNomesEl.appendChild(card);
  });
}

inputNome.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const valor = inputNome.value.trim();
    if (!valor) {
      alert('Digite um nome válido!');
    } else if (nomes.includes(valor)) {
      alert('Esse nome já foi adicionado!');
    } else {
      nomes.push(valor);
      inputNome.value = '';
      atualizarLista();
      resultadoEl.style.opacity = 0;
    }
  }
});

sortearBtn.addEventListener('click', function() {
  if (nomes.length < 2) {
    alert('Adicione pelo menos 2 participantes para sortear!');
    return;
  }
  resultadoEl.style.opacity = 0;
  setTimeout(() => {
    let embaralhados = [...nomes];
    for (let i = embaralhados.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [embaralhados[i], embaralhados[j]] = [embaralhados[j], embaralhados[i]];
    }
    let valido = true;
    for (let i = 0; i < nomes.length; i++) {
      if (nomes[i] === embaralhados[i]) {
        valido = false;
        break;
      }
    }
    if (valido) {
      let resultado = "Resultado do Sorteio:\n";
      for (let i = 0; i < nomes.length; i++) {
        resultado += `${nomes[i]} tirou ${embaralhados[(i + 1) % nomes.length]}\n`;
      }
      resultadoEl.textContent = resultado;
      resultadoEl.style.opacity = 1;
    } else {
      sortearBtn.click(); // Tenta de novo se inválido
    }
  }, 500);
});

resetarBtn.addEventListener('click', function() {
  nomes.length = 0;
  atualizarLista();
  resultadoEl.textContent = '';
  resultadoEl.style.opacity = 0;
  inputNome.value = '';
  inputNome.focus();
});