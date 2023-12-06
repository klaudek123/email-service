import React, { useState } from 'react';
import "./InboxContent.css";

const InboxContent = ({ emails }) => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (index) => {
    setSelectedEmail(index);
  };

  const renderEmailSummary = (email, index) => {
    return (
      <div key={index} onClick={() => handleEmailClick(index)} className="email-summary">
        <p>{new Date(email.date).toLocaleDateString()} {new Date(email.date).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</p>
        <p>Od: {email.sender}</p>
        <p>Temat: {email.subject}</p>
      </div>
    );
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/api/mails/${emails[selectedEmail].id}/trashed`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            window.alert("Udało się usunąć maila!");
            window.location.href = '../generalPage';
        })

  }

  

  return (
    <div className="content-container">
      <div className="email-list">
        {emails.map((email, index) => renderEmailSummary(email, index))}
      </div>
      <div className="email-details">
        {selectedEmail !== null ? (
          <div className="email-details-content">
            <h2>Wiadomość</h2>
            <div className='email-details-content-field'>{new Date(emails[selectedEmail].date).toLocaleDateString()} {new Date(emails[selectedEmail].date).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</div>
            <div className='email-details-content-field'>Od: {emails[selectedEmail].sender}</div>
            <div className='email-details-content-field'>Temat: {emails[selectedEmail].subject}</div>
            <div className='email-details-content-field'>Treść:<br /> {emails[selectedEmail].content}</div>
            <div className='form-buttons'>
              <button type="button" onClick={handleDelete}>Usuń</button>
            </div>
          </div>
        ) : (
          <div className="no-email-selected">
            Wybierz wiadomość, aby wyświetlić zawartość
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxContent;
