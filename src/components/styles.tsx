export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '90%',
        sm: '90%',
        md: '70%',
        lg: '50%',
        xl: '50%',
    },
    height: {
        xs: '90%',
        sm: '90%',
        md: '90%',
        lg: '90%',
        xl: '90%',
    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'black',
    overflowY: 'scroll'
};

export const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
    '& .MuiTextField-root': { 
        width: '90%', 
        margin: '10px' 
    },    
    '& .MuiButton-root': { 
        width: '90%', 
        margin: '10px'  
    },
};