import React, { useState, useEffect } from "react";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import { getLang } from 'utils/Translator';
import MKBox from "components/MKBox";
import bgImage from "assets/images/associates.jpg";
import { auto } from "@popperjs/core";
import Container from "@mui/material/Container";
import { getTranslateAction } from 'utils/TranslateAction';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';
import Card from "@mui/material/Card";
import { Associate } from 'models';
import { DataStore, Storage } from 'aws-amplify';
import Translator from 'utils/Translator';
import MKTypography from "components/MKTypography";
import { Spinner } from "components/Spinner";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { Benefit } from "models";
import Grid from "@mui/material/Grid";
import MKInput from "components/MKInput";
import Icon from "@mui/material/Icon";
import "./AccountPage.css";

function AccountPage() {
    const [state, setState] = useState("loading");
    const [associate, setAssociate] = useState();
    const [associateOfferedBenefits, setAssociateOfferedBenefits] = useState();
    const [isLoadingBenefits, setIsLoadingBenefits] = useState(false);
    const { route } = useAuthenticator(context => [context.route]);
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();
    const [customName, setCustomName] = useState();
    const [instagramUsername, setInstagramUsername] = useState();
    const [facebookUsername, setFacebookUsername] = useState();
    const [linkedinUsername, setLinkedinUsername] = useState();
    const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);
    const [profilePicture, setProfilePicture] = useState();
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const fetchAssociate = async (email) => {
        try {
            let response = await DataStore.query(Associate, a => a.email("eq", email));
            if (response.length > 0) {
                response = response[0];
                if (response.profile_picture) {
                    const image = await Storage.get(response.profile_picture, { level: 'public' });
                    response = Associate.copyOf(response, updated => {
                        updated.profile_picture = image;
                    });
                }
                setAssociate(response);
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

    const fetchAssociateOfferedBenefits = async (associate) => {
        if (associateOfferedBenefits && associateOfferedBenefits.length > 0) {
            return;
        }

        setIsLoadingBenefits(true);
        try {
            let response = await DataStore.query(Benefit, b => b.associate_id("eq", associate.id));
            if (response.length > 0) {
                setAssociateOfferedBenefits(response);
            }
        } catch (err) {
            console.error('Error:', err);
        }
        setIsLoadingBenefits(false);
    };

    useEffect(() => {
        if (route === 'authenticated') {
            setState('loading');
            fetchAssociate(user.attributes.email);
        }
    }, [route, user]);

    useEffect(() => {
        if (associate) {
            markAccountAsActivated(associate);
            fetchAssociateOfferedBenefits(associate);
            if (!username) {
                setUsername(associate.username);
            }
            if (!bio) {
                setBio(associate.bio);
            }
            if (!customName) {
                setCustomName(associate.custom_name || associate.name);
            }
            if (!instagramUsername) {
                setInstagramUsername(associate.instagram_username);
            }
            if (!facebookUsername) {
                setFacebookUsername(associate.facebook_username);
            }
            if (!linkedinUsername) {
                setLinkedinUsername(associate.linkedin_username);
            }
            if (!profilePicture) {
                setProfilePicture(associate.profile_picture);
            }
        }
        // eslint-disable-next-line
    }, [associate]);

    if (!user || route !== 'authenticated') {
        return <Navigate to={`/${getLang()}/acceso`} />;
    }

    const markAccountAsActivated = async (associate) => {
        if (associate.is_account_activated)
            return;

        try {
            const original = await DataStore.query(Associate, associate.id);
            await DataStore.save(
                Associate.copyOf(original, updated => {
                    updated.is_account_activated = true;
                })
            );
        } catch (err) {
            console.error('Error activating account:', err);
        }
    }


    const getAccountHeaderControls = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', justifyContent: 'flex-end' }}>
                <span style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                <Link style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} to={`/${getLang()}/social/usuario/${associate.username || associate.id}`}>
                    <Icon fontSize="large">account_box_rounded</Icon>
                    <MKTypography variant="caption" color="text">Perfil</MKTypography>
                </Link>
                <Link style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} to={`/${getLang()}/social`}>
                    <Icon fontSize="large">connect_without_contact_rounded</Icon>
                    <MKTypography variant="caption" color="text">Social</MKTypography>
                </Link>
            </div>
        );
    }

    const getBenefitsOffered = () => {
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
            return;
        }

        return (
            <>
                <MKTypography variant="body2" color="text">
                    <b>{Translator.instance.translate("account_page_benefits_offered")}</b>:
                </MKTypography>
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
            </>
        );
    }

    const getRegistryInformation = () => {
        return (
            <>
                <MKTypography variant="body1" color="text">
                    {Translator.instance.translate("account_page_inscription_information_header")}
                </MKTypography>
                <MKTypography variant="body2" color="text" mb={1}>
                    {Translator.instance.translate("account_page_about_updating_information")}
                    {' '}
                    <MKTypography
                        component="a"
                        target="_blank"
                        href="mailto:asoticocat@gmail.com?Subject=Quiero actualizar mi información"
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
        const updateProfileVisiblitySettings = async () => {
            try {
                const original = await DataStore.query(Associate, associate.id);
                await DataStore.save(
                    Associate.copyOf(original, updated => {
                        updated.is_public_profile = !original.is_public_profile;
                    })
                );
                fetchAssociate(user.attributes.email);
            } catch (err) {
                console.error('Error updating public profile:', err);
            }
        }

        return (
            <MKBox display="flex" alignItems="center" mb={2}>
                <Switch checked={associate.is_public_profile} onChange={updateProfileVisiblitySettings} />
                <MKBox ml={2} lineHeight={0.5}>
                    <MKTypography display="block" variant="button" fontWeight="bold">
                        {Translator.instance.translate("account_page_social_public_account_label")}
                    </MKTypography>
                    <MKTypography variant="caption" color="text" fontWeight="regular">
                        {Translator.instance.translate("account_page_social_public_account_description")}.
                    </MKTypography>
                </MKBox>
            </MKBox>
        )
    }

    const getPublicPhoneToggle = () => {
        const updatePhoneVisiblitySettings = async () => {
            try {
                const original = await DataStore.query(Associate, associate.id);
                await DataStore.save(
                    Associate.copyOf(original, updated => {
                        updated.share_phone = !original.share_phone;
                    })
                );
                fetchAssociate(user.attributes.email);
            } catch (err) {
                console.error('Error updating public phone:', err);
            }
        }

        return (
            <MKBox display="flex" alignItems="center" mb={2}>
                <Switch checked={associate.share_phone} onChange={updatePhoneVisiblitySettings} />
                <MKBox ml={2} lineHeight={0.5}>
                    <MKTypography display="block" variant="button" fontWeight="bold">
                        {Translator.instance.translate("account_page_social_public_phone_label")}
                    </MKTypography>
                    <MKTypography variant="caption" color="text" fontWeight="regular">
                        {Translator.instance.translate("account_page_social_public_phone_description")}.
                    </MKTypography>
                </MKBox>
            </MKBox>
        )
    }

    const getPublicEmailToggle = () => {
        const updateEmailVisiblitySettings = async () => {
            try {
                const original = await DataStore.query(Associate, associate.id);
                await DataStore.save(
                    Associate.copyOf(original, updated => {
                        updated.share_email = !original.share_email;
                    })
                );
                fetchAssociate(user.attributes.email);
            } catch (err) {
                console.error('Error updating public email:', err);
            }
        }

        return (
            <MKBox display="flex" alignItems="center" mb={2}>
                <Switch checked={associate.share_email} onChange={updateEmailVisiblitySettings} />
                <MKBox ml={2} lineHeight={0.5}>
                    <MKTypography display="block" variant="button" fontWeight="bold">
                        {Translator.instance.translate("account_page_social_public_email_label")}
                    </MKTypography>
                    <MKTypography variant="caption" color="text" fontWeight="regular">
                        {Translator.instance.translate("account_page_social_public_email_description")}.
                    </MKTypography>
                </MKBox>
            </MKBox>
        )
    }

    const MAX_USERNAME_LENGTH = 32;
    const getUsernameField = () => {
        const updateUsername = async (event) => {
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
                const otherAssociate = await DataStore.query(Associate, a => a.username("eq", newUsername));
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
                    await DataStore.save(
                        Associate.copyOf(original, updated => {
                            updated.username = username;
                        })
                    );
                    fetchAssociate(user.attributes.email);
                } catch (err) {
                    console.error('Error updating username:', err);
                }
            }

            if (username === associate.username || usernameAlreadyExists) {
                return;
            }

            return (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '3px', marginTop: '3px' }}>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={updateAssociateUsername}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={() => setUsername(associate.username)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        return (
            <div style={{ marginTop: '5px' }}>
                <Grid container item xs={12} lg={6} py={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <MKInput
                        variant="standard"
                        label="Nombre de usuario"
                        placeholder="usuariocool123"
                        InputLabelProps={{ shrink: true }}
                        onChange={updateUsername}
                        value={username}
                        fullWidth
                    />
                    <MKTypography variant="caption" color="info">
                        {username ? username.length : 0}/{MAX_USERNAME_LENGTH}
                    </MKTypography>
                    {getUpdateUsernameControls()}
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
        const updateProfilePicture = (event) => {
            const file = event.target.files[0];
            setProfilePicture(file);
        };

        const getUpdateProfilePictureControls = () => {
            if (!profilePicture || profilePicture === associate.profile_picture) {
                return;
            }

            const updateAssociateProfilePicture = async () => {
                setIsUploadingImage(true);
                try {
                    const original = await DataStore.query(Associate, associate.id);
                    /* if (original.profile_picture) {
                        await Storage.remove(original.profile_picture, { level: 'public' });
                    } */

                    const profilePictureKey = `associates/${associate.id}/profile_picture/${profilePicture.name}`;
                    await Storage.put(profilePictureKey, profilePicture, {
                        contentType: profilePicture.type,
                        level: 'public'
                    });

                    await DataStore.save(
                        Associate.copyOf(original, updated => {
                            updated.profile_picture = profilePictureKey;
                        })
                    );
                    fetchAssociate(user.attributes.email);
                    setProfilePicture(null);
                } catch (err) {
                    console.error('Error updating profile picture:', err);
                }
                setIsUploadingImage(false);
            }

            return (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '3px', marginTop: '3px' }}>
                    {isUploadingImage ? <Spinner /> : (
                        <>
                            <Icon
                                sx={{ mr: 1 }}
                                onClick={updateAssociateProfilePicture}
                            >
                                check
                            </Icon>
                            <Icon
                                sx={{ mr: 1 }}
                                onClick={() => setProfilePicture(associate.profile_picture)}
                            >
                                close
                            </Icon>
                        </>
                    )}
                </div >
            )
        };

        const getProfilePicture = () => {
            if (profilePicture instanceof File) {
                return URL.createObjectURL(profilePicture);
            }

            return associate.profile_picture;
        }

        const displayProfilePicture = () => {
            if (!associate.profile_picture && !profilePicture) {
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
                        /* await Storage.remove(original.profile_picture, { level: 'public' }); */
                        await DataStore.save(
                            Associate.copyOf(original, updated => {
                                updated.profile_picture = null;
                            })
                        );
                        fetchAssociate(user.attributes.email);
                        setProfilePicture(null);
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
                <MKTypography variant="body2" color="text">
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
        const updateCustomName = async (event) => {
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
                return;
            }

            const updateAssociateCustomName = async () => {
                try {
                    const original = await DataStore.query(Associate, associate.id);
                    await DataStore.save(
                        Associate.copyOf(original, updated => {
                            updated.custom_name = customName.trim();
                        })
                    );
                    fetchAssociate(user.attributes.email);
                } catch (err) {
                    console.error('Error updating customName:', err);
                }
            }

            return (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '3px', marginTop: '3px' }}>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={updateAssociateCustomName}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={() => setCustomName(associate.custom_name || associate.name)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        return (
            <div style={{ marginTop: '5px' }}>
                <Grid container item xs={12} lg={6} py={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <MKInput
                        variant="standard"
                        label="Nombre a mostrar"
                        placeholder="Pedro Sánchez"
                        InputLabelProps={{ shrink: true }}
                        onChange={updateCustomName}
                        value={customName}
                        fullWidth
                    />
                    <MKTypography variant="caption" color="info">
                        {customName ? customName.length : 0}/{MAX_CUSTOM_NAME_LENGTH}
                    </MKTypography>
                    {getUpdateCustomNameControls()}
                </Grid>
            </div>
        )
    }

    const MAX_BIO_LENGTH = 512;
    const getBioField = () => {
        const updateBio = async (event) => {
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
                return;
            }

            const updateAssociateBio = async () => {
                try {
                    const original = await DataStore.query(Associate, associate.id);
                    await DataStore.save(
                        Associate.copyOf(original, updated => {
                            updated.bio = bio.trim();
                        })
                    );
                    fetchAssociate(user.attributes.email);
                } catch (err) {
                    console.error('Error updating bio:', err);
                }
            }

            return (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '3px', marginTop: '3px' }}>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={updateAssociateBio}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={() => setBio(associate.bio)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        return (
            <div style={{ marginTop: '15px' }}>
                <Grid container item xs={12} lg={6} py={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <MKInput
                        variant="standard"
                        label="Biografía"
                        placeholder="Escribe algo sobre ti"
                        InputLabelProps={{ shrink: true }}
                        multiline
                        rows={4}
                        value={bio}
                        onChange={updateBio}
                        fullWidth
                    />
                    <MKTypography variant="caption" color="info">
                        {bio ? bio.length : 0}/{MAX_BIO_LENGTH}
                    </MKTypography>
                    {getUpdateBioControls()}
                </Grid>
            </div>
        )
    }

    const MAX_INSTAGRAM_USERNAME_LENGTH = 29;
    const getInstagramField = () => {
        const updateInstagramUsername = async (event) => {
            const instagramUsername = event.target.value;

            if (instagramUsername.length > MAX_INSTAGRAM_USERNAME_LENGTH) {
                return;
            }

            if (instagramUsername === '' || instagramUsername === associate.instagram_username) {
                setInstagramUsername(instagramUsername);
                return;
            }

            if (/^[a-zA-Z0-9_.]*$/.test(instagramUsername)) {
                setInstagramUsername(instagramUsername);
            }
        }

        const getUpdateInstagramUsernameControls = () => {
            if (instagramUsername === associate.instagram_username) {
                return;
            }

            const updateAssociateInstagramUsername = async () => {
                try {
                    const original = await DataStore.query(Associate, associate.id);
                    await DataStore.save(
                        Associate.copyOf(original, updated => {
                            updated.instagram_username = instagramUsername;
                        })
                    );
                    fetchAssociate(user.attributes.email);
                } catch (err) {
                    console.error('Error updating instagram_username:', err);
                }
            }

            return (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '3px', marginTop: '3px' }}>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={updateAssociateInstagramUsername}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={() => setInstagramUsername(associate.instagram_username)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        return (
            <div style={{ marginTop: '20px', display: 'flex' }}>
                <Grid container item xs={12} lg={6} py={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <MKInput
                        variant="standard"
                        label="Usuario de Instagram"
                        placeholder="usuariocool123"
                        InputLabelProps={{ shrink: true }}
                        onChange={updateInstagramUsername}
                        value={instagramUsername}
                        fullWidth
                    />
                    <MKTypography variant="caption" color="info">
                        {instagramUsername ? instagramUsername.length : 0}/{MAX_INSTAGRAM_USERNAME_LENGTH}
                    </MKTypography>
                    {getUpdateInstagramUsernameControls()}
                </Grid>
                {
                    associate.instagram_username && (
                        <a href={`https://www.instagram.com/${associate.instagram_username}/`} target='_blank' rel="noreferrer">
                            <Icon fontSize="small">open_in_new_rounded</Icon>
                        </a>
                    )
                }
            </div>
        )
    }

    const MAX_FACEBOOK_USERNAME_LENGTH = 29;
    const getFacebookField = () => {
        const updateFacebookUsername = async (event) => {
            const facebookUsername = event.target.value;

            if (facebookUsername.length > MAX_FACEBOOK_USERNAME_LENGTH) {
                return;
            }

            if (facebookUsername === '' || facebookUsername === associate.facebook_username) {
                setFacebookUsername(facebookUsername);
                return;
            }

            if (/^[a-zA-Z0-9_.]*$/.test(facebookUsername)) {
                setFacebookUsername(facebookUsername);
            }
        }

        const getUpdateFacebookUsernameControls = () => {
            if (facebookUsername === associate.facebook_username) {
                return;
            }

            const updateAssociateFacebookUsername = async () => {
                try {
                    const original = await DataStore.query(Associate, associate.id);
                    await DataStore.save(
                        Associate.copyOf(original, updated => {
                            updated.facebook_username = facebookUsername;
                        })
                    );
                    fetchAssociate(user.attributes.email);
                } catch (err) {
                    console.error('Error updating facebook_username:', err);
                }
            }

            return (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '3px', marginTop: '3px' }}>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={updateAssociateFacebookUsername}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={() => setFacebookUsername(associate.facebook_username)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        return (
            <div style={{ marginTop: '20px', display: 'flex' }}>
                <Grid container item xs={12} lg={6} py={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <MKInput
                        variant="standard"
                        label="Usuario de Facebook"
                        placeholder="usuariocool123"
                        InputLabelProps={{ shrink: true }}
                        onChange={updateFacebookUsername}
                        value={facebookUsername}
                        fullWidth
                    />
                    <MKTypography variant="caption" color="info">
                        {facebookUsername ? facebookUsername.length : 0}/{MAX_FACEBOOK_USERNAME_LENGTH}
                    </MKTypography>
                    {getUpdateFacebookUsernameControls()}
                </Grid>
                {
                    associate.facebook_username && (
                        <a href={`https://www.facebook.com/${associate.facebook_username}/`} target='_blank' rel="noreferrer">
                            <Icon fontSize="small">open_in_new_rounded</Icon>
                        </a>
                    )
                }
            </div>
        )
    }

    const MAX_LINKEDIN_USERNAME_LENGTH = 29;
    const getLinkedinField = () => {
        const updateLinkedinUsername = async (event) => {
            const linkedinUsername = event.target.value;

            if (linkedinUsername.length > MAX_LINKEDIN_USERNAME_LENGTH) {
                return;
            }

            if (linkedinUsername === '' || linkedinUsername === associate.linkedin_username) {
                setLinkedinUsername(linkedinUsername);
                return;
            }

            if (/^[a-zA-Z0-9_.]*$/.test(linkedinUsername)) {
                setLinkedinUsername(linkedinUsername);
            }
        }

        const getUpdateLinkedinUsernameControls = () => {
            if (linkedinUsername === associate.linkedin_username) {
                return;
            }

            const updateAssociateLinkedinUsername = async () => {
                try {
                    const original = await DataStore.query(Associate, associate.id);
                    await DataStore.save(
                        Associate.copyOf(original, updated => {
                            updated.linkedin_username = linkedinUsername;
                        })
                    );
                    fetchAssociate(user.attributes.email);
                } catch (err) {
                    console.error('Error updating linkedin_username:', err);
                }
            }

            return (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '3px', marginTop: '3px' }}>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={updateAssociateLinkedinUsername}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={() => setLinkedinUsername(associate.linkedin_username)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        return (
            <div style={{ marginTop: '20px', display: 'flex' }}>
                <Grid container item xs={12} lg={6} py={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <MKInput
                        variant="standard"
                        label="Usuario de Linkedin"
                        placeholder="usuariocool123"
                        InputLabelProps={{ shrink: true }}
                        onChange={updateLinkedinUsername}
                        value={linkedinUsername}
                        fullWidth
                    />
                    <MKTypography variant="caption" color="info">
                        {linkedinUsername ? linkedinUsername.length : 0}/{MAX_LINKEDIN_USERNAME_LENGTH}
                    </MKTypography>
                    {getUpdateLinkedinUsernameControls()}
                </Grid>
                {
                    associate.linkedin_username && (
                        <a href={`https://www.linkedin.com/in/${associate.linkedin_username}/`} target='_blank' rel="noreferrer">
                            <Icon fontSize="small">open_in_new_rounded</Icon>
                        </a>
                    )
                }
            </div>
        )
    }

    const getSocialInformation = () => {
        return (
            <>
                <MKTypography mt={5} variant="body1" color="text">
                    {Translator.instance.translate("account_page_social_information_header")}
                </MKTypography>
                <MKTypography variant="body2" color="text" mb={1}>
                    {Translator.instance.translate("account_page_social_information_description")}.
                </MKTypography>
                {getPublicAccountToggle()}
                {getPublicPhoneToggle()}
                {getPublicEmailToggle()}
                <div style={{ marginTop: '5px', marginLeft: '5px' }}>
                    {getProfilePictureField()}
                    {getCustomNameField()}
                    {getUsernameField()}
                    {getBioField()}
                    {getInstagramField()}
                    {getFacebookField()}
                    {getLinkedinField()}
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
                routes={[]}
                center
                sticky
                brand="asoticocatcat"
                action={getTranslateAction()}
                secondaryAction={{
                    route: `/${getLang()}`,
                    color: "info",
                    icon: "arrow_circle_left_rounded",
                    variant: "text",
                    size: "large",
                    minimal: true
                }}
            />

            <MKBox component="header" position="relative">
                <MKBox
                    display="flex"
                    alignItems="center"
                    minHeight="100vh"
                    sx={{
                        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.dark.main, 0.4), rgba(gradients.dark.state, 0.4))}, url(${bgImage})`,
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
                                backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
                                backdropFilter: "saturate(200%) blur(30px)",
                                boxShadow: ({ boxShadows: { xxl } }) => xxl,
                                overflowY: auto
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
        </>
    );
}


export default AccountPage;
