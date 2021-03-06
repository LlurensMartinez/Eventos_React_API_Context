import React, { Component } from 'react';
import axios from 'axios'

const EventosContext = React.createContext();
export const EventosConsumer = EventosContext.Consumer;

class EventosProvider extends Component {

  token = 'Y47QUYHE3PFJDNAO45YP'
  ordenar = 'date'
  localidad = 'es_ES'

  state = { 
    eventos: []
  }

  obtenerEventos = async (busqueda) => {
    const { nombre, categoria } = busqueda
    let url= `https://www.eventbriteapi.com/v3/events/search/?q=${nombre}&categories=${categoria}&sort_by=${this.ordenar}&token=${this.token}&locale=${this.localidad}`;

    // consultar API con la URL
    const eventos = await axios(url)

    this.setState({
      eventos: eventos.data.events
    })
  }

  render() {
    return (
      <EventosContext.Provider
        value={{
          eventos: this.state.eventos,
          obtenerEventos : this.obtenerEventos
        }}
      >
        {this.props.children}
      </EventosContext.Provider>
    );
  }
}

export default EventosProvider;