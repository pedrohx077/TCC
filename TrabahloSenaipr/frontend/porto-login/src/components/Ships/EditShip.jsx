import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Ships.css';

const EditShip = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Verifique se `location.state` está definido, caso contrário, forneça valores padrão
  const [shipData, setShipData] = useState(location.state || { name: '', imo: '', type: '', size: '', capacity: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipData({ ...shipData, [name]: value });
  };

  const handleSave = () => {
    // Lógica para salvar os dados (ex: enviar para o backend)
    console.log('Salvar dados:', shipData);
    navigate('/ships'); // Redirecione de volta para a lista de navios após salvar
  };

  const handleCancel = () => {
    navigate('/ships'); // Redirecione para a página de lista de navios
  };

  return (
    <>
      <Header />
      <div className="edit-container">
        <h2>Edição</h2>
        <form className="edit-form">
          <div>
            <label>Nome do Navio:</label>
            <input
              type="text"
              name="name"
              value={shipData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Número do IMO:</label>
            <input
              type="text"
              name="imo"
              value={shipData.imo}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Tipo de navio:</label>
            <input
              type="text"
              name="type"
              value={shipData.type}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Tamanho do navio:</label>
            <input
              type="text"
              name="size"
              value={shipData.size}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Capacidade de Carga:</label>
            <input
              type="text"
              name="capacity"
              value={shipData.capacity}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-buttons">
            <button type="button" onClick={handleSave}>
              Confirmar edição
            </button>
            <button type="button" onClick={handleCancel}>
              Cancelar edição
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditShip;
