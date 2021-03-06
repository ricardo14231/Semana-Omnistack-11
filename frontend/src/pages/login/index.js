import React, {useState} from 'react';

import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';


function Login(){
    const [id_ong, setId] = useState('');   
    const history = useHistory();
     
    async function handleLogin(event){
        event.preventDefault();

        try {
            const response = await api.post('session',  { id_ong } );    
            
            localStorage.setItem('id_ong', id_ong);
            localStorage.setItem('name_ong', response.data.name);

            history.push('/profile');
        } catch (error) {
            console.log("Error ao fazer login!");
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={ logoImg } alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Sua ID" 
                    value={id_ong} 
                    onChange={ event => setId(event.target.value)}/>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>

                </form>

            </section>
            <img src={ heroesImg } alt="Heroes"/>
        </div>
    );
}

export default Login;