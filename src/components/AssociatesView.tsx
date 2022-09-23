import React, { useEffect, useState } from "react";
import { Associate } from '../models';
import { DataStore } from 'aws-amplify';

function AssociatesView() {
  const [state, setState] = useState('');
  const [associates, setAssociates] = useState<Associate[]>([]);

  const fetchAssociates = () => {
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
        {state === 'loading' ? (
          <p>Cargando...</p>
        ) : (
          <div>
            <h3>Socios:</h3>
            {associates.map((a: Associate, i) => {
              return (
                <div key={i} className='associate'>
                  <input
                    type="button"
                    value="Delete"
                    onClick={async () => {
                      if (window.confirm('¿Confirma la eliminación del Socio (irreversible)?')) {
                        await DataStore.delete(a);
                        fetchAssociates();
                      }
                    }}
                  />
                  <p>{a.name}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AssociatesView;
