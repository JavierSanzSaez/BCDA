var App = {

  valor: 0,

  init: function() {

        // ROUTER de eventos
        const matchEvent = (ev, sel) => ev.target.matches(sel);
        document.addEventListener('click', ev => {
            if (matchEvent(ev, '#cincr')) App.handleIncr(ev);
        })

        // Actualizar contenido de la pagina
        App.refreshContador();
  },

  handleIncr: function(event) {
      event.preventDefault();
      App.valor++;
      App.refreshContador();
  },

  refreshContador: function() {
      document.getElementById('valor').innerHTML = App.valor;
  }
};

// Inicialización: Ejecutar cuando se ha terminado de cargar la pagina.
document.addEventListener('DOMContentLoaded', App.init);
