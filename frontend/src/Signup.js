import React, { useState } from 'react';
import './Signup.css';



const Signup = () => {
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        lastname: "",
        dayOfBirth: "",
        monthOfBirth: "",
        yearOfBirth: "",
        sex: "",
        password: "",
        passwordCheck: "",
        acceptTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setUserData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (userData.password !== userData.passwordCheck) {
            window.alert("Hasło i potwierdzenie hasła nie są identyczne");
            return;
        }

        const user = {
            email: userData.email,
            name: userData.name,
            lastname: userData.lastname,
            dateOfBirth: `${userData.yearOfBirth}-${userData.monthOfBirth}-${userData.dayOfBirth}`,
            sex: userData.sex,
            password: userData.password,
        };

        fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            window.alert("Użytkownik został pomyślnie dodany");
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    };

    const handleCancel = () => {
        window.location.href = '/login';
    };

    const centerStyle = {
        width: '85%'
    };

    return (
        <div className='constainer' >
            <div className="header-container" id='style'>
                <div className="logo-container">
                    <img src={require('./logo.png')} alt="logo" />
                    <h1>Fast</h1>
                </div>
            </div>
            <div className='registration-form' id='style' style={centerStyle}> 
                <form onSubmit={handleFormSubmit}>
                    <h1>Załóż nowe konto</h1>
                    <h3>Wypełnij poniższe pola, aby założyć nowe konto</h3>

                    <div className='personal-info-section'>
                        <label>Imię:</label>
                        <input type="text" name="name" value={userData.name} onChange={handleChange} required />
                        <br /> <br />

                        <label>Nazwisko:</label>
                        <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} required />
                        <br /> <br />
                    
                        <label>Email:</label>
                        <input type="text" name="email" value={userData.email} onChange={handleChange} required />
                        <br /> <br />

                        <p>Płeć:</p>
                        <input type="radio" name="sex" id="female" value="female"checked={userData.sex === "female"}onChange={handleChange}/>
                        kobieta &emsp;
                        <input type="radio" name="sex" id="male" value="male" checked={userData.sex === "male"} onChange={handleChange} />
                        mężczyzna
                        <br /> <br />

                    </div>
                    <div className='dob-section'>
                        <p>Data urodzenia:</p>
                        <select name="dayOfBirth" value={userData.dayOfBirth} onChange={handleChange} >
                            <option>Dzień</option>
                            <option>01</option>                    <option>02</option>                    <option>03</option>
                            <option>04</option>                    <option>05</option>                    <option>06</option>
                            <option>07</option>                    <option>08</option>                    <option>09</option>
                            <option>10</option>                    <option>11</option>                    <option>12</option>
                            <option>13</option>                    <option>14</option>                    <option>15</option>
                            <option>16</option>                    <option>17</option>                    <option>18</option>
                            <option>19</option>                    <option>20</option>                    <option>21</option>
                            <option>22</option>                    <option>23</option>                    <option>24</option>
                            <option>25</option>                    <option>26</option>                    <option>27</option>
                            <option>28</option>                    <option>29</option>                    <option>30</option>
                            <option>31</option>
                        </select>
                        <select name="monthOfBirth" value={userData.monthOfBirth} onChange={handleChange} >
                            <option>Miesiąc</option>
                            <option>01</option>                    <option>02</option>                    <option>03</option>
                            <option>04</option>                    <option>05</option>                    <option>06</option>
                            <option>07</option>                    <option>08</option>                    <option>09</option>
                            <option>10</option>                    <option>11</option>                    <option>12</option>
                        </select>
                        <input type="text" id="yearOfBirth" name="yearOfBirth" placeholder="Rok" 
                            value={userData.yearOfBirth} onChange={handleChange} required/>
                        <br /> <br />
                        </div>

                    <div className='password-section'>    
                        <p>Hasło:</p>
                        <input type="password" id="registration" name="password" value={userData.password} onChange={handleChange} required />

                        <br /> <br />
                        <p>Powtórz hasło:</p>
                        <input type="password" id="registrationCheck" name="passwordCheck" value={userData.passwordCheck} onChange={handleChange} required />

                        <br /> <br />
                    </div>
                    <div className='legal-info-section'>
                        <h3>Informacje prawne</h3>
                        <input type="checkbox" id="registrationStatute" name="acceptTerms" checked={userData.acceptTerms} onChange={handleChange} required />

                        Akceptuję regulamin <br /> <br />
                    </div>
                    <div className='form-buttons'>
                        <input type="submit" value="Załóż konto" />
                        <button type="button" onClick={handleCancel}>Anuluj</button>
                    </div>
                </form>
            </div>
        </div>

    );
};



export default Signup;