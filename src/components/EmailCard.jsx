// src/components/EmailCard.jsx

import React from 'react';
import Avatar from 'react-avatar';

const EmailCard = ({
  email,
  handleEmailClick,
  toggleFavorite,
  favoriteEmails,
  formatDate,
  readEmails,
  selectedEmail,
}) => {
  // Check if the email is read and if it's currently selected
  const isRead = readEmails.has(email.id);
  const isSelected = selectedEmail && selectedEmail.id === email.id;

  return (
    <article
      key={email.id}
      className={` rounded-lg p-4 border-2 cursor-pointer hover:shadow-lg transition-shadow duration-200 ${selectedEmail ? 'w-25' : 'w-full'} ${
        isSelected ? 'border-accent' : ''
      } ${isRead ? 'bg-read-background' : 'bg-white'}`}
      onClick={() => handleEmailClick(email)}
    >
      <header className="flex items-start justify-start gap-4">
        <div className="">
        <Avatar color='#E54065' name={email.from.name.slice(0,1)} size="50" round={true}/>
        </div>
        <div className="flex flex-col gap-2">
          <h1>
            <span className="text-gray-500">From:</span>
            <span className="font-semibold">
              {email.from.name} &lt;{email.from.email}&gt;
            </span>
          </h1>
          <h1>
            <span className="text-gray-500">Subject:</span>
            <span className="font-semibold">{email.subject}</span>
          </h1>
          <h1>
            <span className="text-gray-500">{email.short_description}</span>
          </h1>
          <p>
            <span className="text-gray-500">{formatDate(email.date)}</span>
          </p>
        </div>
      </header>
    </article>
  );
};

export default EmailCard;
