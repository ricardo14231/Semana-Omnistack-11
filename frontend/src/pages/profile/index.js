import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

function Profile(){
    const history = useHistory();
    const id_ong = localStorage.getItem('id_ong');
    const name_ong = localStorage.getItem('name_ong');

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('profile', {
            headers : {
                authorization : id_ong
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [id_ong]); 

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incident/${id}`, {
                headers : {
                    authorization : id_ong
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert("Erro ao deletar o caso!");
        }
    }

    function hardleLogout(){
        localStorage.clear();

        history.push('/');
    }
    
    return (
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="Be The Hero"/>
                <span>Bem vinda, { name_ong }</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={hardleLogout}>
                    <FiPower size={ 18 } color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {
                    incidents.map(incident =>(
                        
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{ incident.title }</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p> { incident.description } </p>

                            <strong>VALOR:</strong>
                            <p> {Intl.NumberFormat(`pt-BR`, {style: 'currency', currency: 'BRL'}).format(incident.value)} </p>

                            <button onClick={() => handleDeleteIncident(incident.id) } type="button" >
                                <FiTrash2 size={ 20 } color="#A8A8B3"/>
                            </button>
                        </li> 
                    ))
                }          
            </ul>
        </div>
    );
}

export default Profile;