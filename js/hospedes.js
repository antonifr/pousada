
document.getElementById('formHospede').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const documento = document.getElementById('documento').value;

  const hospede = { nome, documento };
  const lista = JSON.parse(localStorage.getItem('hospedes') || '[]');
  lista.push(hospede);
  localStorage.setItem('hospedes', JSON.stringify(lista));
  listarHospedes();
  this.reset();
});

function listarHospedes() {
  const lista = JSON.parse(localStorage.getItem('hospedes') || '[]');
  const ul = document.getElementById('listaHospedes');
  ul.innerHTML = '';
  lista.forEach((h, i) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = `${h.nome} - ${h.documento}`;
    ul.appendChild(li);
  });
}

listarHospedes();
