import React, { Component } from 'react';
import ReactStars from 'react-stars';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ReplyIcon from 'material-ui-icons/Reply';

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
        width: '40vw',
        marginTop: '2rem',
        marginBottom: '2rem',
    },
    title: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
    },
    holder: {
        position: 'relative',
        margin: '0.5rem',
    },
    bigAvatar: {
        display: 'flex',
        position: 'relative',
        width: '200px',
        height: '200px',
        objectFit: 'contain',
        borderRadius: 'inherit',
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'flex-start',
    },
    textInfo: {
        position: 'relative',
        justifyContent: 'flex-start',
        width: '90%',
    },
    star: {
        display: 'flex',
        position: 'relative',
        paddingLeft: '0.rem',
    },
    button: {
        display: 'flex',
        position: 'relative',
        margin: '0.2rem',
        width: '40px',
        height: '40px',
    },
    authors: {
        paddingBottom: '0.2rem',
        position: 'relative',
        justifyContent: 'flex-start',
    },
    categories: {
        paddingBottom: '0.2rem',
        position: 'relative',
        justifyContent: 'flex-start',
    },
};

class DetailedView extends Component {
    state = { infoBook: null };

    componentDidMount() {
        this.requestListBookById();
    }

    requestListBookById = () => {
        const { match } = this.props;
        return fetch(`https://www.googleapis.com/books/v1/volumes/${match.params.id}`)
            .then(r => r.json())
            .then(res => {
                this.setState({
                    infoBook: res,
                });
            });
    };

    render() {
        const { classes } = this.props;
        const { infoBook } = this.state;
        return infoBook ? (
            <div className={classes.root}>
                <Paper className={classes.container}>
                    <div className={classes.title}>
                        <IconButton
                            className={classes.button}
                            component={Link}
                            to="/search-result/"
                        >
                            <ReplyIcon className={classes.button} />
                        </IconButton>
                        <h3>{infoBook.volumeInfo.title}</h3>
                    </div>
                    <div className={classes.info}>
                        <img
                            key={infoBook.id}
                            src={infoBook.volumeInfo.imageLinks.large}
                            className={classes.bigAvatar}
                        />
                        <div className={classes.textInfo}>
                            <div className={classes.star}>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value={
                                        infoBook.volumeInfo.averageRating
                                            ? infoBook.volumeInfo.averageRating
                                            : 0
                                    }
                                    color2={'#ffd700'}
                                />
                            </div>
                            <div className={classes.authors}>
                                <b>Авторы: </b>
                                {infoBook.volumeInfo.authors.map(author => <div>{author}</div>)}
                            </div>
                            {infoBook.volumeInfo.categories ? (
                                <div className={classes.categories}>
                                    <b>Категория: </b>
                                    {infoBook.volumeInfo.categories.map(cat => <div>{cat}</div>)}
                                </div>
                            ) : null}
                            <div className={classes.categories}>
                                <b>Дата публикации: </b>
                                {infoBook.volumeInfo.publishedDate}
                            </div>
                        </div>
                    </div>

                    <div className={classes.holder}>
                        <b>Описание: </b>
                        <div
                            dangerouslySetInnerHTML={{ __html: infoBook.volumeInfo.description }}
                        />
                    </div>
                </Paper>
            </div>
        ) : (
            <div className={classes.title}>
                <h1>Отсутсвуют данные для отображения</h1>
            </div>
        );
    }
}

export default withStyles(styles)(DetailedView);
