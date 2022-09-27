import React, { useState } from 'react';
import { Associate } from '../models';
import { DataStore } from 'aws-amplify';
import DeleteIcon from '@mui/icons-material/Delete';
import './AssociatesView.css';
import { Box, Divider, FormControl, InputAdornment, MenuItem, Modal, Select, TextField } from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';
import CloseIcon from '@mui/icons-material/Close';
import { Search } from '@mui/icons-material';

type QueryExpressionsMap = { 
  [searchKey: string]: (searchValue: string) => Promise<Associate[]>; 
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
  '& .MuiTextField-root': { m: 1.5, width: '35ch' },
};

const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
}

function AssociatesView() {
  const [state, setState] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [associates, setAssociates] = useState<Associate[]>([]);
  const [associate, setAssociate] = useState<Associate>();
  const [openViewAssociate, setOpenViewAssociate] = React.useState(false);

  const QUERY_EXPRESSIONS: QueryExpressionsMap = {
    'name': (searchValue: string) => DataStore.query(Associate, a => a.name('contains', searchValue)),
    'identification': (searchValue: string) => DataStore.query(Associate, a => a.identification('contains', searchValue)),
    'phone': (searchValue: string) => DataStore.query(Associate, a => a.phone('contains', searchValue)),
    'email': (searchValue: string) => DataStore.query(Associate, a => a.email('contains', searchValue)),
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

  const associatesSearch = () => {
    return (
      <div className='search-associates'>
        <FormControl>
          <Select
            sx={
              {
                bgcolor: 'background.paper'
              }
            }
            className='search-form-item'
            id='search-options'
            value={searchBy}
            onChange={(event) => {  
              if (searchValue) {
                fetchAssociates(event.target.value, searchValue);
              }
              setSearchBy(event.target.value);
            }}
          >
            <MenuItem value='name'>Nombre</MenuItem>
            <MenuItem value='identification'>Identificación</MenuItem>
            <MenuItem value='phone'>Teléfono</MenuItem>
            <MenuItem value='email'>Correo</MenuItem>
          </Select>
          <Divider />
          <TextField 
            sx={
              {
                bgcolor: 'background.paper',
                borderRadius: 1
              }
            }
            className='search-form-item' 
            id='search-input' 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }} 
            variant='outlined' 
            onChange={(event) => {
              if (event.target.value) {
                fetchAssociates(searchBy, event.target.value);
              } else {
                fetchAssociates();
              }
              setSearchValue(event.target.value);
            }}
          />
        </FormControl>
      </div>
    )
  };

  const associatesResult = () => {
    return (
      <div className='associates'>
        {associates.length === 0 ? <span>Sin resultados</span> 
         : associates.map((a: Associate, i) => {
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
                  if (window.confirm(`¿Confirma la eliminación del Socio: ${a.name}?`)) {
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
    )
  }

  const associateDisplay = (associate: Associate) => {
    return (
      <Modal
        open={openViewAssociate}
        onClose={() => setOpenViewAssociate(false)}
      >
        <Box 
          component='form'
          noValidate
          autoComplete="off"    
          sx={modalStyle}
          >
            <CloseIcon id='close-view-associate' onClick={() => setOpenViewAssociate(false)} />
            <div>
              <TextField
                required
                id="outlined-required"
                label="Nombre"
                defaultValue={associate.name}
              />
              <TextField
                required
                id="outlined-required"
                label={`Identificación (${associate.identification_type})`}
                defaultValue={associate.identification}
              />
              <TextField
                required
                id="outlined-required"
                label="Correo"
                defaultValue={associate.email}
              />
              <TextField
                required
                id="outlined-required"
                label="Teléfono"
                defaultValue={associate.phone}
              />
              {associate.board_position ?
                <TextField
                  required
                  id="outlined-required"
                  label="Posición"
                  defaultValue={capitalizeFirst(associate.board_position)}
                />
                : null}
              <TextField
                required
                id="outlined-required"
                label="Fecha de inscripción"
                defaultValue={associate.inscription_date}
              />
              <TextField
                required
                id="outlined-required"
                label="Fecha de nacimiento"
                defaultValue={associate.birthday}
              />
              <TextField
                required
                id="outlined-required"
                label="Dirección"
                defaultValue={associate.address}
              />
              <TextField
                required
                id="outlined-required"
                label="Nacionalidad"
                defaultValue={associate.nationality}
              />
            </div>
        </Box>
      </Modal>
    )
  }

  useConstructor(() => {
    setState('loading');
    fetchAssociates();
  });
  
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
            {associatesSearch()}
            {associatesResult()}
          </div>
        )}
      </div>
      { associate ? associateDisplay(associate) : null }

    </div>
  );
}

export default AssociatesView;

function capitalizeFirst(arg: string): string {
  const lower = arg.toLowerCase();
  return arg[0] + lower.slice(1);
}

