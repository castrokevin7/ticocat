import React, { useEffect, useState } from 'react';
import { Associate } from '../models';
import { DataStore } from 'aws-amplify';
import DeleteIcon from '@mui/icons-material/Delete';
import './AssociatesView.css';
import { Box, Modal } from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';
import CloseIcon from '@mui/icons-material/Close';

type QueryExpressionsMap = { 
  [searchKey: string]: (searchValue: string) => Promise<Associate[]>; 
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

function AssociatesView() {
  const [state, setState] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [associates, setAssociates] = useState<Associate[]>([]);
  const [associate, setAssociate] = useState<Associate>();
  const [openViewAssociate, setOpenViewAssociate] = React.useState(false);

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
                    <span 
                      className='view-associate'
                      onClick={() => {
                        setAssociate(a);
                        setOpenViewAssociate(true);
                      }}>
                      <PageviewIcon />
                    </span>
                    <span 
                      className='delete-associate'
                      onClick={async () => {
                        if (window.confirm('¿Confirma la eliminación del Socio (irreversible)?')) {
                          await DataStore.delete(a);
                          fetchAssociates();
                        }
                      }}>
                      <DeleteIcon />
                    </span>
                    <span>{a.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      { associate ? (
        <Modal
          open={openViewAssociate}
          onClose={() => setOpenViewAssociate(false)}
        >
          <Box sx={modalStyle}>
            <CloseIcon id='close-view-associate' onClick={() => setOpenViewAssociate(false)} />
            <p>Nombre: {associate.name}</p>
            {associate.board_position ?
             <p>Posición: {capitalizeFirst(associate.board_position)}</p>
             : null}
            <p>Fecha de inscripción: {associate.inscription_date}</p>
            <p>Fecha de nacimiento: {associate.birthday}</p>
            <p>Dirección: {associate.address}</p>
            <p>Correo: {associate.email}</p>
            <p>Teléfono: {associate.phone}</p>
            <p>Nacionalidad: {associate.nationality}</p>
            <p>Tipo de Identificación: {associate.identification_type}</p>
            <p>Identificación: {associate.identification}</p>
          </Box>
        </Modal>
      ) : null }

    </div>
  );
}

export default AssociatesView;

function capitalizeFirst(arg: string): string {
  const lower = arg.toLowerCase();
  return arg[0] + lower.slice(1);
}

