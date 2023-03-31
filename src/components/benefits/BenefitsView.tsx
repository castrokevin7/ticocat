import React, { useState } from 'react';
import { Benefit } from '../../models';
import { DataStore, Predicates, SortDirection, Storage } from 'aws-amplify';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Box, Button, FormControl, InputAdornment, MenuItem, Modal, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';
import './BenefitsView.css';
import { modalStyle, formStyle } from '../styles';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import Input from '@mui/material/Input';

type QueryExpressionsMap = {
    [searchKey: string]: (searchValue: string) => Promise<Benefit[]>;
}

const useConstructor = (callBack = () => { }) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}

function BenefitsView() {
    const [state, setState] = useState('');
    const [benefits, setBenefits] = useState<Benefit[]>([]);
    const [searchBy, setSearchBy] = useState('title');
    const [searchValue, setSearchValue] = useState('');
    const [openCreateBenefit, setOpenCreateBenefit] = React.useState(false);
    const [mainImage, setMainImage] = useState(null);
    const [benefit, setBenefit] = useState<Benefit>();
    const [openViewBenefit, setOpenViewBenefit] = React.useState(false);

    /* Benefit properties */
    const [benefitMainImageUrl, setBenefitMainImageUrl] = useState<string>(null);

    const handleMainImageChange = (benefit: any) => {
        setMainImage(benefit.target.files[0]);
    }

    const QUERY_EXPRESSIONS: QueryExpressionsMap = {
        'title': (searchValue: string) => DataStore.query(Benefit, e => e.title('contains', searchValue), {
            sort: e => e.createdAt(SortDirection.ASCENDING)
        }),
    };

    const fetchBenefits = (searchBy?: string, searchValue?: string) => {
        setState('loading');
        if (searchBy && searchValue) {
            QUERY_EXPRESSIONS[searchBy](searchValue)
                .then((response) => {
                    setBenefits(response);
                    setState('success');
                })
                .catch((err) => {
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
                            setBenefit(new Benefit({
                                benefit_id: uuidv4()
                            }))
                            setOpenCreateBenefit(true);
                        }}
                    >
                        <AddIcon />
                    </Button>
                    <Select
                        className='search-form-item'
                        id='benefits-search-options'
                        value={searchBy}
                        sx={{ bgcolor: 'background.paper' }}
                        onChange={(benefit) => {
                            if (searchValue) {
                                fetchBenefits(benefit.target.value, searchValue);
                            }
                            setSearchBy(benefit.target.value);
                        }}
                    >
                        <MenuItem value='title'>Nombre</MenuItem>
                    </Select>
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
                        onChange={(benefit) => {
                            if (benefit.target.value) {
                                fetchBenefits(searchBy, benefit.target.value);
                            } else {
                                fetchBenefits();
                            }
                            setSearchValue(benefit.target.value);
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
                                    updated.benefit_id = benefitToUpdate.benefit_id;
                                    updated.title = benefit.target.value;
                                    updated.title_cat = benefitToUpdate.title_cat;
                                    updated.description = benefitToUpdate.description;
                                    updated.description_cat = benefitToUpdate.description_cat;
                                    updated.about_provider = benefitToUpdate.about_provider;
                                    updated.about_provider_cat = benefitToUpdate.about_provider_cat;
                                    updated.phone = benefitToUpdate.phone;
                                    updated.websiteUrl = benefitToUpdate.websiteUrl;
                                    updated.instagramUrl = benefitToUpdate.instagramUrl;
                                    updated.facebookUrl = benefitToUpdate.facebookUrl;
                                    updated.email = benefitToUpdate.email;
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
                                    updated.benefit_id = benefitToUpdate.benefit_id;
                                    updated.title = benefitToUpdate.title
                                    updated.title_cat = benefit.target.value;
                                    updated.description = benefitToUpdate.description;
                                    updated.description_cat = benefitToUpdate.description_cat;
                                    updated.about_provider = benefitToUpdate.about_provider;
                                    updated.about_provider_cat = benefitToUpdate.about_provider_cat;
                                    updated.phone = benefitToUpdate.phone;
                                    updated.websiteUrl = benefitToUpdate.websiteUrl;
                                    updated.instagramUrl = benefitToUpdate.instagramUrl;
                                    updated.facebookUrl = benefitToUpdate.facebookUrl;
                                    updated.email = benefitToUpdate.email;
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
                                    updated.benefit_id = benefitToUpdate.benefit_id;
                                    updated.title = benefitToUpdate.title;
                                    updated.title_cat = benefitToUpdate.title_cat;
                                    updated.description = benefit.target.value;
                                    updated.description_cat = benefitToUpdate.description_cat;
                                    updated.about_provider = benefitToUpdate.about_provider;
                                    updated.about_provider_cat = benefitToUpdate.about_provider_cat;
                                    updated.phone = benefitToUpdate.phone;
                                    updated.websiteUrl = benefitToUpdate.websiteUrl;
                                    updated.instagramUrl = benefitToUpdate.instagramUrl;
                                    updated.facebookUrl = benefitToUpdate.facebookUrl;
                                    updated.email = benefitToUpdate.email;
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
                                    updated.benefit_id = benefitToUpdate.benefit_id;
                                    updated.title = benefitToUpdate.title;
                                    updated.title_cat = benefitToUpdate.title_cat;
                                    updated.description = benefitToUpdate.description;
                                    updated.description_cat = benefit.target.value;
                                    updated.about_provider = benefitToUpdate.about_provider;
                                    updated.about_provider_cat = benefitToUpdate.about_provider_cat;
                                    updated.phone = benefitToUpdate.phone;
                                    updated.websiteUrl = benefitToUpdate.websiteUrl;
                                    updated.instagramUrl = benefitToUpdate.instagramUrl;
                                    updated.facebookUrl = benefitToUpdate.facebookUrl;
                                    updated.email = benefitToUpdate.email;
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
                                    updated.benefit_id = benefitToUpdate.benefit_id;
                                    updated.title = benefitToUpdate.title;
                                    updated.title_cat = benefitToUpdate.title_cat;
                                    updated.description = benefitToUpdate.description;
                                    updated.description_cat = benefitToUpdate.description_cat;
                                    updated.about_provider = benefit.target.value;
                                    updated.about_provider_cat = benefitToUpdate.about_provider_cat;
                                    updated.phone = benefitToUpdate.phone;
                                    updated.websiteUrl = benefitToUpdate.websiteUrl;
                                    updated.instagramUrl = benefitToUpdate.instagramUrl;
                                    updated.facebookUrl = benefitToUpdate.facebookUrl;
                                    updated.email = benefitToUpdate.email;
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
                                    updated.benefit_id = benefitToUpdate.benefit_id;
                                    updated.title = benefitToUpdate.title;
                                    updated.title_cat = benefitToUpdate.title_cat;
                                    updated.description = benefitToUpdate.description;
                                    updated.description_cat = benefitToUpdate.description_cat;
                                    updated.about_provider = benefitToUpdate.about_provider;
                                    updated.about_provider_cat = benefit.target.value;
                                    updated.phone = benefitToUpdate.phone;
                                    updated.websiteUrl = benefitToUpdate.websiteUrl;
                                    updated.instagramUrl = benefitToUpdate.instagramUrl;
                                    updated.facebookUrl = benefitToUpdate.facebookUrl;
                                    updated.email = benefitToUpdate.email;
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
                                    updated.benefit_id = benefitToUpdate.benefit_id;
                                    updated.title = benefitToUpdate.title;
                                    updated.title_cat = benefitToUpdate.title_cat;
                                    updated.description = benefitToUpdate.description;
                                    updated.description_cat = benefitToUpdate.description_cat;
                                    updated.about_provider = benefitToUpdate.about_provider;
                                    updated.about_provider_cat = benefitToUpdate.about_provider_cat;
                                    updated.phone = benefit.target.value;
                                    updated.websiteUrl = benefitToUpdate.websiteUrl;
                                    updated.instagramUrl = benefitToUpdate.instagramUrl;
                                    updated.facebookUrl = benefitToUpdate.facebookUrl;
                                    updated.email = benefitToUpdate.email;
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
                                    updated.benefit_id = benefitToUpdate.benefit_id;
                                    updated.title = benefitToUpdate.title;
                                    updated.title_cat = benefitToUpdate.title_cat;
                                    updated.description = benefitToUpdate.description;
                                    updated.description_cat = benefitToUpdate.description_cat;
                                    updated.about_provider = benefitToUpdate.about_provider;
                                    updated.about_provider_cat = benefitToUpdate.about_provider_cat;
                                    updated.phone = benefitToUpdate.phone;
                                    updated.websiteUrl = benefitToUpdate.websiteUrl;
                                    updated.instagramUrl = benefitToUpdate.instagramUrl;
                                    updated.facebookUrl = benefitToUpdate.facebookUrl;
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
                                    updated.benefit_id = benefitToUpdate.benefit_id;
                                    updated.title = benefitToUpdate.title;
                                    updated.title_cat = benefitToUpdate.title_cat;
                                    updated.description = benefitToUpdate.description;
                                    updated.description_cat = benefitToUpdate.description_cat;
                                    updated.about_provider = benefitToUpdate.about_provider;
                                    updated.about_provider_cat = benefitToUpdate.about_provider_cat;
                                    updated.phone = benefitToUpdate.phone;
                                    updated.websiteUrl = benefit.target.value;
                                    updated.instagramUrl = benefitToUpdate.instagramUrl;
                                    updated.facebookUrl = benefitToUpdate.facebookUrl;
                                    updated.email = benefitToUpdate.email;
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
                                    updated.benefit_id = benefitToUpdate.benefit_id;
                                    updated.title = benefitToUpdate.title;
                                    updated.title_cat = benefitToUpdate.title_cat;
                                    updated.description = benefitToUpdate.description;
                                    updated.description_cat = benefitToUpdate.description_cat;
                                    updated.about_provider = benefitToUpdate.about_provider;
                                    updated.about_provider_cat = benefitToUpdate.about_provider_cat;
                                    updated.phone = benefitToUpdate.phone;
                                    updated.websiteUrl = benefitToUpdate.websiteUrl;
                                    updated.instagramUrl = benefit.target.value;
                                    updated.facebookUrl = benefitToUpdate.facebookUrl;
                                    updated.email = benefitToUpdate.email;
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
                                    updated.benefit_id = benefitToUpdate.benefit_id;
                                    updated.title = benefitToUpdate.title;
                                    updated.title_cat = benefitToUpdate.title_cat;
                                    updated.description = benefitToUpdate.description;
                                    updated.description_cat = benefitToUpdate.description_cat;
                                    updated.about_provider = benefitToUpdate.about_provider;
                                    updated.about_provider_cat = benefitToUpdate.about_provider_cat;
                                    updated.phone = benefitToUpdate.phone;
                                    updated.websiteUrl = benefitToUpdate.websiteUrl;
                                    updated.instagramUrl = benefitToUpdate.instagramUrl;
                                    updated.facebookUrl = benefit.target.value;
                                    updated.email = benefitToUpdate.email;
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
                                                    updated.benefit_id = benefitToUpdate.benefit_id;
                                                    updated.title = benefitToUpdate.title;
                                                    updated.title_cat = benefitToUpdate.title_cat;
                                                    updated.description = benefitToUpdate.description;
                                                    updated.description_cat = benefitToUpdate.description_cat;
                                                    updated.about_provider = benefitToUpdate.about_provider;
                                                    updated.about_provider_cat = benefitToUpdate.about_provider_cat;
                                                    updated.phone = benefitToUpdate.phone;
                                                    updated.websiteUrl = benefitToUpdate.websiteUrl;
                                                    updated.image = benefitToUpdate.image;
                                                    updated.instagramUrl = benefitToUpdate.instagramUrl;
                                                    updated.facebookUrl = benefitToUpdate.facebookUrl;
                                                    updated.email = benefitToUpdate.email;
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
                                    updated.benefit_id = benefitToCreate.benefit_id;
                                    updated.title = benefit.target.value;
                                    updated.title_cat = benefitToCreate.title_cat;
                                    updated.description = benefitToCreate.description;
                                    updated.description_cat = benefitToCreate.description_cat;
                                    updated.about_provider = benefitToCreate.about_provider;
                                    updated.about_provider_cat = benefitToCreate.about_provider_cat;
                                    updated.phone = benefitToCreate.phone;
                                    updated.websiteUrl = benefitToCreate.websiteUrl;
                                    updated.instagramUrl = benefitToCreate.instagramUrl;
                                    updated.facebookUrl = benefitToCreate.facebookUrl;
                                    updated.email = benefitToCreate.websiteUrl;
                                }))
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Título (CAT)'
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.benefit_id = benefitToCreate.benefit_id;
                                    updated.title = benefitToCreate.title
                                    updated.title_cat = benefit.target.value;
                                    updated.description = benefitToCreate.description;
                                    updated.description_cat = benefitToCreate.description_cat;
                                    updated.about_provider = benefitToCreate.about_provider;
                                    updated.about_provider_cat = benefitToCreate.about_provider_cat;
                                    updated.phone = benefitToCreate.phone;
                                    updated.websiteUrl = benefitToCreate.websiteUrl;
                                    updated.instagramUrl = benefitToCreate.instagramUrl;
                                    updated.facebookUrl = benefitToCreate.facebookUrl;
                                    updated.email = benefitToCreate.websiteUrl;
                                }))
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            required
                            label='Descripción (ESP)'
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.benefit_id = benefitToCreate.benefit_id;
                                    updated.title = benefitToCreate.title;
                                    updated.title_cat = benefitToCreate.title_cat;
                                    updated.description = benefit.target.value;
                                    updated.description_cat = benefitToCreate.description_cat;
                                    updated.about_provider = benefitToCreate.about_provider;
                                    updated.about_provider_cat = benefitToCreate.about_provider_cat;
                                    updated.phone = benefitToCreate.phone;
                                    updated.websiteUrl = benefitToCreate.websiteUrl;
                                    updated.instagramUrl = benefitToCreate.instagramUrl;
                                    updated.facebookUrl = benefitToCreate.facebookUrl;
                                    updated.email = benefitToCreate.websiteUrl;
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
                                    updated.benefit_id = benefitToCreate.benefit_id;
                                    updated.title = benefitToCreate.title;
                                    updated.title_cat = benefitToCreate.title_cat;
                                    updated.description = benefitToCreate.description;
                                    updated.description_cat = benefit.target.value;
                                    updated.about_provider = benefitToCreate.about_provider;
                                    updated.about_provider_cat = benefitToCreate.about_provider_cat;
                                    updated.phone = benefitToCreate.phone;
                                    updated.websiteUrl = benefitToCreate.websiteUrl;
                                    updated.instagramUrl = benefitToCreate.instagramUrl;
                                    updated.facebookUrl = benefitToCreate.facebookUrl;
                                    updated.email = benefitToCreate.websiteUrl;
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
                                    updated.benefit_id = benefitToCreate.benefit_id;
                                    updated.title = benefitToCreate.title;
                                    updated.title_cat = benefitToCreate.title_cat;
                                    updated.description = benefitToCreate.description;
                                    updated.description_cat = benefitToCreate.description_cat;
                                    updated.about_provider = benefit.target.value;
                                    updated.about_provider_cat = benefitToCreate.about_provider_cat;
                                    updated.phone = benefitToCreate.phone;
                                    updated.websiteUrl = benefitToCreate.websiteUrl;
                                    updated.instagramUrl = benefitToCreate.instagramUrl;
                                    updated.facebookUrl = benefitToCreate.facebookUrl;
                                    updated.email = benefitToCreate.websiteUrl;
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
                                    updated.benefit_id = benefitToCreate.benefit_id;
                                    updated.title = benefitToCreate.title;
                                    updated.title_cat = benefitToCreate.title_cat;
                                    updated.description = benefitToCreate.description;
                                    updated.description_cat = benefitToCreate.description_cat;
                                    updated.about_provider = benefitToCreate.about_provider;
                                    updated.about_provider_cat = benefit.target.value;
                                    updated.phone = benefitToCreate.phone;
                                    updated.websiteUrl = benefitToCreate.websiteUrl;
                                    updated.instagramUrl = benefitToCreate.instagramUrl;
                                    updated.facebookUrl = benefitToCreate.facebookUrl;
                                    updated.email = benefitToCreate.websiteUrl;
                                }))
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            label='Contacto'
                            placeholder="+34602040598"
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.benefit_id = benefitToCreate.benefit_id;
                                    updated.title = benefitToCreate.title;
                                    updated.title_cat = benefitToCreate.title_cat;
                                    updated.description = benefitToCreate.description;
                                    updated.description_cat = benefitToCreate.description_cat;
                                    updated.about_provider = benefitToCreate.about_provider;
                                    updated.about_provider_cat = benefitToCreate.about_provider_cat;
                                    updated.phone = benefit.target.value;
                                    updated.websiteUrl = benefitToCreate.websiteUrl;
                                    updated.instagramUrl = benefitToCreate.instagramUrl;
                                    updated.facebookUrl = benefitToCreate.facebookUrl;
                                    updated.email = benefitToCreate.websiteUrl;
                                }))
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Email'
                            placeholder="info@correo.com"
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.benefit_id = benefitToCreate.benefit_id;
                                    updated.title = benefitToCreate.title;
                                    updated.title_cat = benefitToCreate.title_cat;
                                    updated.description = benefitToCreate.description;
                                    updated.description_cat = benefitToCreate.description_cat;
                                    updated.about_provider = benefitToCreate.about_provider;
                                    updated.about_provider_cat = benefitToCreate.about_provider_cat;
                                    updated.phone = benefitToCreate.phone;
                                    updated.websiteUrl = benefitToCreate.websiteUrl;
                                    updated.instagramUrl = benefitToCreate.instagramUrl;
                                    updated.facebookUrl = benefitToCreate.facebookUrl;
                                    updated.email = benefit.target.value;
                                }))
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='URL'
                            type="url"
                            placeholder="https://www.example.com"
                            onChange={(benefit) => {
                                setBenefit(Benefit.copyOf(benefitToCreate, updated => {
                                    updated.benefit_id = benefitToCreate.benefit_id;
                                    updated.title = benefitToCreate.title;
                                    updated.title_cat = benefitToCreate.title_cat;
                                    updated.description = benefitToCreate.description;
                                    updated.description_cat = benefitToCreate.description_cat;
                                    updated.about_provider = benefitToCreate.about_provider;
                                    updated.about_provider_cat = benefitToCreate.about_provider_cat;
                                    updated.phone = benefitToCreate.phone;
                                    updated.websiteUrl = benefit.target.value;
                                    updated.instagramUrl = benefitToCreate.instagramUrl;
                                    updated.facebookUrl = benefitToCreate.facebookUrl;
                                    updated.email = benefitToCreate.email;
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
                                    updated.benefit_id = benefitToCreate.benefit_id;
                                    updated.title = benefitToCreate.title;
                                    updated.title_cat = benefitToCreate.title_cat;
                                    updated.description = benefitToCreate.description;
                                    updated.description_cat = benefitToCreate.description_cat;
                                    updated.about_provider = benefitToCreate.about_provider;
                                    updated.about_provider_cat = benefitToCreate.about_provider_cat;
                                    updated.phone = benefitToCreate.phone;
                                    updated.websiteUrl = benefitToCreate.websiteUrl;
                                    updated.instagramUrl = benefit.target.value;
                                    updated.facebookUrl = benefitToCreate.facebookUrl;
                                    updated.email = benefitToCreate.email;
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
                                    updated.benefit_id = benefitToCreate.benefit_id;
                                    updated.title = benefitToCreate.title;
                                    updated.title_cat = benefitToCreate.title_cat;
                                    updated.description = benefitToCreate.description;
                                    updated.description_cat = benefitToCreate.description_cat;
                                    updated.about_provider = benefitToCreate.about_provider;
                                    updated.about_provider_cat = benefitToCreate.about_provider_cat;
                                    updated.phone = benefitToCreate.phone;
                                    updated.websiteUrl = benefitToCreate.websiteUrl;
                                    updated.instagramUrl = benefitToCreate.instagramUrl;
                                    updated.facebookUrl = benefit.target.value;
                                    updated.email = benefitToCreate.email;
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
                                                    benefit_id: benefitToCreate.benefit_id,
                                                    title: benefitToCreate.title,
                                                    title_cat: benefitToCreate.title_cat,
                                                    description: benefitToCreate.description,
                                                    description_cat: benefitToCreate.description_cat,
                                                    about_provider: benefitToCreate.about_provider,
                                                    about_provider_cat: benefitToCreate.about_provider_cat,
                                                    phone: benefitToCreate.phone ? benefitToCreate.phone : null,
                                                    websiteUrl: benefitToCreate.websiteUrl ? benefitToCreate.websiteUrl : null,
                                                    image: mainImage ? `${benefitToCreate.benefit_id}/main/${mainImage.name}` : null,
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
                                            uploadImage(`${benefitToCreate.benefit_id}/main/${mainImage.name}`, mainImage);
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
                {state === 'loading' ? (
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