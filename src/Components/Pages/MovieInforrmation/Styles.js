import { makeStyles } from '@mui/styles';

export default makeStyles((theme) =>({
ContainerSpaceArround: {
maxWidth: '100vw',
display: 'flex',
justifyContent: 'space-around',
margin: '10px 0 !important',
[theme.breakpoints.down('sm')] : {
    flexDirection: 'column',
    flexWrap: 'wrap',
},
},
poster: {
    borderRadius: '20px',
    boxShadow: '0.5em 1em 1em rgb(64,64,70)',
    width: '80%',
    marginBottom: '30px',
    margin: '0 auto',
    display: 'flex',
    [theme.breakpoints.down('md')] : {
        width: '50%',
    },
},
genresContainer: {
    margin: '10px 0px !important',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
},
genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    marginRight: '10px',
},
links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
        padding: '0.5rem 1rem',
    }
},
castImage: {
    width: '100%',
    maxWidth: '7em',
    height: '8.5em',
    ObjectFit: 'cover',
    borderRadius: '10px',
},
buttonContainer: {
     display: 'flex',
     justifyContent: 'space-between',
     width: '100%',
     [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    }
},
modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
},
videos : {
    width: '50%',
    height: '50%',
    [theme.breakpoints.down('sm')]: {
        width: '90%',
        height: '90%',
    }
}


}))