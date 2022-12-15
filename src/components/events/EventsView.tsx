import React, { useState } from 'react';
import { Event } from '../../models';
import { DataStore } from 'aws-amplify';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, FormControl, InputAdornment, MenuItem, Modal, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';
import './EventsView.css';
import { modalStyle, formStyle } from '../styles';
import CloseIcon from '@mui/icons-material/Close';
import {v4 as uuidv4} from 'uuid';

type QueryExpressionsMap = { 
  [searchKey: string]: (searchValue: string) => Promise<Event[]>; 
}

const useConstructor = (callBack = () => {}) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}

function EventsView() {
    const [state, setState] = useState('');
    const [events, setEvents] = useState<Event[]>([]);
    const [searchBy, setSearchBy] = useState('title');
    const [searchValue, setSearchValue] = useState('');
    const [openCreateEvent, setOpenCreateEvent] = React.useState(false);
    const [galleryImages, setGalleryImages] = useState([]);

    const handleGalleryImagesChange = (event: any) => {
      const newGalleryImages = [...galleryImages];
      newGalleryImages.push(event.target.files[0]);
      setGalleryImages(newGalleryImages);
    }
  
    const handleRemoveGalleryImage = (index: any) => {
      const newGalleryImages = [...galleryImages];
      newGalleryImages.splice(index, 1);
      setGalleryImages(newGalleryImages);
    }

    const QUERY_EXPRESSIONS: QueryExpressionsMap = {
      'title': (searchValue: string) => DataStore.query(Event, e => e.title('contains', searchValue)),
      'date': (searchValue: string) => DataStore.query(Event, e => e.date('contains', searchValue)),
    };

    const fetchEvents = (searchBy?: string, searchValue?: string) => {
      setState('loading');
      if (searchBy && searchValue) {
        QUERY_EXPRESSIONS[searchBy](searchValue)
        .then((response) => {
          setEvents(response);
          setState('success');
        })
        .catch((err) => {
          console.error('Error:', err);
          setState('error');
        });
      } else {
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
    }

    const eventsSearch = () => {
      return (
        <div className='search-container'>
          <FormControl size='small' sx={
            {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'left',
            }
          }>
            <Button 
              className='add-item' 
              variant='contained'
              onClick={() => {
                setGalleryImages([]);
                setOpenCreateEvent(true);
              }}
            >
              <AddIcon />
            </Button>
            <Select
              className='search-form-item'
              id='events-search-options'
              value={searchBy}
              sx={{bgcolor: 'background.paper'}}
              onChange={(event) => {  
                if (searchValue) {
                  fetchEvents(event.target.value, searchValue);
                }
                setSearchBy(event.target.value);
              }}
            >
              <MenuItem value='title'>Título</MenuItem>
              <MenuItem value='date'>Fecha</MenuItem>
            </Select>
            <TextField        
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}
              className='search-form-item' 
              id='events-search-input'
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
                  fetchEvents(searchBy, event.target.value);
                } else {
                  fetchEvents();
                }
                setSearchValue(event.target.value);
              }}
            />
          </FormControl>
        </div>
      )
    };

    const eventsResult = () => {
        return (
          <div className='events'>
            <div className='items-header'>
              <h3>Eventos ({events.length})</h3>
            </div>
            {events.length === 0 ? <span>Sin resultados</span> 
             : <div className='items-container'>
              {events.map((e: Event, i) => {
              return (
                <div key={i} className='item'>
                  <span 
                    className='delete-item'
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

    const eventCreate = () => {
      let eventToCreate = {
        event_id: uuidv4(),
        title: '',
        description: '',
        date: ''
      };
      return (
        <Modal
          open={openCreateEvent}
          onClose={() => setOpenCreateEvent(false)}
        >
          <Box       
            sx={modalStyle}
            >
              <CloseIcon className='close-modal' onClick={() => setOpenCreateEvent(false)} />
              <Box
                component="form"
                sx={formStyle}
              >
                <TextField
                  id='outlined-required'
                  label='Título'
                  onChange={(event) => {
                    eventToCreate.title = event.target.value;
                  }}
                />
                <TextField
                  id='outlined-required'
                  label='Descripción'
                  onChange={(event) => {
                    eventToCreate.description = event.target.value;
                  }}          
                  multiline
                  rows={4}
                />
                <TextField
                  id='outlined-required'
                  label='Fecha'
                  onChange={(event) => {
                    eventToCreate.date = event.target.value;
                  }}
                />
                <div>
                  <input type="file" onChange={handleGalleryImagesChange} />
                  <div>
                    {galleryImages.map((image, index) => (
                      <div key={index}>
                        <img src={URL.createObjectURL(image)} alt={image.name} />
                        <button onClick={() => handleRemoveGalleryImage(index)}>Remove</button>
                      </div>
                    ))}
                  </div>
                </div>
              </Box>
              <Button 
                sx={{float: 'right'}} 
                variant='outlined'
                onClick={async () => {
                  if (window.confirm(`¿Confirma la creación del Evento: ${eventToCreate.title}?`)) {
                    try {
                      await DataStore.save(
                        new Event({
                          event_id: eventToCreate.event_id,
                          title: eventToCreate.title ? eventToCreate.title : null,
                          description: eventToCreate.description ? eventToCreate.description : null,
                          date: eventToCreate.date ? eventToCreate.date : null
                        })
                      );
                      fetchEvents();
                      setOpenCreateEvent(false);                  
                    } catch (e) {
                      alert(e); 
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
            <div>
              {eventsSearch()}
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
            { eventCreate() }
        </div>
    );
}

export default EventsView;