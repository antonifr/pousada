
document.getElementById('formReserva').addEventListener('submit', function(e) {
  e.preventDefault();
  const hospede = document.getElementById('hospede').value;
  const quarto = parseInt(document.getElementById('quarto').value);
  const entrada = document.getElementById('entrada').value;
  const saida = document.getElementById('saida').value;

  if (quarto < 1 || quarto > 30) {
    alert("Quarto inválido. Escolha de 1 a 30.");
    return;
  }

  const reserva = { hospede, quarto, entrada, saida };
  const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');

  // Verifica se o quarto já está reservado no período
  const conflito = reservas.find(r => r.quarto === quarto &&
    ((entrada >= r.entrada && entrada < r.saida) || 
     (saida > r.entrada && saida <= r.saida)));

  if (conflito) {
    alert("Quarto já reservado nesse período.");
    return;
  }

  reservas.push(reserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));
  listarReservas();
  this.reset();
});

function listarReservas() {
  const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  const ul = document.getElementById('listaReservas');
  ul.innerHTML = '';
  reservas.forEach((r, i) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = `Quarto ${r.quarto} - ${r.hospede} (${r.entrada} a ${r.saida})`;
    ul.appendChild(li);
  });
}

listarReservas();
