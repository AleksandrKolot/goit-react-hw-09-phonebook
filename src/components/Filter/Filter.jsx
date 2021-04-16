import { useDispatch } from 'react-redux';
import actions from '../../redux/actions';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  filter: {
    marginBottom: 15,
  },
});

const Filter = () => {
  const dispatch = useDispatch();

  const onFilter = event => dispatch(actions.filterContact(event.target.value));

  const classes = useStyles();

  return (
    <TextField
      className={classes.filter}
      autoComplete="off"
      type="text"
      name="filter"
      onChange={onFilter}
      size="small"
      label="Find contact by Name"
      variant="outlined"
    />
  );
};

export default Filter;
