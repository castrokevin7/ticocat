import React, { useState } from 'react';
import { Associate, BoardPosition, IdentificationType } from '../models';
import { DataStore } from 'aws-amplify';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './AssociatesView.css';
import { Box, Button, FormControl, InputAdornment, MenuItem, Modal, Select, TextField } from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';
import CloseIcon from '@mui/icons-material/Close';
import { Search } from '@mui/icons-material';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';

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
  const [openCreateAssociate, setOpenCreateAssociate] = React.useState(false);

  const QUERY_EXPRESSIONS: QueryExpressionsMap = {
    'name': (searchValue: string) => DataStore.query(Associate, a => a.name('contains', searchValue)),
    'identification': (searchValue: string) => DataStore.query(Associate, a => a.identification('contains', searchValue)),
    'phone': (searchValue: string) => DataStore.query(Associate, a => a.phone('contains', searchValue)),
    'email': (searchValue: string) => DataStore.query(Associate, a => a.email('contains', searchValue)),
  };

  const fetchAssociates = (searchBy?: string, searchValue?: string) => {
    setState('loading');
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
        <FormControl size='small' sx={
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
          }
        }>
          <Button 
            id='add-associate' 
            variant='contained'
            onClick={() => setOpenCreateAssociate(true)}
          >
            <AddIcon />
          </Button>
          <Select
            className='search-form-item'
            id='search-options'
            value={searchBy}
            sx={{bgcolor: 'background.paper'}}
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
          <TextField        
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
            className='search-form-item' 
            id='search-input' 
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Search />
                </InputAdornment>
              ),
            }} 
            variant='outlined' 
            size='small'
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
        <div className='associates-header'>
          <a
            className='download-associates'
            target='_blank'
            rel="noreferrer"
            href={getDownloadAssociatesLink(associates)}
          >
            <DownloadForOfflineRoundedIcon />
          </a>
          <h3>Socios ({associates.length})</h3>
        </div>
        {associates.length === 0 ? <span>Sin resultados</span> 
         : <div className='associates-container'>
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
                  if (window.confirm(`¿Confirma la eliminación del Socio: ${a.name || a.email}?`)) {
                    await DataStore.delete(a);
                    fetchAssociates();
                  }
                }}>
                <DeleteIcon />
              </span>
              <span>{a.name || a.email}</span>
            </div>
          )
        })}  
        </div>}
      </div>
    )
  }

  const associateDisplay = (associate: Associate) => {
    let associateToUpdate = {
      name: associate.name,
      birthday: associate.birthday,
      address: associate.address,
      email: associate.email,
      inscription_date: associate.inscription_date,
      phone: associate.phone,
      nationality: associate.nationality,
      identification: associate.identification,
      identification_type: associate.identification_type,
      board_position: associate.board_position,
    };
    return (
      <Modal
        open={openViewAssociate}
        onClose={() => setOpenViewAssociate(false)}
      >
        <Box 
          component='form'
          noValidate
          autoComplete='off'    
          sx={modalStyle}
          >
            <CloseIcon className='close-modal' onClick={() => setOpenViewAssociate(false)} />
            <div>
              <TextField
                required
                id='outlined-required'
                label='Nombre'
                defaultValue={associate.name}
                onChange={(event) => {
                  associateToUpdate.name = event.target.value;
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='Fecha de nacimiento'
                placeholder="1970-01-01"
                defaultValue={associate.birthday}
                onChange={(event) => {
                  associateToUpdate.birthday = event.target.value;
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='Nacionalidad'
                placeholder="CRI"
                defaultValue={associate.nationality}
                onChange={(event) => {
                  associateToUpdate.nationality = event.target.value;
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='Tipo de Identificación'
                placeholder="NIE, DNI o Pasaporte"
                defaultValue={displayIdType(associate.identification_type)}
                onChange={(event) => {
                  const indexOf = Object.values(IdentificationType).indexOf(event.target.value.toUpperCase() as unknown as IdentificationType);
                  associateToUpdate.identification_type = Object.keys(IdentificationType)[indexOf] as IdentificationType;
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='Identificación'
                defaultValue={associate.identification}
                onChange={(event) => {
                  associateToUpdate.identification = event.target.value;
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='Dirección'
                placeholder="Carrer de Provençals, 231, 1º, 3º"
                defaultValue={associate.address}
                onChange={(event) => {
                  associateToUpdate.address = event.target.value;
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='Teléfono'
                placeholder="+34661121759"
                defaultValue={associate.phone}
                onChange={(event) => {
                  associateToUpdate.phone = event.target.value;
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='Correo'
                placeholder="correo@ejemplo.com"
                defaultValue={associate.email}
                onChange={(event) => {
                  associateToUpdate.email = event.target.value;
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='Fecha de inscripción'
                placeholder="1970-01-01"
                defaultValue={associate.inscription_date}
                onChange={(event) => {
                  associateToUpdate.inscription_date = event.target.value;
                }}
              />
              {associate.board_position ?
                <TextField
                  required
                  id='outlined-required'
                  label='Posición'
                  disabled={true}
                  defaultValue={capitalizeFirst(associate.board_position)}
                  onChange={(event) => {
                    const indexOf = Object.values(BoardPosition).indexOf(event.target.value.toUpperCase() as unknown as BoardPosition);
                    associateToUpdate.board_position = Object.keys(BoardPosition)[indexOf] as BoardPosition;
                  }}
                />
                : null}
            </div>
            <Button 
              sx={{float: 'right'}} 
              variant='outlined'
              onClick={async () => {
                if (!associate.email) {
                  alert("Error: Correo es requerido.")
                } else {
                  if (window.confirm(`¿Confirma la actualización del Socio: ${associate.name || associate.email}?`)) {
                    try {
                      await DataStore.save(
                        Associate.copyOf(associate, updated => {
                          updated.name = associateToUpdate.name;
                          updated.birthday = associateToUpdate.birthday;
                          updated.address = associateToUpdate.address;
                          updated.email = associateToUpdate.email;
                          updated.inscription_date = associateToUpdate.inscription_date;
                          updated.phone = associateToUpdate.phone;
                          updated.nationality = associateToUpdate.nationality;
                          updated.identification = associateToUpdate.identification;
                          updated.identification_type = associateToUpdate.identification_type;
                          updated.board_position = associateToUpdate.board_position;
                        })
                      );
                      fetchAssociates();
                      setOpenViewAssociate(false);
                    } catch (e) {
                      alert(e); 
                    }
                  }
                }
              }}
            >
              Actualizar
            </Button>
        </Box>
      </Modal>
    )
  }

  const associateCreate = () => {
    let associateToCreate = {
      name: '',
      birthday: '',
      address: '',
      email: '',
      inscription_date: '',
      phone: '',
      nationality: '',
      identification: '',
      identification_type: '',
      board_position: '',
    };
    return (
      <Modal
        open={openCreateAssociate}
        onClose={() => setOpenCreateAssociate(false)}
      >
        <Box 
          component='form'
          noValidate
          autoComplete='off'    
          sx={modalStyle}
          >
            <CloseIcon className='close-modal' onClick={() => setOpenCreateAssociate(false)} />
            <div>
              <TextField
                id='outlined-required'
                label='Nombre'
                onChange={(event) => {
                  associateToCreate.name = event.target.value;
                }}
              />
              <TextField
                id='outlined-required'
                label='Fecha de nacimiento'
                placeholder="1970-01-01"
                onChange={(event) => {
                  associateToCreate.birthday = event.target.value;
                }}
              />
              <TextField
                id='outlined-required'
                label='Nacionalidad'
                placeholder="CRI"
                onChange={(event) => {
                  associateToCreate.nationality = event.target.value;
                }}
              />
              <TextField
                id='outlined-required'
                label='Tipo de Identificación'
                placeholder="NIE, DNI o Pasaporte"
                onChange={(event) => {
                  const indexOf = Object.values(IdentificationType).indexOf(event.target.value.toUpperCase() as unknown as IdentificationType);
                  associateToCreate.identification_type = Object.keys(IdentificationType)[indexOf] as IdentificationType;
                }}
              />
              <TextField
                id='outlined-required'
                label='Identificación'
                onChange={(event) => {
                  associateToCreate.identification = event.target.value;
                }}
              />
              <TextField
                id='outlined-required'
                label='Dirección'
                placeholder="Carrer de Provençals, 231, 1º, 3º"
                onChange={(event) => {
                  associateToCreate.address = event.target.value;
                }}
              />
              <TextField
                id='outlined-required'
                label='Teléfono'
                placeholder="+34661121759"
                onChange={(event) => {
                  associateToCreate.phone = event.target.value;
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='Correo'
                placeholder="correo@ejemplo.com"
                onChange={(event) => {
                  associateToCreate.email = event.target.value;
                }}
              />
              <TextField
                id='outlined-required'
                label='Fecha de inscripción'
                placeholder="1970-01-01"
                onChange={(event) => {
                  associateToCreate.inscription_date = event.target.value;
                }}
              />
            </div>
            <Button 
              sx={{float: 'right'}} 
              variant='outlined'
              onClick={async () => {
                if (!associateToCreate.email) {
                  alert("Error: Correo es requerido.")
                } else {
                  if (window.confirm(`¿Confirma la creación del Socio: ${associateToCreate.name || associateToCreate.email}?`)) {
                    try {
                      await DataStore.save(
                        new Associate({
                          name: associateToCreate.name ? associateToCreate.name : null,
                          birthday: associateToCreate.birthday ? associateToCreate.birthday : null,
                          address: associateToCreate.address ? associateToCreate.address : null,
                          email: associateToCreate.email,
                          inscription_date: associateToCreate.inscription_date ? associateToCreate.inscription_date : null,
                          phone: associateToCreate.phone ? associateToCreate.phone : null,
                          nationality: associateToCreate.nationality ? associateToCreate.nationality : null,
                          identification: associateToCreate.identification ? associateToCreate.identification : null,
                          identification_type: associateToCreate.identification_type ? associateToCreate.identification_type as IdentificationType  : null,
                        })
                      );
                      fetchAssociates();
                      setOpenCreateAssociate(false);                  
                    } catch (e) {
                      alert(e); 
                    }
                  }
                }
              }}
            >
              Agregar
            </Button>
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
        {associatesSearch()}
        {state === 'loading' ? (
          <div style={{display: 'flex'}}>
            <div className="spinner-container">
              <div className="loading-spinner" />
            </div>
            Cargando
          </div>
        ) : (
          <div>
            {associatesResult()}
          </div>
        )}
      </div>
      { associate ? associateDisplay(associate) : null }
      { associateCreate() }

    </div>
  );
}

export default AssociatesView;

function capitalizeFirst(arg: string): string {
  const lower = arg.toLowerCase();
  return arg[0] + lower.slice(1);
}

function displayIdType(id: any): string {
  return id === IdentificationType.PASAPORTE ? capitalizeFirst(id) : id;
}

function getDownloadAssociatesLink(associates: Associate[]): string {
  const emails = associates
    .map((a) => a.email)
    .join('\n');

  var data = new Blob([emails], {type: 'text/plain'});
  return window.URL.createObjectURL(data);
}

