import React, { useState} from 'react';
import "./InboxContent.css";
import MailContent from './MailContent';

const DrafContent = ({ emails }) => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [editMode, setEditMode] = useState(false);

    
  const handleEmailClick = (index) => {
    setSelectedEmail(index);
  };



  const renderEmailSummary = (email, index) => (
    <div key={index} onClick={() => handleEmailClick(index)} className="email-summary">
      <p>{new Date(email.date).toLocaleDateString()} {new Date(email.date).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</p>
      <p>Do: {email.recipient}</p>
      <p>Temat: {email.subject}</p>
    </div>
  );

    const handleEdit = () =>(
        setEditMode(true)
    );


  return (
    <div className="content-container">
        {editMode === true ? (
          <MailContent
            id={emails[selectedEmail].id}
            email={emails[selectedEmail].sender}
            defaultRecipient={emails[selectedEmail].recipient}
            defaultSubject={emails[selectedEmail].subject}
            defaultContent={emails[selectedEmail].content}
          />
        ) : ( 
        <div className='content-container'> 
        <div className="email-list">
            {emails.map((email, index) => renderEmailSummary(email, index))}
        </div>
        <div className="email-details">
             {selectedEmail !== null ? ( 
            <div className="email-details-content">
                <h2>Wiadomość</h2>
                <div className='email-details-content-field'>{new Date(emails[selectedEmail].date).toLocaleDateString()} {new Date(emails[selectedEmail].date).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</div>
                <div className='email-details-content-field'>Do: {emails[selectedEmail].recipient}</div>
                <div className='email-details-content-field'>Temat: {emails[selectedEmail].subject}</div>
                <div className='email-details-content-field'>Treść:<br/> {emails[selectedEmail].content}</div>
                <div className='form-buttons'>
                    <button type="button" onClick={handleEdit}>Edytuj</button>
                </div>
            </div>
            ) : (
             <div className="no-email-selected">
                 Wybierz wiadomość, aby wyświetlić zawartość
             </div>
             )} 
        </div>
        </div>)} 
    </div>
  );
};

export default DrafContent;