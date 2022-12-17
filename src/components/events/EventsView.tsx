import React, { useState } from 'react';
import { Event } from '../../models';
import { DataStore, Storage } from 'aws-amplify';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Box, Button, FormControl, InputAdornment, MenuItem, Modal, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';
import './EventsView.css';
import { modalStyle, formStyle } from '../styles';
import CloseIcon from '@mui/icons-material/Close';
import {v4 as uuidv4} from 'uuid';
import Input from '@mui/material/Input';

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
    const [mainImage, setMainImage] = useState(null);
    const [event, setEvent] = useState<Event>();
    const [openViewEvent, setOpenViewEvent] = React.useState(false);
    
    /* Event properties */
    const [eventMainImageUrl, setEventMainImageUrl] = useState<string>();
    const [eventGalleryUrls, setEventGalleryUrls] = useState<string[]>();

    const handleGalleryImagesChange = (event: any) => {
      const newGalleryImages = [...galleryImages];
      newGalleryImages.push(event.target.files[0]);
      setGalleryImages(newGalleryImages);
    }

    const handleMainImageChange = (event: any) => {
      setMainImage(event.target.files[0]);
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

    const loadEventMainImageUrl = (e: Event) => {
      Storage.get(e.image)
      .then((response) => {
        setEventMainImageUrl(response);
      });  
    }

    const loadEventGalleryUrls = (e: Event) => {
      e.gallery.forEach((image) => {  
        Storage.get(image)
        .then((response) => {
          const newEventGalleryUrls = [...eventGalleryUrls];
          newEventGalleryUrls.push(response);
          setEventGalleryUrls(newEventGalleryUrls);
        });
      })  
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
                setMainImage(null);
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
                  className='view-item'
                  onClick={() => {
                    setEvent(e);
                    loadEventMainImageUrl(e);
                    loadEventGalleryUrls(e);
                    setOpenViewEvent(true);
                  }}>
                  <PageviewIcon />
                </span>
                  <span>{e.title}</span>
                </div>
              )
            })}  
            </div>}
          </div>
        )
    }

    const getMainImage = () => {
      return <img className='gallery-image-thumbnail' src={URL.createObjectURL(mainImage)} alt={mainImage.name} />;
    }

    const getGalleryImages = () => {
      return galleryImages.map((image, index) => (
        <img className='gallery-image-thumbnail' key={index} src={URL.createObjectURL(image)} alt={image.name} />
      ));
    }

    const getEventImages = () => {
      return eventGalleryUrls.map((imageUrl, index) => (
        <img className='gallery-image-thumbnail' key={index} src={imageUrl} alt={`Gallery ${index + 1}`} />
      ));
    }

    const uploadImage = async (location, image) => {
      try {
        await Storage.put(location, image);
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }

    const eventDisplay = (event: Event) => {
      let eventToUpdate = {
        title: event.title,
        description: event.description,
        date: event.date,
      };
      return (
        <Modal
          open={openViewEvent}
          onClose={() => setOpenViewEvent(false)}
        >
          <Box       
            sx={modalStyle}
            >
              <CloseIcon className='close-modal' onClick={() => setOpenViewEvent(false)} />
              <Box
                component='form'
                sx={formStyle}
              >
                <TextField
                  id='outlined-required'
                  label='Título'
                  defaultValue={event.title}
                  onChange={(event) => {
                    eventToUpdate.title = event.target.value;
                  }}
                />
                <div className='main-image-container'> 
                  { eventMainImageUrl === null ? 
                    <span className='empty-gallery-label'>Sin imagen de portada</span> : 
                    <img className='gallery-image-thumbnail' src={eventMainImageUrl} alt={event.title} /> 
                  }
                </div>
                <TextField
                  id='outlined-required'
                  label='Descripción'
                  defaultValue={event.description}
                  onChange={(event) => {
                    eventToUpdate.description = event.target.value;
                  }}          
                  multiline
                  rows={8}
                />
                <TextField
                  id='outlined-required'
                  label='Fecha'        
                  placeholder='1970-01-01'
                  defaultValue={event.date}
                  onChange={(event) => {
                    eventToUpdate.date = event.target.value;
                  }}
                />
                <div className={event.gallery === null ? 'empty-gallery-container' : 'gallery-thumbnails-container'}> 
                  { event.gallery === null ? 
                    <span className='empty-gallery-label'>Sin galería</span> 
                    : getEventImages() 
                  }
                </div>
                <Button 
                  variant='contained'
                  size='large'
                  onClick={async () => {
                    if (window.confirm(`¿Confirma la actualización del Evento: ${eventToUpdate.title}?`)) {
                      try {
                        await DataStore.save(
                          Event.copyOf(event, updated => {
                            updated.event_id = event.event_id;
                            updated.title = eventToUpdate.title;
                            updated.description = eventToUpdate.description;
                            updated.date = eventToUpdate.date;
                            updated.image = event.image;
                            updated.gallery = event.gallery;
                          })
                        );
                        fetchEvents();
                        setOpenViewEvent(false);                  
                      } catch (e) {
                        alert(e); 
                      }
                    }
                  }}
                >
                  Agregar
                </Button>
                <Button  
                  variant='outlined'
                  size='large'
                  color='error'
                  onClick={async () => {
                    if (window.confirm(`¿Confirma la eliminación del Evento: ${event.title}?`)) {
                      await DataStore.delete(event);
                      fetchEvents();
                      setOpenViewEvent(false);
                    }
                  }}
                >
                  Eliminar
                </Button>
              </Box>
          </Box>
        </Modal>
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
                <div className='main-image-container'> 
                  { mainImage === null ? <span className="empty-gallery-label">Sin imagen de portada</span> : getMainImage()}
                </div>
                <Input type="file" onChange={handleMainImageChange} />
                <TextField
                  id='outlined-required'
                  label='Descripción'
                  onChange={(event) => {
                    eventToCreate.description = event.target.value;
                  }}          
                  multiline
                  rows={8}
                />
                <TextField
                  id='outlined-required'
                  label='Fecha'        
                  placeholder="1970-01-01"
                  onChange={(event) => {
                    eventToCreate.date = event.target.value;
                  }}
                />
                <div className={galleryImages.length === 0 ? 'empty-gallery-container' : 'gallery-thumbnails-container'}> 
                  { galleryImages.length === 0 ? <span className="empty-gallery-label">Sin galería</span> : getGalleryImages()}
                </div>
                <Input type="file" onChange={handleGalleryImagesChange} />
                <Button 
                  variant='contained'
                  size='large'
                  onClick={async () => {
                    if (window.confirm(`¿Confirma la creación del Evento: ${eventToCreate.title}?`)) {
                      try {
                        await DataStore.save(
                          new Event({
                            event_id: eventToCreate.event_id,
                            title: eventToCreate.title ? eventToCreate.title : null,
                            description: eventToCreate.description ? eventToCreate.description : null,
                            date: eventToCreate.date ? eventToCreate.date : null,
                            image: `${eventToCreate.event_id}/main/${mainImage.name}`,
                            gallery: galleryImages.map((image) => `${eventToCreate.event_id}/gallery/${image.name}`),
                          })
                        );
                        fetchEvents();
                        setOpenCreateEvent(false);                  
                      } catch (e) {
                        alert(e); 
                      }

                      uploadImage(`${eventToCreate.event_id}/main/${mainImage.name}`, mainImage);
                      galleryImages.forEach((image) => {
                        const imageLocation = `${eventToCreate.event_id}/gallery/${image.name}`;
                        uploadImage(imageLocation, image);
                      });
                    }
                  }}
                >
                  Agregar
                </Button>
              </Box>
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
            { event ? eventDisplay(event) : null }
            { eventCreate() }
        </div>
    );
}

export default EventsView;