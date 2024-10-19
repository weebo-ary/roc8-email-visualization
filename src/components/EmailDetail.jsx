// src/components/EmailDetail.jsx

import React from 'react';
import Avatar from 'react-avatar';

const EmailDetail = ({
  selectedEmail,
  selectedEmailDetails,
  formatDate,
  toggleFavorite,
  favoriteEmails,
}) => {
  if (!selectedEmail) {
    return <p>Select an email to see details</p>;
  }

  const isFavorite = favoriteEmails.has(selectedEmail.id);

  return (
    <article>
      <header className="flex items-start justify-start gap-4 mb-6">
        <div className="">
        <Avatar color='#E54065' name={selectedEmail.from.name.slice(0,1)} size="50" round={true}/>
        </div>
        <div className="flex flex-col gap-5">
          <h1>
            <span className="text-gray-500">Subject:</span>
            <span className="font-semibold">{selectedEmail.subject}</span>
          </h1>
          <p>
            <span className="text-gray-500">{formatDate(selectedEmail.date)}</span>
          </p>
        </div>
        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(selectedEmail)}
          className="ml-auto text-2xl cursor-pointer"
        >
          {isFavorite ? <>
            <button className='text-sm bg-accent rounded-full p-2 px-4 text-white'>Marked as Favorite</button>
          </> : <>
          <button className='text-sm bg-accent border-none p-2 px-4 rounded-full text-white'>Mark as Favorite</button>
          </>}
        </button>
      </header>

      {selectedEmailDetails ? (
        <p className="text-sm mb-4 ml-14">{selectedEmailDetails.body}</p>
      ) : (
        <p>Loading email details...</p>
      )}
    </article>
  );
};

export default EmailDetail;
