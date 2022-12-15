export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '90%',
        sm: '7z0%',
        md: '50%',
        lg: '50%',
        xl: '50%',
    },
    height: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    pb: 1,
    color: 'black',
    overflowY: 'scroll'
};

export const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
    '& .MuiTextField-root': { 
        width: '100%', 
        margin: '10px 0 0 10px' 
    },    
    '& .MuiInput-root': { 
        width: '100%', 
        margin: '40px 0 20px 10px' 
    },    
    '& .MuiButton-root': { 
        width: '100%', 
        margin: '20px 10px 0 10px'  
    },
};