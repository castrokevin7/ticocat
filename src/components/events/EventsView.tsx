import React, { useState } from 'react';
import { Event } from '../../models';
import { DataStore, Predicates, SortDirection, Storage } from 'aws-amplify';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Box, Button, FormControl, InputAdornment, MenuItem, Modal, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';
import './EventsView.css';
import { modalStyle, formStyle } from '../styles';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';

type QueryExpressionsMap = {
    [searchKey: string]: (searchValue: string) => Promise<Event[]>;
}

const useConstructor = (callBack = () => { }) => {
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
    const [eventMainImageUrl, setEventMainImageUrl] = useState<string>(null);
    const [eventGalleryUrls, setEventGalleryUrls] = useState<string[]>([]);

    const handleGalleryImagesChange = (event: any) => {
        const newGalleryImages = [...galleryImages];
        newGalleryImages.push(event.target.files[0]);
        setGalleryImages(newGalleryImages);
    }

    const handleMainImageChange = (event: any) => {
        setMainImage(event.target.files[0]);
    }

    const QUERY_EXPRESSIONS: QueryExpressionsMap = {
        'title': (searchValue: string) => DataStore.query(Event, e => e.title('contains', searchValue), {
            sort: e => e.createdAt(SortDirection.DESCENDING)
        }),
        'date': (searchValue: string) => DataStore.query(Event, e => e.date('contains', searchValue), {
            sort: e => e.createdAt(SortDirection.DESCENDING)
        }),
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
            DataStore.query(Event, Predicates.ALL, {
                sort: e => e.createdAt(SortDirection.DESCENDING)
            })
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
        setEventMainImageUrl(null);
        if (e.image) {
            Storage.get(e.image)
                .then((response) => {
                    setEventMainImageUrl(response);
                });
        }
    }

    const loadEventGalleryUrls = async (e: Event) => {
        setEventGalleryUrls([]);
        if (e.gallery) {
            const signedUrls = await Promise.all(
                e.gallery.map(async image => {
                    const signedUrl = await Storage.get(image);
                    return signedUrl;
                })
            );
            setEventGalleryUrls(signedUrls);
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
                            setMainImage(null);
                            setEvent(new Event({}));
                            setOpenCreateEvent(true);
                        }}
                    >
                        <AddIcon />
                    </Button>
                    <Select
                        className='search-form-item'
                        id='events-search-options'
                        value={searchBy}
                        sx={{ bgcolor: 'background.paper' }}
                        onChange={(event) => {
                            if (searchValue) {
                                fetchEvents(event.target.value, searchValue);
                            }
                            setSearchBy(event.target.value);
                        }}
                    >
                        <MenuItem value='title'>Nombre</MenuItem>
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

    const validateEvent = (event: Event, image) => {
        if (!event.title) {
            alert("Error: Título (ESP) es requerido.");
            return false;
        }
        if (!event.title_cat) {
            alert("Error: Título (CAT) es requerido.");
            return false;
        }
        if (!event.description) {
            alert("Error: Descripción (ESP) es requerido.");
            return false;
        }
        if (!event.description_cat) {
            alert("Error: Descripción (CAT) es requerido.");
            return false;
        }
        if (!event.date) {
            alert("Error: Fecha es requerida.");
            return false;
        }
        if (!image) {
            alert("Error: Imagen de Portada es requerida.");
            return false;
        }
        return true;
    }

    const createEventIdFromTitle = (title: string) => {
        return `${title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')}`;
    }

    const eventView = (eventToUpdate: Event) => {
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
                            required
                            label='Título (ESP)'
                            defaultValue={eventToUpdate.title}
                            onChange={(event) => {
                                setEvent(Event.copyOf(eventToUpdate, updated => {
                                    updated.title = event.target.value;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Título (CAT)'
                            defaultValue={eventToUpdate.title_cat}
                            onChange={(event) => {
                                setEvent(Event.copyOf(eventToUpdate, updated => {
                                    updated.title_cat = event.target.value;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Descripción (ESP)'
                            defaultValue={eventToUpdate.description}
                            onChange={(event) => {
                                setEvent(Event.copyOf(eventToUpdate, updated => {
                                    updated.description = event.target.value;
                                }));
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Descripción (CAT)'
                            defaultValue={eventToUpdate.description_cat}
                            onChange={(event) => {
                                setEvent(Event.copyOf(eventToUpdate, updated => {
                                    updated.description_cat = event.target.value;
                                }));
                            }}
                            multiline
                            rows={4}
                        />
                        <div style={{ display: 'flex' }}>
                            <TextField
                                id='outlined-required'
                                required
                                label='Fecha'
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                defaultValue={eventToUpdate.date}
                                onChange={(event) => {
                                    setEvent(Event.copyOf(eventToUpdate, updated => {
                                        updated.date = event.target.value;
                                    }));
                                }}
                            />
                            <TextField
                                id='outlined-required'
                                required
                                type="time"
                                label="Hora"
                                InputLabelProps={{ shrink: true }}
                                defaultValue={eventToUpdate.time}
                                onChange={(event) => {
                                    setEvent(Event.copyOf(eventToUpdate, updated => {
                                        updated.time = event.target.value;
                                    }));
                                }}
                            />
                        </div>
                        <TextField
                            id='outlined-required'
                            label='Contacto'
                            placeholder="+34602040598"
                            defaultValue={eventToUpdate.contact}
                            onChange={(event) => {
                                setEvent(Event.copyOf(eventToUpdate, updated => {
                                    updated.contact = event.target.value;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Ubicación URL'
                            type="url"
                            defaultValue={eventToUpdate.location_url}
                            onChange={(event) => {
                                setEvent(Event.copyOf(eventToUpdate, updated => {
                                    updated.location_url = event.target.value;
                                }));
                            }}
                        />
                        {eventMainImageUrl === null ? null : <span className='images-label'>Imagen de Portada</span>}
                        <div className='main-image-container'>
                            {eventMainImageUrl === null ?
                                <span className='empty-gallery-label'>Sin imagen de portada *</span> :
                                <img className='gallery-image-thumbnail' src={eventMainImageUrl} alt={event.title} />
                            }
                        </div>
                        {eventGalleryUrls.length === 0 ? null : <span className='images-label'>Galería</span>}
                        <div className={eventGalleryUrls.length === 0 ? 'empty-gallery-container' : 'gallery-thumbnails-container'}>
                            {eventGalleryUrls.length === 0 ?
                                <span className='empty-gallery-label'>Sin galería</span>
                                : getEventImages()
                            }
                        </div>
                        <Button
                            variant='contained'
                            size='large'
                            onClick={async () => {
                                if (validateEvent(eventToUpdate, eventMainImageUrl)) {
                                    if (window.confirm(`¿Confirma la actualización del Evento: ${eventToUpdate.title}?`)) {
                                        try {
                                            await DataStore.save(
                                                Event.copyOf(eventToUpdate, updated => {
                                                    updated.event_id = createEventIdFromTitle(eventToUpdate.title);
                                                })
                                            );
                                            fetchEvents();
                                            setOpenViewEvent(false);
                                        } catch (e) {
                                            alert(e);
                                        }
                                    }
                                }
                            }}
                        >
                            Actualizar
                        </Button>
                        <Button
                            variant='outlined'
                            size='large'
                            color='error'
                            onClick={async () => {
                                if (window.confirm(`¿Confirma la eliminación del Evento: ${eventToUpdate.title}?`)) {
                                    await DataStore.delete(eventToUpdate);
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

    const eventCreate = (eventToCreate: Event) => {
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
                            required
                            label='Título (ESP)'
                            onChange={(event) => {
                                setEvent(Event.copyOf(eventToCreate, updated => {
                                    updated.title = event.target.value;
                                }))
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Título (CAT)'
                            onChange={(event) => {
                                setEvent(Event.copyOf(eventToCreate, updated => {
                                    updated.title_cat = event.target.value;
                                }))
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Descripción (ESP)'
                            onChange={(event) => {
                                setEvent(Event.copyOf(eventToCreate, updated => {
                                    updated.description = event.target.value;
                                }))
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Descripción (CAT)'
                            onChange={(event) => {
                                setEvent(Event.copyOf(eventToCreate, updated => {
                                    updated.description_cat = event.target.value;
                                }))
                            }}
                            multiline
                            rows={4}
                        />
                        <div style={{ display: 'flex' }}>
                            <TextField
                                id='outlined-required'
                                required
                                label='Fecha'
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                onChange={(event) => {
                                    setEvent(Event.copyOf(eventToCreate, updated => {
                                        updated.date = event.target.value;
                                    }))
                                }}
                            />
                            <TextField
                                id='outlined-required'
                                type="time"
                                label="Hora"
                                InputLabelProps={{ shrink: true }}
                                onChange={(event) => {
                                    setEvent(Event.copyOf(eventToCreate, updated => {
                                        updated.time = event.target.value;
                                    }))
                                }}
                            />
                        </div>
                        <TextField
                            id='outlined-required'
                            label='Contacto'
                            placeholder="+34602040598"
                            onChange={(event) => {
                                setEvent(Event.copyOf(eventToCreate, updated => {
                                    updated.contact = event.target.value;
                                }))
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Ubicación URL'
                            type="url"
                            onChange={(event) => {
                                setEvent(Event.copyOf(eventToCreate, updated => {
                                    updated.location_url = event.target.value;
                                }));
                            }}
                        />
                        {mainImage === null ? null : <span className='images-label'>Imagen de Portada</span>}
                        <div className='main-image-container'>
                            {mainImage === null ? <span className="empty-gallery-label">Sin imagen de portada</span> : getMainImage()}
                        </div>
                        <Input type="file" onChange={handleMainImageChange} />
                        {galleryImages.length === 0 ? null : <span className='images-label'>Galería</span>}
                        <div className={galleryImages.length === 0 ? 'empty-gallery-container' : 'gallery-thumbnails-container'}>
                            {galleryImages.length === 0 ?
                                <span className="empty-gallery-label">Sin galería</span> :
                                getGalleryImages()
                            }
                        </div>
                        <Input type="file" onChange={handleGalleryImagesChange} />
                        <Button
                            variant='contained'
                            size='large'
                            onClick={async () => {
                                if (validateEvent(eventToCreate, mainImage)) {
                                    if (window.confirm(`¿Confirma la creación del Evento: ${eventToCreate.title}?`)) {
                                        try {
                                            await DataStore.save(
                                                new Event({
                                                    event_id: createEventIdFromTitle(eventToCreate.title),
                                                    title: eventToCreate.title,
                                                    title_cat: eventToCreate.title_cat,
                                                    description: eventToCreate.description,
                                                    description_cat: eventToCreate.description_cat,
                                                    date: eventToCreate.date,
                                                    time: eventToCreate.time ? eventToCreate.time : null,
                                                    contact: eventToCreate.contact ? eventToCreate.contact : null,
                                                    location_url: eventToCreate.location_url ? eventToCreate.location_url : null,
                                                    image: mainImage ? `${eventToCreate.event_id}/main/${mainImage.name}` : null,
                                                    gallery: galleryImages ? galleryImages.map((image) => `${eventToCreate.event_id}/gallery/${image.name}`) : null,
                                                })
                                            );
                                            fetchEvents();
                                            setOpenCreateEvent(false);
                                        } catch (e) {
                                            alert(e);
                                        }

                                        if (mainImage) {
                                            uploadImage(`${eventToCreate.event_id}/main/${mainImage.name}`, mainImage);
                                        }

                                        if (galleryImages) {
                                            galleryImages.forEach((image) => {
                                                const imageLocation = `${eventToCreate.event_id}/gallery/${image.name}`;
                                                uploadImage(imageLocation, image);
                                            });
                                        }
                                    }
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

    const eventsResult = () => {
        return (
            <div className='events'>
                <div className='items-header'>
                    <h3>Eventos ({events.length})</h3>
                </div>
                {events.length === 0 ?
                    <Button
                        variant='contained'
                        size='large'
                        onClick={async () => fetchEvents()}
                    >
                        Cargar
                    </Button>
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
                {state === 'loading' && events.length === 0 ? (
                    <div style={{ display: 'flex' }}>
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
            {event && openViewEvent ? eventView(event) : null}
            {event && openCreateEvent ? eventCreate(event) : null}
        </div>
    );
}

export default EventsView;