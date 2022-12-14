import React, { useState } from 'react';
import { Event } from '../../models';
import { DataStore } from 'aws-amplify';
import DeleteIcon from '@mui/icons-material/Delete';

const useConstructor = (callBack = () => {}) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}

function EventsView() {
    const [state, setState] = useState('');
    const [events, setEvents] = useState<Event[]>([]);

    const fetchEvents = () => {
        setState('loading');
        DataStore.query(Event)
        .then((response) => {
            setEvents(response);
            setState('success');
        })
        .catch((err) => {
            console.error('Error:', err);
            setState('error');
        });
    }

    const eventsResult = () => {
        return (
          <div className='events'>
            <div className='events-header'>
              <h3>Eventos ({events.length})</h3>
            </div>
            {events.length === 0 ? <span>Sin resultados</span> 
             : <div className='events-container'>
              {events.map((e: Event, i) => {
              return (
                <div key={i} className='event'>
                  <span 
                    className='delete-event'
                    onClick={async () => {
                      if (window.confirm(`¿Confirma la eliminación del Evento: ${e.title}?`)) {
                        await DataStore.delete(e);
                        fetchEvents();
                      }
                    }}>
                    <DeleteIcon />
                  </span>
                  <span>{e.title}</span>
                </div>
              )
            })}  
            </div>}
          </div>
        )
    }

    useConstructor(() => {
        setState('loading');
        fetchEvents();
    });

    if (state === 'error')
        return (
        <h1>
            Hubo un error...
        </h1>
        );
    return (
        <div>
            {state === 'loading' ? (
            <div style={{display: 'flex'}}>
                <div className="spinner-container">
                <div className="loading-spinner" />
                </div>
                Cargando
            </div>
            ) : (
            <div>
                {eventsResult()}
            </div>
            )}
        </div>
    );
}

export default EventsView;