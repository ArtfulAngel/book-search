import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import Paper from 'material-ui/Paper';
import Downshift from 'downshift';

import InputContainer from './inputContainer';
import SuggestedVariants from './suggestedVariants';

const suggestions = [
  { title: 'React' },
  { title: 'class' },
  { title: 'variable' },
  { title: 'theme' },
  { title: 'тема' },
  { title: 'книги' },
];
const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80vw',
    padding: '8px',
  },
  container: {
    display: 'flex',
    position: 'relative',
    width: '60%',
    height: '50vh',
    justifyContent: 'center',
    alignItems: 'center',
    'margin-top': '15rem',
  },

  input: {
    width: '100%',
    height: '15px',
    border: '1px solid #e9e9e9',
  },
  buttonDiv: {
    alignItems: 'right',
    'margin-left': '0.5rem',
    'margin-top': '-0.2rem',
  },
};

class MainSearch extends Component {
  constructor(props) {
    super(props);
  }
  linckSearch = props => <Link to="/search-result" {...props} />;

  getSuggestions = inputValue => {
    let count = 0;
    debugger;
    return suggestions.filter(suggestion => {
      const keep =
        (!inputValue ||
          suggestion.title.toLowerCase().includes(inputValue.toLowerCase())) &&
        count < 5;

      if (keep) {
        count += 1;
      }

      return keep;
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Downshift
          render={({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex,
          }) => (
            <div className={classes.container}>
              {InputContainer({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  placeholder: 'Поиск...',
                  id: 'downshift',
                }),
              })}
              {isOpen ? (
                <Paper square>
                  {this.getSuggestions(inputValue).map((suggestion, index) =>
                    SuggestedVariants({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.title }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  )}
                </Paper>
              ) : null}
              <div className={classes.buttonDiv}>
                <Button
                  variant="raised"
                  color="primary"
                  component={this.linckSearch}
                >
                  Найти
                </Button>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

MainSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainSearch);
