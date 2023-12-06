import { useState, useEffect } from "react";
import React from 'react';
import './Login.css'
import Cookies from 'js-cookie';

const Login = () => {
    const [emailTmp, setEmail] = useState("");
    const [passwordTmp, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const rememberedEmail = Cookies.get('rememberedEmail');
        const rememberedPassword = Cookies.get('rememberedPassword');
        if (rememberedEmail) {
          setEmail(rememberedEmail);
        }
        if (rememberedPassword) {
            setPassword(rememberedPassword);
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
      
        const loginData = {
          email: emailTmp,
          password: passwordTmp,
        };
      
        await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Sprawdź czy otrzymano odpowiednią wiadomość od backendu
            if (data.message === "Zalogowano pomyślnie!") {
                // Zapisz dane logowania do localStorage
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('email', loginData.email);
                localStorage.setItem('password', loginData.password);

                // Przekieruj na stronę generalPage
                window.location.href = '/generalPage';
            } else {
                console.error("Błąd logowania. Sprawdź email i hasło.");
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });


        if (rememberMe) {
            Cookies.set('rememberedEmail', emailTmp, { expires: 7 }); // Ustawienie ciasteczka na 7 dni
            Cookies.set('rememberedPassword', passwordTmp, {expires: 7});
          } else {
            Cookies.remove('rememberedEmail'); // Usunięcie ciasteczka, jeśli checkbox nie jest zaznaczony
            Cookies.remove('rememberedPassword');
          }
    };   

    const handleLinkClick = () => {
        window.location.href = 'https://www.bentleymotors.com/en.html';
    };

    const handleCancel = () => {
        window.location.href = '/signup';
    };

    const centerStyle = {
        width: '85%'
    };

  return (
    <div className="container">
        <div className="header-container" id='style'>
            <div className="logo-container">
                <img src={require('./logo.png')} alt="logo" />
                <h1>Fast</h1>
            </div>
        </div>
        <div className="login-form-add registration-form" id='style' style={centerStyle}>
            <div className="login-form">
                <div>
                    <h1> Logowanie </h1>
                    <form onSubmit={handleFormSubmit}>
                        <label>E-mail:</label>
                        <input type="text" name="email" required value={emailTmp} onChange={(e) => setEmail(e.target.value)} />
                        <br /> <label>Hasło:</label>
                        <input type="password" required value={passwordTmp} onChange={(e) => setPassword(e.target.value)} /> <br />
                        <label>
                        <input type="checkbox" onChange={(e) => setRememberMe(e.target.checked)} />
                            Zapamiętaj mnie
                        </label>
                        <div className='form-buttons'>
                            <input type="submit" value="Zaloguj się" />
                        </div>
                    </form> <br />
                </div>
                <div>
                    <h1> Rejestracja </h1>

                    <h4>Nie masz jeszcze konta?</h4>

                        <div className='form-buttons'>
                        <button type="button" onClick={handleCancel}>Zarejestruj się</button>
                        </div>
                </div>
            </div>
            <div className="ad" >
                    <img src={require('./bentley.jpg')} alt="Bentley" onClick={handleLinkClick} />
            </div>
        </div>
    </div>
  );
}

export default Login;