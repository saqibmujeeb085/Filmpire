import { makeStyles } from '@mui/styles';

export default makeStyles((theme) =>({
    movieContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'cenetr',
        } 
    }
}))