import React, { useState } from 'react';
import { FAQ } from '../../models';
import { DataStore } from 'aws-amplify';
import AddIcon from '@mui/icons-material/Add';
import './FAQsView.css';
import { Box, Button, FormControl, InputAdornment, Modal, TextField } from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';
import CloseIcon from '@mui/icons-material/Close';
import { RemoveCircleOutline, Search } from '@mui/icons-material';
import { modalStyle, formStyle } from '../styles';

const useConstructor = (callBack = () => { }) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}

function FAQsView() {
    const [state, setState] = useState('');
    const [faqs, setFAQs] = useState<FAQ[]>([]);
    const [faq, setFAQ] = useState<FAQ>();
    const [openViewFAQ, setOpenViewFAQ] = React.useState(false);
    const [openCreateFAQ, setOpenCreateFAQ] = React.useState(false);

    const fetchFAQs = (searchValue?: string) => {
        setState('loading');
        if (searchValue) {
            DataStore.query(FAQ, faq => faq.question('contains', searchValue))
                .then((response) => {
                    setFAQs(response);
                    setState('success');
                })
                .catch((err) => {
                    console.error('Error:', err);
                    setState('error');
                });
        } else {
            DataStore.query(FAQ)
                .then((response) => {
                    setFAQs(response);
                    setState('success');
                })
                .catch((err) => {
                    console.error('Error:', err);
                    setState('error');
                });
        }
    }

    const faqsSearch = () => {
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
                            setFAQ(new FAQ({
                                question: '',
                                question_cat: '',
                                answer: '',
                                answer_cat: '',
                                links: [],
                            }));
                            setOpenCreateFAQ(true);
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
                        id='faqs-search-input'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        variant='outlined'
                        size='small'
                        placeholder='Buscar una pregunta...'
                        onChange={(event) => {
                            if (event.target.value) {
                                fetchFAQs(event.target.value);
                            } else {
                                fetchFAQs();
                            }
                        }}
                    />
                </FormControl>
            </div>
        )
    };

    const faqsResult = () => {
        return (
            <div className='faqs'>
                {faqs.length === 0 ?
                    <Button
                        variant='contained'
                        size='large'
                        onClick={async () => fetchFAQs()}
                    >
                        Cargar
                    </Button>
                    : <div className='items-container'>
                        {faqs.map((faq: FAQ, i) => {
                            return (
                                <div key={i} className='item'>
                                    <span
                                        className='view-item'
                                        onClick={() => {
                                            setFAQ(faq);
                                            setOpenViewFAQ(true);
                                        }}>
                                        <PageviewIcon />
                                    </span>
                                    <span>{faq.question}</span>
                                </div>
                            )
                        })}
                    </div>}
            </div>
        )
    }

    const validateFAQ = (faq: any) => {
        if (!faq.question) {
            alert("Error: Pregunta (ESP) es requerido.");
            return false;
        }
        if (!faq.question_cat) {
            alert("Error: Pregunta (CAT) es requerido.");
            return false;
        }
        if (!faq.answer) {
            alert("Error: Respuest (ESP) es requerido.");
            return false;
        }
        if (!faq.answer_cat) {
            alert("Error: Respuest (CAT) es requerido.");
            return false;
        }
        return true;
    }

    const faqView = (faqToUpdate: FAQ) => {
        return (
            <Modal
                open={openViewFAQ}
                onClose={() => setOpenViewFAQ(false)}
            >
                <Box
                    sx={modalStyle}
                >
                    <CloseIcon className='close-modal' onClick={() => setOpenViewFAQ(false)} />
                    <Box
                        component="form"
                        sx={formStyle}
                    >
                        <TextField
                            id='outlined-required'
                            label='Pregunta (ESP)'
                            defaultValue={faq.question}
                            onChange={(event) => {
                                setFAQ(FAQ.copyOf(faqToUpdate, updated => {
                                    updated.question = event.target.value;
                                    updated.question_cat = faqToUpdate.question_cat;
                                    updated.answer = faqToUpdate.answer;
                                    updated.answer_cat = faqToUpdate.answer_cat;
                                    updated.links = faqToUpdate.links;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Pregunta (CAT)'
                            defaultValue={faq.question_cat}
                            onChange={(event) => {
                                setFAQ(FAQ.copyOf(faqToUpdate, updated => {
                                    updated.question = faqToUpdate.question;
                                    updated.question_cat = event.target.value;
                                    updated.answer = faqToUpdate.answer;
                                    updated.answer_cat = faqToUpdate.answer_cat;
                                    updated.links = faqToUpdate.links;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Respuesta (ESP)'
                            defaultValue={faq.answer}
                            onChange={(event) => {
                                setFAQ(FAQ.copyOf(faqToUpdate, updated => {
                                    updated.question = faqToUpdate.question;
                                    updated.question_cat = faqToUpdate.question_cat;
                                    updated.answer = event.target.value;
                                    updated.answer_cat = faqToUpdate.answer_cat;
                                    updated.links = faqToUpdate.links;
                                }));
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            label='Respuesta (CAT)'
                            defaultValue={faq.answer_cat}
                            onChange={(event) => {
                                setFAQ(FAQ.copyOf(faqToUpdate, updated => {
                                    updated.question = faqToUpdate.question;
                                    updated.question_cat = faqToUpdate.question_cat;
                                    updated.answer = faqToUpdate.answer;
                                    updated.answer_cat = event.target.value;
                                    updated.links = faqToUpdate.links;
                                }));
                            }}
                            multiline
                            rows={4}
                        />
                        {faqToUpdate.links !== null && faqToUpdate.links.length !== 0 &&
                            <div style={{ border: '1px solid gray', padding: 5, borderRadius: 5 }}>
                                {faq.links.map((link, i) => {
                                    return (
                                        <div style={{ display: 'flex' }} key={i}>
                                            <TextField
                                                id='outlined-required'
                                                label={`Link ${i + 1}`}
                                                defaultValue={link}
                                                sx={{ height: '50px' }}
                                                onChange={(event) => {
                                                    const updateLinks = faqToUpdate.links.map((link, index) => {
                                                        if (index === i) {
                                                            return event.target.value;
                                                        } else {
                                                            return link;
                                                        }
                                                    });
                                                    setFAQ(FAQ.copyOf(faqToUpdate, updated => {
                                                        updated.question = faqToUpdate.question;
                                                        updated.question_cat = faqToUpdate.question_cat;
                                                        updated.answer = faqToUpdate.answer;
                                                        updated.answer_cat = faqToUpdate.answer_cat;
                                                        updated.links = updateLinks;
                                                    }));
                                                }}
                                            />
                                            <Button
                                                variant='text'
                                                color='error'
                                                sx={{ width: '1px', height: '50px' }}
                                                onClick={() => {
                                                    const updateLinks = faqToUpdate.links.filter((link, index) => {
                                                        console.log(link);
                                                        return index !== i;
                                                    });
                                                    setFAQ(FAQ.copyOf(faqToUpdate, updated => {
                                                        updated.question = faqToUpdate.question;
                                                        updated.question_cat = faqToUpdate.question_cat;
                                                        updated.answer = faqToUpdate.answer;
                                                        updated.answer_cat = faqToUpdate.answer_cat;
                                                        updated.links = updateLinks;
                                                    }));
                                                }}
                                            >
                                                <RemoveCircleOutline />
                                            </Button>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        <Button
                            variant='contained'
                            size='large'
                            onClick={async () => {
                                if (validateFAQ(faq)) {
                                    if (window.confirm(`¿Confirma la actualización de la Pregunta: ${faq.question}?`)) {
                                        try {
                                            await DataStore.save(
                                                FAQ.copyOf(faq, updated => {
                                                    updated.question = faqToUpdate.question;
                                                    updated.question_cat = faqToUpdate.question_cat;
                                                    updated.answer = faqToUpdate.answer;
                                                    updated.answer_cat = faqToUpdate.answer_cat;
                                                    updated.links = faqToUpdate.links;
                                                })
                                            );
                                            fetchFAQs();
                                            setOpenViewFAQ(false);
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
                                if (window.confirm(`¿Confirma la eliminación de la Pregunta: ${faq.question}?`)) {
                                    await DataStore.delete(faq);
                                    fetchFAQs();
                                    setOpenViewFAQ(false);
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

    const faqCreate = (faqToCreate: FAQ) => {
        return (
            <Modal
                open={openCreateFAQ}
                onClose={() => setOpenCreateFAQ(false)}
            >
                <Box
                    sx={modalStyle}
                >
                    <CloseIcon className='close-modal' onClick={() => setOpenCreateFAQ(false)} />
                    <Box
                        component='form'
                        noValidate
                        autoComplete='off'
                        sx={formStyle}
                    >
                        <TextField
                            id='outlined-required'
                            label='Pregunta (ESP)'
                            onChange={(event) => {
                                setFAQ(FAQ.copyOf(faqToCreate, updated => {
                                    updated.question = event.target.value;
                                    updated.question_cat = faqToCreate.question_cat;
                                    updated.answer = faqToCreate.answer;
                                    updated.answer_cat = faqToCreate.answer_cat;
                                    updated.links = faqToCreate.links;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Pregunta (CAT)'
                            onChange={(event) => {
                                setFAQ(FAQ.copyOf(faqToCreate, updated => {
                                    updated.question = faqToCreate.question;
                                    updated.question_cat = event.target.value;
                                    updated.answer = faqToCreate.answer;
                                    updated.answer_cat = faqToCreate.answer_cat;
                                    updated.links = faqToCreate.links;
                                }));
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Respuest (ESP)'
                            onChange={(event) => {
                                setFAQ(FAQ.copyOf(faqToCreate, updated => {
                                    updated.question = faqToCreate.question;
                                    updated.question_cat = faqToCreate.question_cat;
                                    updated.answer = event.target.value;
                                    updated.answer_cat = faqToCreate.answer_cat;
                                    updated.links = faqToCreate.links;
                                }));
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            label='Respuest (CAT)'
                            onChange={(event) => {
                                setFAQ(FAQ.copyOf(faqToCreate, updated => {
                                    updated.question = faqToCreate.question;
                                    updated.question_cat = faqToCreate.question_cat;
                                    updated.answer = faqToCreate.answer;
                                    updated.answer_cat = event.target.value;
                                    updated.links = faqToCreate.links;
                                }));
                            }}
                            multiline
                            rows={4}
                        />
                        {faqToCreate.links !== null && faqToCreate.links.length !== 0 &&
                            <div style={{ border: '1px solid gray', padding: 5, borderRadius: 5 }}>
                                {faq.links.map((link, i) => {
                                    return (
                                        <div style={{ display: 'flex' }} key={i}>
                                            <TextField
                                                id='outlined-required'
                                                label={`Link ${i + 1}`}
                                                defaultValue={link}
                                                sx={{ height: '50px' }}
                                                onChange={(event) => {
                                                    const updateLinks = faqToCreate.links.map((link, index) => {
                                                        if (index === i) {
                                                            return event.target.value;
                                                        } else {
                                                            return link;
                                                        }
                                                    });
                                                    setFAQ(FAQ.copyOf(faqToCreate, updated => {
                                                        updated.question = faqToCreate.question;
                                                        updated.question_cat = faqToCreate.question_cat;
                                                        updated.answer = faqToCreate.answer;
                                                        updated.answer_cat = faqToCreate.answer_cat;
                                                        updated.links = updateLinks;
                                                    }));
                                                }}
                                            />
                                            <Button
                                                variant='text'
                                                color='error'
                                                sx={{ width: '1px', height: '50px' }}
                                                onClick={() => {
                                                    const updateLinks = faqToCreate.links.filter((link, index) => {
                                                        console.log(link);
                                                        return index !== i;
                                                    });
                                                    setFAQ(FAQ.copyOf(faqToCreate, updated => {
                                                        updated.question = faqToCreate.question;
                                                        updated.question_cat = faqToCreate.question_cat;
                                                        updated.answer = faqToCreate.answer;
                                                        updated.answer_cat = faqToCreate.answer_cat;
                                                        updated.links = updateLinks;
                                                    }));
                                                }}
                                            >
                                                <RemoveCircleOutline />
                                            </Button>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        <Button
                            variant='contained'
                            size='large'
                            onClick={async () => {
                                if (validateFAQ(faqToCreate)) {
                                    if (window.confirm(`¿Confirma la creación de la Pregunta: ${faqToCreate.question}?`)) {
                                        try {
                                            await DataStore.save(
                                                new FAQ({
                                                    question: faqToCreate.question,
                                                    question_cat: faqToCreate.question_cat,
                                                    answer: faqToCreate.answer,
                                                    answer_cat: faqToCreate.answer_cat,
                                                    links: faqToCreate.links,
                                                })
                                            );
                                            fetchFAQs();
                                            setOpenCreateFAQ(false);
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
                </Box>
            </Modal>
        )
    }

    useConstructor(() => {
        setState('loading');
        fetchFAQs();
    });

    if (state === 'error') {
        return (
            <h1>
                Hubo un error...
            </h1>
        );
    }
    return (
        <div>
            <div>
                {faqsSearch()}
                {state === 'loading' && faqs.length === 0 ? (
                    <div style={{ display: 'flex' }}>
                        <div className="spinner-container">
                            <div className="loading-spinner" />
                        </div>
                        Cargando
                    </div>
                ) : (
                    <div>
                        {faqsResult()}
                    </div>
                )}
            </div>
            {faq && openViewFAQ ? faqView(faq) : null}
            {faq && openCreateFAQ ? faqCreate(faq) : null}

        </div>
    );
}

export default FAQsView;
