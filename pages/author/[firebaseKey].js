import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import BookCard from '../../components/BookCard';
import { getAuthorBooks } from '../../api/authorData';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  const { user } = useAuth();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewAuthorDetails(firebaseKey, user).then(setAuthorDetails);
  }, [firebaseKey]);

  console.warn(authorDetails);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={authorDetails.image} alt={authorDetails.first_name + authorDetails.last_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>{authorDetails.first_name + authorDetails.last_name}</h5>
        <h5>{authorDetails.email}</h5>
        <div className="favorite-div">
          <button type="button">Favorite {authorDetails.favorite ? '&#9733;' : '&#9734;'}</button>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {authorDetails.books?.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAuthorBooks} />
        ))}
      </div>
    </div>
  );
}
