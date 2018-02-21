import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import classNames from 'classnames';
import Pagination from '../../pagination/pagination';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80vw',
    padding: '0 8px',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60vw',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  row: {
    display: 'block',
    position: 'relative',
    margin: '1rem',
    height: '150px',
  },
  holder: {
    display: 'block',
    position: 'relative',
    margin: '0.3rem',
    paddingLeft: '12%',
  },
  avatar: {
    display: 'block',
    margin: 10,
    backgroundSize: 'contain',
  },
  bigAvatar: {
    display: 'block',
    position: 'absolute',
    margin: 10,
    width: '80px',
    height: '100px',
    backgroundSize: 'contain',
    borderRadius: 'inherit',
  },
  buttonDiv: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'flex-end',
    justifyItems: 'center',
  },
};

class SearchResult extends Component {
  constructor() {
    super();
    this.state = {
      itemsBook: [],
      page: 1,
      countCurItems: 10,
      startIndex: 0,
      totalItems: null,
      totalPages: 1,
    };
    this.requestListBookByPages = this.requestListBookByPages.bind(this);
    this.handlerChangePagination = this.handlerChangePagination.bind(this);
  }

  componentDidMount() {
    this.requestListBookByPages(null);
  }

  requestListBookByPages(curPage) {
    const { inputValue } = this.props;
    const { page, countCurItems, startIndex } = this.state;
    let nextStartIndex;
    if (curPage) {
      if (page !== curPage) {
        if (page < curPage) {
          nextStartIndex = startIndex + countCurItems * (curPage - page);
        } else if (page > curPage) {
          nextStartIndex = startIndex - countCurItems * (page - curPage);
        }

        this.setState({
          page: curPage,
          startIndex: nextStartIndex,
        });
      }
    } else nextStartIndex = startIndex;
    return fetch(`https://www.googleapis.com/books/v1/volumes?q='react'&maxResults=${countCurItems}&startIndex=${nextStartIndex}&fields=items(id,selfLink,volumeInfo(description,imageLinks(smallThumbnail,thumbnail),title,averageRating)),kind,totalItems&key=AIzaSyDfCdIXRrk_NhrqOcuF8fGFfyU9mqEwy1Y
        `)
      .then(r => r.json())
      .then(res => {
        this.setState({
          itemsBook: res.items,
          totalItems: res.totalItems,
          totalPages: Math.floor(res.totalItems / countCurItems),
        });
      });
  }
  handlerChangePagination(event) {
    this.requestListBookByPages(event.currentTarget.id);
  }

  render() {
    const { classes } = this.props;
    const metadata = {
      page: this.state.page,
      totalPages: this.state.totalPages,
    };
    return (
      <div className={classes.root}>
        <Paper className={classes.container}>
          {this.state.itemsBook.map(book => (
            <Paper square key={book.id} className={classes.row}>
              {book.volumeInfo.imageLinks &&
              book.volumeInfo.imageLinks.smallThumbnail ? (
                <Avatar
                  key={book.id}
                  src={book.volumeInfo.imageLinks.smallThumbnail}
                  className={classNames(classes.avatar, classes.bigAvatar)}
                />
              ) : null}

              <div className={classes.holder}>
                <h3>{book.volumeInfo.title}</h3>
                {book.volumeInfo.description ? (
                  <div key={book.id}>{`${book.volumeInfo.description.slice(
                    0,
                    200,
                  )} ...`}</div>
                ) : null}
              </div>
              <div className={classes.buttonDiv}>
                <ReactStars
                  count={5}
                  size={24}
                  value={
                    book.volumeInfo.averageRating
                      ? book.volumeInfo.averageRating
                      : 0
                  }
                  color2={'#ffd700'}
                />
                <Button
                  color="primary"
                  component={Link}
                  to={`/detail-view/${book.id}`}
                >
                  Подробнее
                </Button>
              </div>
            </Paper>
          ))}
          <Pagination
            pagination={metadata}
            onClick={this.handlerChangePagination}
          />
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(SearchResult);
