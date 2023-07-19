import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleAuthor } from '../api/authorData';
import { useAuth } from '../utils/context/authContext';
import { deleteBook } from '../api/bookData';
import { viewAuthorDetails } from '../api/mergedData';

function AuthorCard({ authorObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const [authorDetails, setAuthorDetails] = useState();
  const { user } = useAuth();
  const { firebaseKey } = authorObj;

  useEffect(() => {
    viewAuthorDetails(firebaseKey, user).then(setAuthorDetails);
  }, [firebaseKey]);

  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.first_name + authorObj.last_name}?`)) {
      authorDetails.books.forEach((book) => deleteBook(book.firebaseKey));
      deleteSingleAuthor(authorDetails.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={authorObj.image} alt={authorObj.first_name + authorObj.last_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>
          {authorObj.first_name} {authorObj.last_name}
        </Card.Title>
        {/* DYNAMIC LINK TO VIEW THE author DETAILS  */}
        <Link href={`/author/${authorObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE author DETAILS  */}
        <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAuthor} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AuthorCard;
