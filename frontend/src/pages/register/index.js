import React, {useState} from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
 
import './styles.css';

function Register(){
    
    const history = useHistory();


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    async function handleRegister(event){
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try{
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);   
            history.push('/'); 
        }catch(error){
            alert("Erro no cadastro. ");
        }
        
    }
    
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                    value={name}
                    onChange={ event => setName(event.target.value)}/>

                    <input type="email" placeholder="E-mail"
                    value={email}
                    onChange={ event => setEmail(event.target.value)}/>
                    
                    <input placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={ event => setWhatsApp(event.target.value)}/>

                    <div className="input-group">
                        <input placeholder="Cidade"
                        value={city}
                        onChange={ event => setCity(event.target.value)}/>
                        
                        <input placeholder="UF" style={{width: 80}}
                        value={uf}
                        onChange={ event => setUF(event.target.value)}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
        
    );
}



export default Register;