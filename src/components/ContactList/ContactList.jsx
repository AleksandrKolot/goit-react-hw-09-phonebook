import { useSelector, useDispatch } from 'react-redux';
import operations from '../../redux/operations';
import selectors from '../../redux/selectors';
// import s from'./ContactList.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  container: {
    margin: '0 auto',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    borderRadius: '4px',
    width: 500,
  },
  headRow: {
    backgroundColor: '#3f51b5',
  },
  body: {
    '& tr:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
  },
  bodyRow: {},
  headCell: {
    padding: 10,
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cell: {
    padding: 10,
  },
});

const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectors.getContactList);

  useEffect(() => {
    if (contacts.length) return;
    dispatch(operations.fetchContacts());
    //eslint-disable-next-line
  }, []);

  const classes = useStyles();

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow className={classes.headRow}>
            <TableCell className={classes.headCell}>Name</TableCell>
            <TableCell className={classes.headCell}>Number</TableCell>
            <TableCell className={classes.headCell}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.body}>
          {contacts &&
            contacts.map(({ name, number, id }) => (
              <TableRow className={classes.bodyRow} key={id}>
                <TableCell className={classes.cell} component="td" scope="row">
                  {name}
                </TableCell>
                <TableCell className={classes.cell}>{number}</TableCell>
                <TableCell className={classes.cell}>
                  <IconButton
                    onClick={() => dispatch(operations.deleteContact(id))}
                    aria-label="delete"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};
export default ContactList;
