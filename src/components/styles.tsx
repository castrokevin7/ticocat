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
    '& *': { 
        width: '100%', 
    },
    '& .MuiTextField-root': { 
        margin: '5px 0 5px 0' 
    },    
    '& .MuiInput-root': { 
        margin: '5px 0 20px 0' 
    },    
    '& .MuiButton-root': { 
        margin: '20px 0 5px 0'  
    },
};