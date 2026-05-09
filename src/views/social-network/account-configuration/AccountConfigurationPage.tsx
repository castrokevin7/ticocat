import React, { useState, useEffect, ChangeEvent } from 'react';
import DefaultNavbar from '../../../components/Navbars/DefaultNavbar';
import { getLang } from '../../../utils/Translator';
import MKBox from '../../../components/MKBox';
import bgImage from '../../../assets/images/bg-configuration.jpg';
import Container from '@mui/material/Container';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Associate, Interests, Benefit } from '../../../models';
import { DataStore, Storage } from 'aws-amplify';
import Translator from '../../../utils/Translator';
import MKTypography from '../../../components/MKTypography';
import { Spinner } from '../../../components/Spinner';
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import MKInput from '../../../components/MKInput';
import Icon from '@mui/material/Icon';
import './AccountConfigurationPage.css';
import { getInterestTranslationKey } from '../utils';
import routes from '../routes';
import Footer from '../Footer';
import Chip from '@mui/material/Chip';

function AccountConfigurationPage() {
    const [state, setState] = useState("loading");
    const [associate, setAssociate] = useState<Associate | undefined>();
    const [associateOfferedBenefits, setAssociateOfferedBenefits] = useState<Benefit[] | undefined>();
    const [isLoadingBenefits, setIsLoadingBenefits] = useState(false);
    const { route } = useAuthenticator(context => [context.route]);
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [username, setUsername] = useState<string | undefined>();
    const [bio, setBio] = useState<string | undefined>();
    const [customName, setCustomName] = useState<string | undefined>();
    const [instagramUsername, setInstagramUsername] = useState<string | undefined>();
    const [facebookUsername, setFacebookUsername] = useState<string | undefined>();
    const [linkedinUsername, setLinkedinUsername] = useState<string | undefined>();
    const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);
    const [profilePictureToUpload, setProfilePictureToUpload] = useState<File | undefined>();
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [interests, setInterests] = useState<(Interests | null)[] | undefined>();

    const fetchAssociate = async (email: string) => {
        try {
            let response = await DataStore.query(Associate, a => a.email("eq",email));
            if (response.length > 0) {
                let associateData = response[0];
                if (associateData.profile_picture) {
                    const image = await Storage.get(associateData.profile_picture, { level: 'public' });
                    associateData = Associate.copyOf(associateData, updated => {
                        updated.profile_picture = image;
                    });
                }
                setAssociate(associateData);
                setState('success');
            } else {
                console.error('Error: Associate not found');
                setState('error');
            }
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    };

    const fetchAssociateOfferedBenefits = async (assoc: Associate) => {
        if (associateOfferedBenefits && associateOfferedBenefits.length > 0) {
            return;
        }

        setIsLoadingBenefits(true);
        try {
            const response = await DataStore.query(Benefit, b => b.associate_id("eq",assoc.id));
            if (response.length > 0) {
                setAssociateOfferedBenefits(response);
            }
        } catch (err) {
            console.error('Error:', err);
        }
        setIsLoadingBenefits(false);
    };

    useEffect(() => {
        if (route === 'authenticated' && user?.attributes?.email) {
            setState('loading');
            fetchAssociate(user.attributes.email);
        }
    }, [route, user]);

    useEffect(() => {
        if (associate) {
            markAccountAsActivated(associate);
            fetchAssociateOfferedBenefits(associate);
            if (!username) {
                setUsername(associate.username || undefined);
            }
            if (!bio) {
                setBio(associate.bio || undefined);
            }
            if (!customName) {
                setCustomName(associate.custom_name || associate.name || undefined);
            }
            if (!instagramUsername) {
                setInstagramUsername(associate.instagram_username || undefined);
            }
            if (!facebookUsername) {
                setFacebookUsername(associate.facebook_username || undefined);
            }
            if (!linkedinUsername) {
                setLinkedinUsername(associate.linkedin_username || undefined);
            }
            if (!interests && Array.isArray(associate.interests)) {
                setInterests(associate.interests as (Interests | null)[]);
            }
        }
        // eslint-disable-next-line
    }, [associate]);

    if (!user || route !== 'authenticated') {
        return <Navigate to={`/${getLang()}/acceso`} />;
    }

    const markAccountAsActivated = async (assoc: Associate) => {
        if (assoc.is_account_activated)
            return;

        try {
            const original = await DataStore.query(Associate, assoc.id);
            if (original) {
                await DataStore.save(
                    Associate.copyOf(original, updated => {
                        updated.is_account_activated = true;
                    })
                );
            }
        } catch (err) {
            console.error('Error activating account:', err);
        }
    }


    const getAccountHeaderControls = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', justifyContent: 'flex-end' }}>
                <span style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                    <Icon fontSize="large"
                        onClick={() => {
                            signOut();
                            setState('signingOut');
                        }}
                    >
                        logout_rounded
                    </Icon>
                    <MKTypography variant="caption" color="text">Salir</MKTypography>
                </span>
            </div>
        );
    }

    const getBenefitsOffered = () => {
        const displayBenefitsOffered = () => {
            if (isLoadingBenefits) {
                return (
                    <MKTypography
                        sx={{ mx: 'auto', display: 'flex', alignItems: 'center' }}
                        variant="body2"
                        color="text"
                        mt={2}
                    >
                        <Spinner /> {Translator.instance.translate("account_page_loading_benefits_offered")}
                    </MKTypography>
                );
            }

            if (!associateOfferedBenefits || associateOfferedBenefits.length === 0) {
                return (
                    <MKTypography
                        variant="body2"
                        color="text"
                    >
                        Aún no ofreces beneficios a la comunidad TICOCAT. Si deseas ofrecer beneficios, por favor comunícate con nosotros a través de nuestro correo electrónico
                        {' '}
                        <MKTypography
                            component="a"
                            target="_blank"
                            href="mailto:contacto@asoticocat.org?Subject=Quiero ofertar beneficios"
                            variant="body2"
                            color="info"
                            fontWeight="regular"
                        >
                            {Translator.instance.translate("account_page_about_updating_information_link")}
                        </MKTypography>
                        .
                    </MKTypography>
                );
            } else {
                return (
                    <ul style={{ marginLeft: '30px' }}>
                        {associateOfferedBenefits && associateOfferedBenefits.map(benefit => (
                            <li key={benefit.id}>
                                <Link target="_blank" to={`/${getLang()}/beneficio/${benefit.benefit_id}`}>
                                    <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text">
                                        {benefit.title}
                                    </MKTypography>
                                </Link>
                            </li>
                        ))}
                    </ul>
                );
            }

        }

        return (
            <>
                <MKTypography variant="body2" color="text">
                    <b>{Translator.instance.translate("account_page_benefits_offered")}</b>:
                </MKTypography>
                {displayBenefitsOffered()}
            </>
        );
    }

    const getRegistryInformation = () => {
        if (!associate) return null;

        return (
            <>
                <MKTypography variant="h4" mb={2}>
                    {Translator.instance.translate("account_page_inscription_information_header")}
                </MKTypography>
                <MKTypography variant="body2" color="text" mb={1}>
                    {Translator.instance.translate("account_page_about_updating_information")}
                    {' '}
                    <MKTypography
                        component="a"
                        target="_blank"
                        href="mailto:contacto@asoticocat.org?Subject=Quiero actualizar mi información"
                        variant="body2"
                        color="info"
                        fontWeight="regular"
                    >
                        {Translator.instance.translate("account_page_about_updating_information_link")}
                    </MKTypography>
                    .
                </MKTypography>
                <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mb={1}>
                    <b>{Translator.instance.translate("account_page_number_label")}</b>: {associate.associate_id}
                </MKTypography>
                <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mt={1} mb={1}>
                    <b>{Translator.instance.translate("account_page_name_label")}</b>: {associate.name}
                </MKTypography>
                <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mb={1}>
                    <b>{Translator.instance.translate("account_page_email_label")}</b>: {associate.email}
                </MKTypography>
                {associate.phone && (
                    <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mb={1}>
                        <b>{Translator.instance.translate("account_page_phone_label")}</b>: {associate.phone}
                    </MKTypography>
                )}
                {associate.identification && (
                    <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mb={1}>
                        <b>{Translator.instance.translate("account_page_id_label")}</b>: {associate.identification}
                    </MKTypography>
                )}
                {getBenefitsOffered()}
            </>
        );
    }

    const getPublicAccountToggle = () => {
        if (!associate) return null;

        const updateProfileVisiblitySettings = async () => {
            try {
                const original = await DataStore.query(Associate, associate.id);
                if (original) {
                    await DataStore.save(
                        Associate.copyOf(original, updated => {
                            updated.is_public_profile = !original.is_public_profile;
                        })
                    );
                    if (user?.attributes?.email) {
                        fetchAssociate(user.attributes.email);
                    }
                }
            } catch (err) {
                console.error('Error updating public profile:', err);
            }
        }

        return (
            <MKBox display="flex" alignItems="center" mb={2}>
                <Switch checked={associate.is_public_profile || false} onChange={updateProfileVisiblitySettings} />
                <MKBox ml={2} lineHeight={0.5}>
                    <MKTypography variant="h6">
                        {Translator.instance.translate("account_page_social_public_account_label")}
                    </MKTypography>
                    <MKTypography variant="body2" color="text">
                        {Translator.instance.translate("account_page_social_public_account_description")}.
                    </MKTypography>
                </MKBox>
            </MKBox>
        )
    }

    const getPublicPhoneToggle = () => {
        if (!associate) return null;

        const updatePhoneVisiblitySettings = async () => {
            try {
                const original = await DataStore.query(Associate, associate.id);
                if (original) {
                    await DataStore.save(
                        Associate.copyOf(original, updated => {
                            updated.share_phone = !original.share_phone;
                        })
                    );
                    if (user?.attributes?.email) {
                        fetchAssociate(user.attributes.email);
                    }
                }
            } catch (err) {
                console.error('Error updating public phone:', err);
            }
        }

        return (
            <MKBox display="flex" alignItems="center" mb={2}>
                <Switch checked={associate.share_phone || false} onChange={updatePhoneVisiblitySettings} />
                <MKBox ml={2} lineHeight={0.5}>
                    <MKTypography variant="h6">
                        {Translator.instance.translate("account_page_social_public_phone_label")}
                    </MKTypography>
                    <MKTypography variant="body2" color="text">
                        {Translator.instance.translate("account_page_social_public_phone_description")}.
                    </MKTypography>
                </MKBox>
            </MKBox>
        )
    }

    const getPublicEmailToggle = () => {
        if (!associate) return null;

        const updateEmailVisiblitySettings = async () => {
            try {
                const original = await DataStore.query(Associate, associate.id);
                if (original) {
                    await DataStore.save(
                        Associate.copyOf(original, updated => {
                            updated.share_email = !original.share_email;
                        })
                    );
                    if (user?.attributes?.email) {
                        fetchAssociate(user.attributes.email);
                    }
                }
            } catch (err) {
                console.error('Error updating public email:', err);
            }
        }

        return (
            <MKBox display="flex" alignItems="center" mb={2}>
                <Switch checked={associate.share_email || false} onChange={updateEmailVisiblitySettings} />
                <MKBox ml={2} lineHeight={0.5}>
                    <MKTypography variant="h6">
                        {Translator.instance.translate("account_page_social_public_email_label")}
                    </MKTypography>
                    <MKTypography variant="body2" color="text">
                        {Translator.instance.translate("account_page_social_public_email_description")}.
                    </MKTypography>
                </MKBox>
            </MKBox>
        )
    }

    const MAX_USERNAME_LENGTH = 32;
    const getUsernameField = () => {
        if (!associate) return null;

        const updateUsername = async (event: ChangeEvent<HTMLInputElement>) => {
            const newUsername = event.target.value;

            if (newUsername.length > MAX_USERNAME_LENGTH) {
                return;
            }

            if (newUsername === '' || newUsername === associate.username) {
                setUsername(newUsername);
                setUsernameAlreadyExists(false);
                return;
            }

            if (/^[a-z0-9_]*$/.test(newUsername)) {
                const otherAssociate = await DataStore.query(Associate, a => a.username("eq",newUsername));
                if (otherAssociate.length > 0) {
                    console.error('Error: Username already exists');
                    setUsernameAlreadyExists(true);
                } else {
                    setUsernameAlreadyExists(false);
                }

                setUsername(newUsername);
            }
        }

        const getUpdateUsernameControls = () => {
            const updateAssociateUsername = async () => {
                try {
                    const original = await DataStore.query(Associate, associate.id);
                    if (original) {
                        await DataStore.save(
                            Associate.copyOf(original, updated => {
                                updated.username = username || null;
                            })
                        );
                        if (user?.attributes?.email) {
                            fetchAssociate(user.attributes.email);
                        }
                    }
                } catch (err) {
                    console.error('Error updating username:', err);
                }
            }

            if (username === associate.username || usernameAlreadyExists) {
                return null;
            }

            return (
                <div className="controls-container">
                    <Icon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={updateAssociateUsername}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={() => setUsername(associate.username || undefined)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        return (
            <div style={{ marginTop: '5px' }}>
                <Grid container item xs={12} py={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <div className="form-label-field-container">
                        <MKTypography variant="h5" color="secondary">
                            Nombre de usuario
                        </MKTypography>
                        {getUpdateUsernameControls()}
                    </div>
                    <MKInput
                        variant="standard"
                        placeholder="usuariocool123"
                        InputLabelProps={{ shrink: true }}
                        onChange={updateUsername}
                        value={username || ''}
                        fullWidth
                    />
                    <MKTypography variant="caption" color="info">
                        {username ? username.length : 0}/{MAX_USERNAME_LENGTH}
                    </MKTypography>
                    {usernameAlreadyExists && (
                        <MKTypography variant="caption" color="error">
                            {Translator.instance.translate("account_page_username_already_exists")}
                        </MKTypography>
                    )}
                </Grid>
            </div>
        )
    }

    const getProfilePictureField = () => {
        if (!associate) return null;

        const updateProfilePicture = (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            setProfilePictureToUpload(file);
        };

        const getUpdateProfilePictureControls = () => {
            if (!profilePictureToUpload) {
                return null;
            }

            const updateAssociateProfilePicture = async () => {
                setIsUploadingImage(true);
                try {
                    const original = await DataStore.query(Associate, associate.id);

                    const profilePictureKey = `associates/${associate.id}/profile_picture/${profilePictureToUpload.name}`;
                    await Storage.put(profilePictureKey, profilePictureToUpload, {
                        contentType: profilePictureToUpload.type,
                        level: 'public'
                    });

                    if (original) {
                        await DataStore.save(
                            Associate.copyOf(original, updated => {
                                updated.profile_picture = profilePictureKey;
                            })
                        );
                        if (user?.attributes?.email) {
                            fetchAssociate(user.attributes.email);
                        }
                    }
                    setProfilePictureToUpload(undefined);
                } catch (err) {
                    console.error('Error updating profile picture:', err);
                }
                setIsUploadingImage(false);
            }

            return (
                <div className="controls-container">
                    {isUploadingImage ? <Spinner /> : (
                        <>
                            <Icon
                                sx={{ mr: 1, cursor: 'pointer' }}
                                onClick={updateAssociateProfilePicture}
                            >
                                check
                            </Icon>
                            <Icon
                                sx={{ mr: 1, cursor: 'pointer' }}
                                onClick={() => setProfilePictureToUpload(undefined)}
                            >
                                close
                            </Icon>
                        </>
                    )}
                </div >
            )
        };

        const getProfilePicture = () => {
            if (profilePictureToUpload && profilePictureToUpload instanceof File) {
                return URL.createObjectURL(profilePictureToUpload);
            }

            return associate.profile_picture;
        }

        const displayProfilePicture = () => {
            if (!associate.profile_picture && !profilePictureToUpload) {
                return (
                    <MKTypography variant="caption" color="text">
                        No hay imagen de perfil
                    </MKTypography>
                )
            }

            const removeProfilePicture = async () => {
                if (window.confirm('¿Estás seguro de que quieres eliminar la imagen de perfil?')) {
                    try {
                        const original = await DataStore.query(Associate, associate.id);
                        if (original) {
                            await DataStore.save(
                                Associate.copyOf(original, updated => {
                                    updated.profile_picture = null;
                                })
                            );
                            if (user?.attributes?.email) {
                                fetchAssociate(user.attributes.email);
                            }
                        }
                        setProfilePictureToUpload(undefined);
                    }
                    catch (err) {
                        console.error('Error removing profile picture:', err);
                    }
                }
            }

            const ableToDeleteProfilePicture = () => {
                return associate.profile_picture && !isUploadingImage;
            }

            return (
                <div style={{ display: 'flex' }}>
                    <div
                        id="display-profile-picture"
                        style={{ backgroundImage: `url(${getProfilePicture()})` }}
                    />
                    {ableToDeleteProfilePicture() && (
                        <Icon
                            sx={{ ml: 1, cursor: 'pointer' }}
                            onClick={removeProfilePicture}
                        >
                            delete_outline_rounded
                        </Icon>

                    )}
                </div>
            )
        }

        return (
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                <MKTypography variant="h5" color="secondary">
                    Imagen de Perfil
                </MKTypography>
                {displayProfilePicture()}
                <div>
                    <input type="file" accept="image/*" onChange={updateProfilePicture} />
                </div>
                {getUpdateProfilePictureControls()}
            </div>
        )
    }

    const MAX_CUSTOM_NAME_LENGTH = 64;
    const getCustomNameField = () => {
        if (!associate) return null;

        const updateCustomName = async (event: ChangeEvent<HTMLInputElement>) => {
            const newCustomName = event.target.value;

            if (newCustomName.length > MAX_CUSTOM_NAME_LENGTH) {
                return;
            }

            if (newCustomName === '' || newCustomName === associate.custom_name) {
                setCustomName(newCustomName);
                return;
            }

            if (/^[a-zA-Z áÁàÀéÉèÈüÜóÓòÒíÍìÌúÚùÙñÑ]*$/.test(newCustomName)) {
                setCustomName(newCustomName);
            }
        }

        const getUpdateCustomNameControls = () => {
            if (customName === associate.custom_name) {
                return null;
            }

            const updateAssociateCustomName = async () => {
                try {
                    const original = await DataStore.query(Associate, associate.id);
                    if (original && customName) {
                        await DataStore.save(
                            Associate.copyOf(original, updated => {
                                updated.custom_name = customName.trim();
                            })
                        );
                        if (user?.attributes?.email) {
                            fetchAssociate(user.attributes.email);
                        }
                    }
                } catch (err) {
                    console.error('Error updating customName:', err);
                }
            }

            return (
                <div className="controls-container">
                    <Icon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={updateAssociateCustomName}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={() => setCustomName(associate.custom_name || associate.name || undefined)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        return (
            <div style={{ marginTop: '5px' }}>
                <Grid container item xs={12} py={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <div className="form-label-field-container">
                        <MKTypography variant="h5" color="secondary">
                            Nombre a mostrar
                        </MKTypography>
                        {getUpdateCustomNameControls()}
                    </div>
                    <MKInput
                        variant="standard"
                        placeholder="Pedro Sánchez"
                        InputLabelProps={{ shrink: true }}
                        onChange={updateCustomName}
                        value={customName || ''}
                        fullWidth
                    />
                    <MKTypography variant="caption" color="info">
                        {customName ? customName.length : 0}/{MAX_CUSTOM_NAME_LENGTH}
                    </MKTypography>
                </Grid>
            </div>
        )
    }

    const MAX_BIO_LENGTH = 512;
    const getBioField = () => {
        if (!associate) return null;

        const updateBio = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const newBio = event.target.value;

            if (newBio.length > MAX_BIO_LENGTH) {
                return;
            }

            if (newBio === '') {
                setBio(newBio);
                return;
            }

            if (/^[a-zA-Z0-9_.,!¡¿?() -$€@"'áÁàÀéÉèÈüÜóÓòÒíÍìÌúÚùÙñÑ\n\r]*$/.test(newBio)) {
                setBio(newBio);
            }
        }

        const getUpdateBioControls = () => {
            if (bio === associate.bio) {
                return null;
            }

            const updateAssociateBio = async () => {
                try {
                    const original = await DataStore.query(Associate, associate.id);
                    if (original && bio) {
                        await DataStore.save(
                            Associate.copyOf(original, updated => {
                                updated.bio = bio.trim();
                            })
                        );
                        if (user?.attributes?.email) {
                            fetchAssociate(user.attributes.email);
                        }
                    }
                } catch (err) {
                    console.error('Error updating bio:', err);
                }
            }

            return (
                <div className="controls-container">
                    <Icon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={updateAssociateBio}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={() => setBio(associate.bio || undefined)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        return (
            <div style={{ marginTop: '15px' }}>
                <Grid container item xs={12} py={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <div className="form-label-field-container">
                        <MKTypography variant="h5" color="secondary">
                            Biografía
                        </MKTypography>
                        {getUpdateBioControls()}
                    </div>
                    <MKInput
                        variant="standard"
                        placeholder="Escribe algo sobre ti"
                        InputLabelProps={{ shrink: true }}
                        multiline
                        rows={4}
                        value={bio || ''}
                        onChange={updateBio}
                        fullWidth
                    />
                    <MKTypography variant="caption" color="info">
                        {bio ? bio.length : 0}/{MAX_BIO_LENGTH}
                    </MKTypography>
                </Grid>
            </div>
        )
    }

    const MAX_INSTAGRAM_USERNAME_LENGTH = 29;
    const getInstagramField = () => {
        if (!associate) return null;

        const updateInstagramUsernameValue = async (event: ChangeEvent<HTMLInputElement>) => {
            const newInstagramUsername = event.target.value;

            if (newInstagramUsername.length > MAX_INSTAGRAM_USERNAME_LENGTH) {
                return;
            }

            if (newInstagramUsername === '' || newInstagramUsername === associate.instagram_username) {
                setInstagramUsername(newInstagramUsername);
                return;
            }

            if (/^[a-zA-Z0-9_.]*$/.test(newInstagramUsername)) {
                setInstagramUsername(newInstagramUsername);
            }
        }

        const getUpdateInstagramUsernameControls = () => {
            if (instagramUsername === associate.instagram_username) {
                return null;
            }

            const updateAssociateInstagramUsername = async () => {
                try {
                    const original = await DataStore.query(Associate, associate.id);
                    if (original) {
                        await DataStore.save(
                            Associate.copyOf(original, updated => {
                                updated.instagram_username = instagramUsername || null;
                            })
                        );
                        if (user?.attributes?.email) {
                            fetchAssociate(user.attributes.email);
                        }
                    }
                } catch (err) {
                    console.error('Error updating instagram_username:', err);
                }
            }

            return (
                <div className="controls-container">
                    <Icon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={updateAssociateInstagramUsername}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={() => setInstagramUsername(associate.instagram_username || undefined)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        return (
            <div style={{ marginTop: '20px', display: 'flex' }}>
                <Grid container item xs={12} py={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <div className="form-label-field-container">
                        <div className="form-label-field-social-media-container">
                            <MKTypography variant="h5" color="secondary">
                                Usuario de Instagram
                            </MKTypography>
                            {
                                associate.instagram_username && (
                                    <a className="social-media-link" href={`https://www.instagram.com/${associate.instagram_username}/`} target='_blank' rel="noreferrer">
                                        <Icon fontSize="small">open_in_new_rounded</Icon>
                                    </a>
                                )
                            }
                        </div>
                        {getUpdateInstagramUsernameControls()}
                    </div>
                    <MKInput
                        variant="standard"
                        placeholder="usuariocool123"
                        InputLabelProps={{ shrink: true }}
                        onChange={updateInstagramUsernameValue}
                        value={instagramUsername || ''}
                        fullWidth
                    />
                    <MKTypography variant="caption" color="info">
                        {instagramUsername ? instagramUsername.length : 0}/{MAX_INSTAGRAM_USERNAME_LENGTH}
                    </MKTypography>
                </Grid>
            </div>
        )
    }

    const MAX_FACEBOOK_USERNAME_LENGTH = 29;
    const getFacebookField = () => {
        if (!associate) return null;

        const updateFacebookUsernameValue = async (event: ChangeEvent<HTMLInputElement>) => {
            const newFacebookUsername = event.target.value;

            if (newFacebookUsername.length > MAX_FACEBOOK_USERNAME_LENGTH) {
                return;
            }

            if (newFacebookUsername === '' || newFacebookUsername === associate.facebook_username) {
                setFacebookUsername(newFacebookUsername);
                return;
            }

            if (/^[a-zA-Z0-9_.]*$/.test(newFacebookUsername)) {
                setFacebookUsername(newFacebookUsername);
            }
        }

        const getUpdateFacebookUsernameControls = () => {
            if (facebookUsername === associate.facebook_username) {
                return null;
            }

            const updateAssociateFacebookUsername = async () => {
                try {
                    const original = await DataStore.query(Associate, associate.id);
                    if (original) {
                        await DataStore.save(
                            Associate.copyOf(original, updated => {
                                updated.facebook_username = facebookUsername || null;
                            })
                        );
                        if (user?.attributes?.email) {
                            fetchAssociate(user.attributes.email);
                        }
                    }
                } catch (err) {
                    console.error('Error updating facebook_username:', err);
                }
            }

            return (
                <div className="controls-container">
                    <Icon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={updateAssociateFacebookUsername}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={() => setFacebookUsername(associate.facebook_username || undefined)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        return (
            <div style={{ marginTop: '20px', display: 'flex' }}>
                <Grid container item xs={12} py={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <div className="form-label-field-container">
                        <div className="form-label-field-social-media-container">
                            <MKTypography variant="h5" color="secondary">
                                Usuario de Facebook
                            </MKTypography>
                            {
                                associate.facebook_username && (
                                    <a className="social-media-link" href={`https://www.facebook.com/${associate.facebook_username}/`} target='_blank' rel="noreferrer">
                                        <Icon fontSize="small">open_in_new_rounded</Icon>
                                    </a>
                                )
                            }
                        </div>
                        {getUpdateFacebookUsernameControls()}
                    </div>
                    <MKInput
                        variant="standard"
                        placeholder="usuariocool123"
                        InputLabelProps={{ shrink: true }}
                        onChange={updateFacebookUsernameValue}
                        value={facebookUsername || ''}
                        fullWidth
                    />
                    <MKTypography variant="caption" color="info">
                        {facebookUsername ? facebookUsername.length : 0}/{MAX_FACEBOOK_USERNAME_LENGTH}
                    </MKTypography>
                </Grid >
            </div >
        )
    }

    const MAX_LINKEDIN_USERNAME_LENGTH = 29;
    const getLinkedinField = () => {
        if (!associate) return null;

        const updateLinkedinUsernameValue = async (event: ChangeEvent<HTMLInputElement>) => {
            const newLinkedinUsername = event.target.value;

            if (newLinkedinUsername.length > MAX_LINKEDIN_USERNAME_LENGTH) {
                return;
            }

            if (newLinkedinUsername === '' || newLinkedinUsername === associate.linkedin_username) {
                setLinkedinUsername(newLinkedinUsername);
                return;
            }

            if (/^[a-zA-Z0-9_.]*$/.test(newLinkedinUsername)) {
                setLinkedinUsername(newLinkedinUsername);
            }
        }

        const getUpdateLinkedinUsernameControls = () => {
            if (linkedinUsername === associate.linkedin_username) {
                return null;
            }

            const updateAssociateLinkedinUsername = async () => {
                try {
                    const original = await DataStore.query(Associate, associate.id);
                    if (original) {
                        await DataStore.save(
                            Associate.copyOf(original, updated => {
                                updated.linkedin_username = linkedinUsername || null;
                            })
                        );
                        if (user?.attributes?.email) {
                            fetchAssociate(user.attributes.email);
                        }
                    }
                } catch (err) {
                    console.error('Error updating linkedin_username:', err);
                }
            }

            return (
                <div className="controls-container">
                    <Icon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={updateAssociateLinkedinUsername}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={() => setLinkedinUsername(associate.linkedin_username || undefined)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        return (
            <div style={{ marginTop: '20px', display: 'flex' }}>
                <Grid container item xs={12} py={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <div className="form-label-field-container">
                        <div className="form-label-field-social-media-container">
                            <MKTypography variant="h5" color="secondary">
                                Usuario de Linkedin
                            </MKTypography>
                            {
                                associate.linkedin_username && (
                                    <a className="social-media-link" href={`https://www.linkedin.com/in/${associate.linkedin_username}/`} target='_blank' rel="noreferrer">
                                        <Icon fontSize="small">open_in_new_rounded</Icon>
                                    </a>
                                )
                            }
                        </div>
                        {getUpdateLinkedinUsernameControls()}
                    </div>
                    <MKInput
                        variant="standard"
                        placeholder="usuariocool123"
                        InputLabelProps={{ shrink: true }}
                        onChange={updateLinkedinUsernameValue}
                        value={linkedinUsername || ''}
                        fullWidth
                    />
                    <MKTypography variant="caption" color="info">
                        {linkedinUsername ? linkedinUsername.length : 0}/{MAX_LINKEDIN_USERNAME_LENGTH}
                    </MKTypography>
                </Grid>
            </div>
        )
    }

    const getInterestsField = () => {
        if (!associate) return null;

        const updateInterests = async (interest: string) => {
            const currentInterests = Array.isArray(associate.interests) ? associate.interests : [];
            let newInterests: (Interests | null)[];
            if (currentInterests.includes(interest as Interests)) {
                newInterests = currentInterests.filter(i => i !== interest);
            } else {
                newInterests = [...currentInterests, interest as Interests];
            }

            setInterests(newInterests);
            try {
                const original = await DataStore.query(Associate, associate.id);
                if (original) {
                    await DataStore.save(
                        Associate.copyOf(original, updated => {
                            updated.interests = newInterests;
                        })
                    );
                    if (user?.attributes?.email) {
                        fetchAssociate(user.attributes.email);
                    }
                }
            } catch (err) {
                console.error('Error updating interests:', err);
            }
        }

        const getAvailableInterests = () => {
            return (
                <div>
                    {Object.keys(Interests).map((interest, index) => (
                        <Chip
                            key={index}
                            sx={{ margin: '2px' }}
                            label={Translator.instance.translate(getInterestTranslationKey(interest as Interests))}
                            variant={associate.interests && associate.interests.includes(interest as Interests) ? undefined : "outlined"}
                            onClick={() => updateInterests(interest)}
                        />
                    ))}
                </div>
            );
        }

        return (
            <div style={{ marginTop: '20px' }}>
                <MKTypography variant="h5" color="secondary">
                    Intereses
                </MKTypography>
                <MKTypography variant="body2" color="text" mb={1}>
                    Seleccionar tus interes permitirá a otros usuarios encontrar tu perfil más fácilmente.
                </MKTypography>
                {getAvailableInterests()}
            </div>
        )
    }

    const getSocialInformation = () => {
        return (
            <>
                <MKTypography variant="h4" mt={4} mb={2}>
                    {Translator.instance.translate("account_page_social_information_header")}
                </MKTypography>
                <MKTypography variant="body2" color="text" mb={1}>
                    {Translator.instance.translate("account_page_social_information_description")}.
                </MKTypography>
                <div style={{ marginBottom: '30px' }}>
                    <MKTypography variant="h5" mb={1} color="secondary">
                        Configuración de Privacidad
                    </MKTypography>
                    {getPublicAccountToggle()}
                    {getPublicPhoneToggle()}
                    {getPublicEmailToggle()}
                </div>
                <div style={{ marginTop: '5px', marginLeft: '5px' }}>
                    {getProfilePictureField()}
                    {getCustomNameField()}
                    {getUsernameField()}
                    {getBioField()}
                    {getInstagramField()}
                    {getFacebookField()}
                    {getLinkedinField()}
                    {getInterestsField()}
                </div>
            </>
        );
    }

    const getAccountContent = () => {
        if (state === 'loading') {
            return (
                <Spinner />
            )
        }

        if (state === 'error') {
            return (
                <MKTypography ml={1} mt={1} variant="h4">
                    {Translator.instance.translate("login_page_email_not_found")}
                </MKTypography>
            );
        }

        return (
            <div>
                {getAccountHeaderControls()}
                {getRegistryInformation()}
                {getSocialInformation()}
            </div>
        );
    }

    return (
        <>
            <DefaultNavbar
                routes={routes}
                center
                sticky
                brand="asoticocatcat"
            />

            <MKBox component="header" position="relative">
                <MKBox
                    display="flex"
                    alignItems="center"
                    minHeight="100vh"
                    sx={{
                        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }: any) => `${linearGradient(rgba(gradients.dark.main, 0.4), rgba(gradients.dark.state, 0.4))}, url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Container
                        sx={{ marginTop: '150px', marginBottom: '100px' }}
                    >
                        <Card
                            sx={{
                                p: 2,
                                backgroundColor: ({ palette: { white }, functions: { rgba } }: any) => rgba(white.main, 0.8),
                                backdropFilter: "saturate(200%) blur(30px)",
                                boxShadow: ({ boxShadows: { xxl } }: any) => xxl,
                                overflowY: 'auto'
                            }}
                        >
                            <MKBox component="section">
                                <Container>
                                    {getAccountContent()}
                                </Container>
                            </MKBox>
                        </Card>
                    </Container>
                </MKBox>
            </MKBox>
            <Footer />
        </>
    );
}


export default AccountConfigurationPage;
