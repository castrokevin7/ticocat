import React, { useState } from 'react';
import { Benefit } from '../../models';
import { DataStore, Predicates, SortDirection, Storage } from 'aws-amplify';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Box, Button, FormControl, InputAdornment, Modal, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';
import './BenefitsView.css';
import { modalStyle, formStyle } from '../styles';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';
import { createEventIdFromTitle } from '../utils';

const useConstructor = (callBack = () => { }) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}

function BenefitsView() {
    const [state, setState] = useState('');
    const [benefits, setBenefits] = useState<Benefit[]>([]);
    const [openCreateBenefit, setOpenCreateBenefit] = React.useState(false);
    const [mainImage, setMainImage] = useState(null);
    const [benefit, setBenefit] = useState<Benefit>();
    const [openViewBenefit, setOpenViewBenefit] = React.useState(false);

    /* Benefit properties */
    const [benefitMainImageUrl, setBenefitMainImageUrl] = useState<string>(null);

    const handleMainImageChange = (benefit: any) => {
        setMainImage(benefit.target.files[0]);
    }

    const fetchBenefits = (searchValue?: string) => {
        setState('loading');
        if (searchValue) {
            DataStore.query(Benefit, benefit => benefit.title('contains', searchValue), {
                sort: benefit => benefit.createdAt(SortDirection.ASCENDING)
            }).then((response) => {
                setBenefits(response);
                setState('success');
            }).catch((err) => {
                console.error('Error:', err);
                setState('error');
            });
        } else {
            DataStore.query(Benefit, Predicates.ALL, {
                sort: e => e.createdAt(SortDirection.ASCENDING)
            })
                .then((response) => {
                    setBenefits(response);
                    setState('success');
                })
                .catch((err) => {
                    console.error('Error:', err);
                    setState('error');
                });
        }
    }

    const loadBenefitMainImageUrl = (e: Benefit) => {
        setBenefitMainImageUrl(null);
        if (e.image) {
            Storage.get(e.image)
                .then((response) => {
                    setBenefitMainImageUrl(response);
                });
        }
    }

    const benefitsSearch = () => {
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
                            setMainImage(null);
                            setBenefit(new Benefit({}));
                            setOpenCreateBenefit(true);
                        }}
                    >
                        <AddIcon />
                    </Button>
                    <TextField
                        sx={{
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                        className='search-form-item'
                        id='benefits-search-input'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        variant='outlined'
                        size='small'
                        placeholder='Buscar un beneficio...'
                        onChange={(benefit) => {
                            if (benefit.target.value) {
                                fetchBenefits(benefit.target.value);
                            } else {
                                fetchBenefits();
                            }
                        }}
                    />
                </FormControl>
            </div>
        )
    };

    const getMainImage = () => {
        return <img className='gallery-image-thumbnail' src={URL.createObjectURL(mainImage)} alt={mainImage.name} />;
    }

    const uploadImage = async (location, image) => {
        try {
            await Storage.put(location, image);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    const validateBenefit = (benefit: Benefit, image) => {
        if (!benefit.title) {
            alert("Error: Título (ESP) es requerido.");
            return false;
        }
        if (!benefit.title_cat) {
            alert("Error: Título (CAT) es requerido.");
            return false;
        }
        if (!benefit.description) {
            alert("Error: Descripción (ESP) es requerido.");
            return false;
        }
        if (!benefit.description_cat) {
            alert("Error: Descripción (CAT) es requerido.");
            return false;
        }
        if (!benefit.about_provider) {
            alert("Error: Sobre el Proveedor (ESP) es requerido.");
            return false;
        }
        if (!benefit.about_provider_cat) {
            alert("Error: Sobre el Proveedor (CAT) es requerido.");
            return false;
        }
        if (!image) {
            alert("Error: Imagen de Portada es requerida.");
            return false;
        }
        if (!benefit.email && !benefit.phone) {
            alert("Error: Email o Teléfono es requerido.");
            return false;
        }
        return true;
    }

    const benefitView = (benefitToUpdate: Benefit) => {
        return (
            <Modal
                open={openViewBenefit}
                onClose={() => setOpenViewBenefit(false)}
            >
                <Box
                    sx={modalStyle}
                >
                    <CloseIcon className='close-modal' onClick={() => setOpenViewBenefit(false)} />
                    <Box
                        component='form'
                        sx={formStyle}
                    >
                        <TextField
                            id='outlined-required'
                            required
                            label='Título (ESP)'
                            defaultValue={benefitToUpdate.title}
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToUpdate, updated => {
                                    updated.title = benefit.target.value;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Título (CAT)'
                            defaultValue={benefitToUpdate.title_cat}
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToUpdate, updated => {
                                    updated.title_cat = benefit.target.value;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Descripción (ESP)'
                            defaultValue={benefitToUpdate.description}
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToUpdate, updated => {
                                    updated.description = benefit.target.value;
                                }));
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Descripción (CAT)'
                            defaultValue={benefitToUpdate.description_cat}
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToUpdate, updated => {
                                    updated.description_cat = benefit.target.value;
                                }));
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Sobre el Proveedor (ESP)'
                            defaultValue={benefitToUpdate.about_provider}
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToUpdate, updated => {
                                    updated.about_provider = benefit.target.value;
                                }));
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Sobre el Proveedor (CAT)'
                            defaultValue={benefitToUpdate.about_provider_cat}
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToUpdate, updated => {
                                    updated.about_provider_cat = benefit.target.value;
                                }));
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            label='Teléfono'
                            placeholder="+34602040598"
                            defaultValue={benefitToUpdate.phone}
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToUpdate, updated => {
                                    updated.phone = benefit.target.value;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Email'
                            placeholder="info@correo.com"
                            defaultValue={benefitToUpdate.email}
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToUpdate, updated => {
                                    updated.email = benefit.target.value;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='URL Web'
                            type="url"
                            placeholder="https://www.example.com"
                            defaultValue={benefitToUpdate.websiteUrl}
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToUpdate, updated => {
                                    updated.websiteUrl = benefit.target.value;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='URL Instagram'
                            type="url"
                            placeholder="https://www.instagram.com/perfil_usuario"
                            defaultValue={benefitToUpdate.instagramUrl}
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToUpdate, updated => {
                                    updated.instagramUrl = benefit.target.value;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='URL Facebook'
                            type="url"
                            placeholder="https://www.facebook.com/perfil_usuario"
                            defaultValue={benefitToUpdate.facebookUrl}
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToUpdate, updated => {
                                    updated.facebookUrl = benefit.target.value;
                                }));
                            }}
                        />
                        {benefitMainImageUrl === null ? null : <span className='images-label'>Imagen de Portada</span>}
                        <div className='main-image-container'>
                            {benefitMainImageUrl === null ?
                                <span className='empty-gallery-label'>Sin imagen de portada *</span> :
                                <img className='gallery-image-thumbnail' src={benefitMainImageUrl} alt={benefit.title} />
                            }
                        </div>
                        <Button
                            variant='contained'
                            size='large'
                            onClick={async () => {
                                if (validateBenefit(benefitToUpdate, benefitMainImageUrl)) {
                                    if (window.confirm(`¿Confirma la actualización del Beneficio: ${benefitToUpdate.title}?`)) {
                                        try {
                                            await DataStore.save(
                                                Benefit.copyOf(benefitToUpdate, updated => {
                                                    updated.benefit_id = createEventIdFromTitle(benefitToUpdate.title);
                                                })
                                            );
                                            fetchBenefits();
                                            setOpenViewBenefit(false);
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
                                if (window.confirm(`¿Confirma la eliminación del Beneficio: ${benefitToUpdate.title}?`)) {
                                    await DataStore.delete(benefitToUpdate);
                                    fetchBenefits();
                                    setOpenViewBenefit(false);
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

    const benefitCreate = (benefitToCreate: Benefit) => {
        return (
            <Modal
                open={openCreateBenefit}
                onClose={() => setOpenCreateBenefit(false)}
            >
                <Box
                    sx={modalStyle}
                >
                    <CloseIcon className='close-modal' onClick={() => setOpenCreateBenefit(false)} />
                    <Box
                        component="form"
                        sx={formStyle}
                    >
                        <TextField
                            id='outlined-required'
                            required
                            label='Título (ESP)'
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.title = benefit.target.value;
                                }))
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Título (CAT)'
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.title_cat = benefit.target.value;
                                }))
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Descripción (ESP)'
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.description = benefit.target.value;
                                }))
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Descripción (CAT)'
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.description_cat = benefit.target.value;
                                }))
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Sobre el Proveedor (ESP)'
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.about_provider = benefit.target.value;
                                }))
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Sobre el Proveedor (CAT)'
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.about_provider_cat = benefit.target.value;
                                }))
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            label='Contacto Telefónico'
                            placeholder="+34602040598"
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.phone = benefit.target.value;
                                }))
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Email'
                            placeholder="info@correo.com"
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.email = benefit.target.value;
                                }))
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='URL Web'
                            type="url"
                            placeholder="https://www.example.com"
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.websiteUrl = benefit.target.value;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='URL Instagram'
                            type="url"
                            placeholder="https://www.instagram.com/perfil_usuario/"
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.instagramUrl = benefit.target.value;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='URL Facebook'
                            type="url"
                            placeholder="https://www.facebook.com/perfil_usuario/"
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.facebookUrl = benefit.target.value;
                                }));
                            }}
                        />
                        {mainImage === null ? null : <span className='images-label'>Imagen de Portada</span>}
                        <div className='main-image-container'>
                            {mainImage === null ? <span className="empty-gallery-label">Sin imagen de portada</span> : getMainImage()}
                        </div>
                        <Input type="file" onChange={handleMainImageChange} />
                        <Button
                            variant='contained'
                            size='large'
                            onClick={async () => {
                                if (validateBenefit(benefitToCreate, mainImage)) {
                                    if (window.confirm(`¿Confirma la creación del Beneficio: ${benefitToCreate.title}?`)) {
                                        try {
                                            await DataStore.save(
                                                new Benefit({
                                                    benefit_id: createEventIdFromTitle(benefitToCreate.title),
                                                    title: benefitToCreate.title,
                                                    title_cat: benefitToCreate.title_cat,
                                                    description: benefitToCreate.description,
                                                    description_cat: benefitToCreate.description_cat,
                                                    about_provider: benefitToCreate.about_provider,
                                                    about_provider_cat: benefitToCreate.about_provider_cat,
                                                    phone: benefitToCreate.phone ? benefitToCreate.phone : null,
                                                    websiteUrl: benefitToCreate.websiteUrl ? benefitToCreate.websiteUrl : null,
                                                    image: mainImage ? `${benefitToCreate.id}/main/${mainImage.name}` : null,
                                                    instagramUrl: benefitToCreate.instagramUrl ? benefitToCreate.instagramUrl : null,
                                                    facebookUrl: benefitToCreate.facebookUrl ? benefitToCreate.facebookUrl : null,
                                                    email: benefitToCreate.email ? benefitToCreate.email : null,
                                                })
                                            );
                                            fetchBenefits();
                                            setOpenCreateBenefit(false);
                                        } catch (e) {
                                            alert(e);
                                        }

                                        if (mainImage) {
                                            uploadImage(`${benefitToCreate.id}/main/${mainImage.name}`, mainImage);
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

    const benefitsResult = () => {
        return (
            <div className='benefits'>
                <div className='items-header'>
                    <h3>Beneficios ({benefits.length})</h3>
                </div>
                {benefits.length === 0 ?
                    <Button
                        variant='contained'
                        size='large'
                        onClick={async () => fetchBenefits()}
                    >
                        Cargar
                    </Button>
                    : <div className='items-container'>
                        {benefits.map((e: Benefit, i) => {
                            return (
                                <div key={i} className='item'>
                                    <span
                                        className='view-item'
                                        onClick={() => {
                                            setBenefit(e);
                                            loadBenefitMainImageUrl(e);
                                            setOpenViewBenefit(true);
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
        fetchBenefits();
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
                {benefitsSearch()}
                {state === 'loading' && benefits.length === 0 ? (
                    <div style={{ display: 'flex' }}>
                        <div className="spinner-container">
                            <div className="loading-spinner" />
                        </div>
                        Cargando
                    </div>
                ) : (
                    <div>
                        {benefitsResult()}
                    </div>
                )}
            </div>
            {benefit && openViewBenefit ? benefitView(benefit) : null}
            {benefit && openCreateBenefit ? benefitCreate(benefit) : null}
        </div>
    );
}

export default BenefitsView;