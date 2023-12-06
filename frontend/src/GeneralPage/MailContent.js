import React from 'react';
import { useState } from 'react';
import './MailContent.css'

const MailContent = ({id = 0, email, defaultRecipient = '', defaultSubject = '', defaultContent = '' }) => {
    const [formData, setFormData] = useState({
      id: Number(id),
      sender: email,
      recipient: defaultRecipient,
      subject: defaultSubject,
      content: defaultContent 
    });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
          ...prevData,
          [name]: value
      }));
  };
  


  const handleSubmit = async (e) => {
      e.preventDefault();

      if (formData.recipient.trim() === '' || formData.subject.trim() === '' || formData.content.trim() === '') {
        window.alert('Proszę wypełnić wszystkie pola.');
        return;
      }

      await fetch('http://localhost:8080/api/mails/sent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            window.alert("Udało się wysłać maila!");
            window.location.href = '../generalPage';
        })

      console.log(formData);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/api/mails/unsent`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            window.alert("Udało się zapisać maila!");
            window.location.href = '../generalPage';
        })

  }

  return (
    <div className="mail-content-container" >
        <form onSubmit={handleSubmit}>
            <div className="label-input-container">
                <label htmlFor="recipient">Do:</label>
                <input type="text" id="recipient" name="recipient" value={formData.recipient} onChange={handleChange} />
            </div>
            <div className="label-input-container">
                <label htmlFor="subject">Temat:</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div className="label-input-container">
                <label htmlFor="content">Wiadomość:</label>
                <textarea id="content" name="content"  value={formData.content} onChange={handleChange}
                ></textarea>
            </div>
            <div className='form-buttons'>
                <input type="submit" value="Wyślij" />
                <button type="button" onClick={handleSave}>Zapisz</button>
            </div>
        </form>
    </div>
);

};

export default MailContent;