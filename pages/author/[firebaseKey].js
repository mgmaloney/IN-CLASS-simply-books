import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState();
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={authorDetails.image} alt={authorDetails.first_name + authorDetails.last_name} />
      </div>
      <div className="text-white ms-5 details">
        <h5>{authorDetails.first_name + authorDetails.last_name}</h5>
        <h5>{authorDetails.email}</h5>
        <div className="favorite-div">
          <button type="button">Favorite {authorDetails.favorite ? '&#9733;' : '&#9734;'}</button>
        </div>
      </div>
    </div>
  );
}
h;
