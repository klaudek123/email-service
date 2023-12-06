import React,{useState, useEffect} from 'react';
import './GeneralPage.css';
import InboxContent from './InboxContent.js';
import MailContent from './MailContent.js'
import SentContent from './SentContent.js';
import TrashContent from './TrashContent.js';
import DrafContent from './DraftContent.js';

const GeneralPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('inbox');
    const [emails, setEmails] = useState([]);
    const email = localStorage.getItem("email");
    const loggedIn = localStorage.getItem("loggedIn");
    const [user, setUser] = useState([]);

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
        switch(menu){
            case 'inbox':
                getEmails('received');
                break;
            case 'sent':
                getEmails('sent');
                break;
            case 'draft':
                getEmails('saved');
                break;
            case 'trash':
                getEmails('trashed');
                break;
            default:
                getEmails('received'); 
                break;
        }
    }
    
    useEffect(() => {
        if (loggedIn === 'true') {
            getUserData();
            switch(selectedMenu){
                case 'inbox':
                    getEmails('received');
                    break;
                case 'sent':
                    getEmails('sent');
                    break;
                case 'draft':
                    getEmails('saved');
                    break;
                case 'trash':
                    getEmails('trashed');
                    break;
                default:
                    getEmails('received');
                    break;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUserData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users?email=${email}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            setUser(await response.json());    
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const getEmails = async (status) => { 
        try {
            const response = await fetch(`http://localhost:8080/api/mails/${status}?owner=${email}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setEmails(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


    const renderContent = () => {
        switch (selectedMenu) {
            case 'inbox':
                return <InboxContent emails={emails} />;
            case 'sent':
                return <SentContent emails={emails} />;
            case 'draft':
                return <DrafContent emails={emails}/>;
            case 'trash':
                return <TrashContent emails={emails}/>;
            case 'mail':
                return <MailContent email={email} />;
            default:
                return null;
        }
    };

    const handleLogout = () => {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    
      
      window.location.href = '../login';
    };

    const centerStyle = {
        width: '90%'
    };

    return (
        <div className="container">
            <div className="header-container" id='style'>
                <div className="logo-container">
                    <img src={require('../logo.png')} alt="logo" />
                    <h1>Fast</h1>
                </div>
                <div className="header-right">
                    <h3>Witaj, {user.name} {user.lastname}, {user.email}! </h3>
                </div>
                <div className='form-buttons'>
                    <button onClick={handleLogout}>Wyloguj</button>
                </div>
            </div>
            <div className="aside-content-container registration-form" id='style' style={centerStyle}>
                <div className="aside-container">
                    <div className="inbox" onClick={() => handleMenuClick('inbox')}>Skrzynka odbiorcza</div>
                    <div className="sent" onClick={() => handleMenuClick('sent')}>Wysłane</div>
                    <div className="draft" onClick={() => handleMenuClick('draft')}>Kopia robocza</div>
                    <div className="trash" onClick={() => handleMenuClick('trash')}>Kosz</div>
                    <div className="mail" onClick={() => handleMenuClick('mail')}>Nowa wiadomość</div>
                </div>
                <div className="content-container">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default GeneralPage;