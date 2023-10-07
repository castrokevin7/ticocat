import React, { useState } from 'react';
import { FAQ } from '../../models';
import { DataStore } from 'aws-amplify';
import AddIcon from '@mui/icons-material/Add';
import './FAQsView.css';
import { Box, Button, FormControl, InputAdornment, Modal, TextField } from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';
import CloseIcon from '@mui/icons-material/Close';
import { Search } from '@mui/icons-material';
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
                        onClick={() => setOpenCreateFAQ(true)}
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

    const faqView = (faq: FAQ) => {
        let faqToUpdate = {
            question: faq.question,
            question_cat: faq.question_cat,
            answer: faq.answer,
            answer_cat: faq.answer_cat,
            links: faq.links,
        };

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
                                faqToUpdate.question = event.target.value;
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Pregunta (CAT)'
                            defaultValue={faq.question_cat}
                            onChange={(event) => {
                                faqToUpdate.question_cat = event.target.value;
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Respuesta (ESP)'
                            defaultValue={faq.answer}
                            onChange={(event) => {
                                faqToUpdate.answer = event.target.value;
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            label='Respuesta (CAT)'
                            defaultValue={faq.answer_cat}
                            onChange={(event) => {
                                faqToUpdate.answer_cat = event.target.value;
                            }}
                            multiline
                            rows={4}
                        />
                        <Button
                            variant='contained'
                            size='large'
                            onClick={async () => {
                                if (validateFAQ(faq)) {
                                    if (window.confirm(`¿Confirma la actualización de la pregunta: ${faq.question}?`)) {
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

    const faqCreate = () => {
        let faqToCreate = {
            question: '',
            question_cat: '',
            answer: '',
            answer_cat: '',
            links: [],
        };
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
                                faqToCreate.question = event.target.value;
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Pregunta (CAT)'
                            onChange={(event) => {
                                faqToCreate.question_cat = event.target.value;
                            }}
                        />
                        <TextField
                            id='outlined-required'
                            label='Respuest (ESP)'
                            onChange={(event) => {
                                faqToCreate.answer = event.target.value;
                            }}
                            multiline
                            rows={4}
                        />
                        <TextField
                            id='outlined-required'
                            label='Respuest (CAT)'
                            onChange={(event) => {
                                faqToCreate.answer_cat = event.target.value;
                            }}
                            multiline
                            rows={4}
                        />
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

    if (state === 'error')
        return (
            <h1>
                Hubo un error...
            </h1>
        );
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
            {faq ? faqView(faq) : null}
            {faqCreate()}

        </div>
    );
}

export default FAQsView;
