<form id="formReserva">
  <input type="text" id="hospede" placeholder="Nome do cliente" required />
  <input type="text" id="barco" placeholder="Nome do barco" required />
  <input type="date" id="entrada" required />
  <input type="date" id="saida" required />
  <button type="submit">Reservar Barco</button>
</form>

<ul id="listaReservas" class="list-group mt-3"></ul>

<script>
  document.getElementById('formReserva').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const hospede = document.getElementById('hospede').value.trim();
    const barco = document.getElementById('barco').value.trim().toLowerCase(); // Normaliza
    const entrada = document.getElementById('entrada').value;
    const saida = document.getElementById('saida').value;

    if (!barco) {
      alert("Informe o nome do barco.");
      return;
    }

    if (entrada >= saida) {
      alert("A data de saída deve ser após a data de entrada.");
      return;
    }

    const reserva = { hospede, barco, entrada, saida };
    const reservas = JSON.parse(localStorage.getItem('reservasBarcos') || '[]');

    // Verifica se o mesmo barco já está reservado nesse período
    const conflito = reservas.find(r => r.barco === barco &&
      ((entrada >= r.entrada && entrada < r.saida) || 
       (saida > r.entrada && saida <= r.saida) || 
       (entrada <= r.entrada && saida >= r.saida)));

    if (conflito) {
      alert("Este barco já está reservado nesse período.");
      return;
    }

    reservas.push(reserva);
    localStorage.setItem('reservasBarcos', JSON.stringify(reservas));
    listarReservas();
    this.reset();
  });

  function listarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservasBarcos') || '[]');
    const ul = document.getElementById('listaReservas');
    ul.innerHTML = '';
    reservas.forEach((r) => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerText = `Barco "${r.barco}" - ${r.hospede} (${r.entrada} a ${r.saida})`;
      ul.appendChild(li);
    });
  }

  listarReservas();
</script>
