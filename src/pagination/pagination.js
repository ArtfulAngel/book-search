import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from 'material-ui/Button';
import NavigateBeforeIcon from 'material-ui-icons/NavigateBefore';
import NavigateNextIcon from 'material-ui-icons/NavigateNext';
import FirstPageIcon from 'material-ui-icons/FirstPage';
import LastPageIcon from 'material-ui-icons/LastPage';

import './styles.css';
export default class Pagination extends Component {
  static defaultProps = {
    maxCountItems: 5,
  };

  static propTypes = {
    /**
     * Колличество отображаемых цифр в пагинации
     */
    maxCountItems: PropTypes.number,
    /**
     * Информации о пагинаци
     */
    pagination: PropTypes.shape({
      // максимальное количество страниц
      totalPages: PropTypes.number,
      // текущий номер страницы
      page: PropTypes.number,
    }),
  };

  state = {
    buttons: [],
  };

  componentDidMount() {
    this.setState({
      buttons: this.generateButtons(),
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.pagination !== this.props.pagination ||
      nextState.buttons !== this.state.buttons
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pagination !== this.props.pagination) {
      this.setState({
        buttons: this.generateButtons(),
      });
    }
  }

  baseSideButtons = side => {
    const { onClick, pagination } = this.props;
    const sideIsLeft = side === 'left';

    const idNextElement = sideIsLeft
      ? pagination.page - 1
      : pagination.page + 1;

    const idSideElement = sideIsLeft ? 1 : pagination.totalPages;

    const buttonsLeft = [
      <Button
        variant="fab"
        key="nextElement"
        id={idNextElement}
        className="pagination-button"
        onClick={onClick}
      >
        <NavigateBeforeIcon />
      </Button>,
      <Button
        variant="fab"
        key="sideElement"
        id={idSideElement}
        className="pagination-button"
        onClick={onClick}
      >
        <FirstPageIcon />
      </Button>,
    ];
    const buttonsRight = [
      <Button
        variant="fab"
        key="nextElement"
        id={idNextElement}
        className="pagination-button"
        onClick={onClick}
      >
        <NavigateNextIcon />
      </Button>,
      <Button
        variant="fab"
        key="sideElement"
        id={idSideElement}
        className="pagination-button"
        onClick={onClick}
      >
        <LastPageIcon />
      </Button>,
    ];

    return sideIsLeft ? buttonsLeft : buttonsRight;
  };

  generateButtons = () => {
    const { maxCountItems, pagination, onClick } = this.props;
    const { page, totalPages } = pagination;
    const buttons = [];
    let initIndex = page < maxCountItems ? 1 : page - 2;
    let beyondIndex =
      totalPages < maxCountItems ? totalPages : maxCountItems + initIndex - 1;
    if (beyondIndex > totalPages) {
      beyondIndex = totalPages;
      initIndex = totalPages - maxCountItems + 1;
    }

    for (let index = initIndex; index <= beyondIndex; index++) {
      const classes = classnames('pagination-button', {
        'pagination-button-active': index === page,
      });

      buttons.push(
        <Button
          variant="fab"
          key={index}
          id={index}
          onClick={onClick}
          className={classes}
        >
          {index}
        </Button>,
      );
    }

    if (page > 1) {
      buttons.unshift(this.baseSideButtons('left'));
    }

    if (page < totalPages) {
      buttons.push(this.baseSideButtons('right'));
    }

    return buttons;
  };

  render() {
    if (this.props.pagination.totalPages <= 1) return null;

    return <div className="pagination">{this.state.buttons}</div>;
  }
}
