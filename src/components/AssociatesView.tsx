import React, { useEffect, useState } from 'react';
import { Associate } from '../models';
import { DataStore } from 'aws-amplify';
import './AssociatesView.css';

type QueryExpressionsMap = { 
  [searchKey: string]: (searchValue: string) => Promise<Associate[]>; 
}

function AssociatesView() {
  const [state, setState] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [associates, setAssociates] = useState<Associate[]>([]);

  const QUERY_EXPRESSIONS: QueryExpressionsMap = {
    'name': (searchValue: string) => DataStore.query(Associate, a => a.name("contains", searchValue)),
    'identification': (searchValue: string) => DataStore.query(Associate, a => a.identification("contains", searchValue)),
    'phone': (searchValue: string) => DataStore.query(Associate, a => a.phone("contains", searchValue)),
    'email': (searchValue: string) => DataStore.query(Associate, a => a.email("contains", searchValue)),
  };

  const fetchAssociates = (searchBy?: string, searchValue?: string) => {
    if (searchBy && searchValue) {
      QUERY_EXPRESSIONS[searchBy](searchValue)
      .then((response) => {
        setAssociates(response);
        setState('success');
      })
      .catch((err) => {
        console.error('Error:', err);
        setState('error');
      });
    } else {
      DataStore.query(Associate)
      .then((response) => {
        setAssociates(response);
        setState('success');
      })
      .catch((err) => {
        console.error('Error:', err);
        setState('error');
      });
    }
  }

  useEffect(() => {
    setState('loading');

    const subscription = DataStore.observe(Associate).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
    });

    fetchAssociates();

    return () => subscription.unsubscribe();
  }, []);
  
  if (state === 'error')
    return (
      <h1>
        Hubo un error...
      </h1>
    );
  return (
    <div>
      <div>
        <h3>Socios:</h3>
        {state === 'loading' ? (
          <p>Cargando...</p>
        ) : (
          <div>
            <div className='search-associates'>
              <select defaultValue={searchBy} id='search-options' onChange={(event) => {
                setSearchBy(event.target.value);  
                if (searchValue) {
                  fetchAssociates(searchBy, searchValue);
                }
              }}>
                <option value='name'>Nombre</option>
                <option value='identification'>Identificación</option>
                <option value='phone'>Teléfono</option>
                <option value='email'>Correo</option>
              </select>
              <input type='text' id='search-input' placeholder='Comienza con..' onChange={(event) => {
                setSearchValue(event.target.value);
                if (searchValue) {
                  fetchAssociates(searchBy, searchValue);
                } else {
                  fetchAssociates();
                }
              }}></input>
            </div>

            <h4>Resultados:</h4>
            <div className='associates'>
              {associates.map((a: Associate, i) => {
                return (
                  <div key={i} className='associate'>
                    <input
                      className='delete-associate'
                      type='button'
                      value='Eliminar'
                      onClick={async () => {
                        if (window.confirm('¿Confirma la eliminación del Socio (irreversible)?')) {
                          await DataStore.delete(a);
                          fetchAssociates();
                        }
                      }}
                    />
                    <span>{a.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssociatesView;
