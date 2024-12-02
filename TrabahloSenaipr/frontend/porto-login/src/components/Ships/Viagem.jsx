import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Ships/Header';
import Footer from '../Ships/Footer';

const Viagem = () => {
  const [tripData, setTripData] = useState({});
  const navigate = useNavigate();

  const handleTripInputChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleRegisterTrip = () => {
    console.log('Dados da viagem registrados:', tripData);
    // Adicione a lógica para salvar a viagem aqui, se necessário
    navigate('/ships'); // Retorna para a lista de navios após registrar
  };

  const handleCancelTrip = () => {
    navigate('/ships'); // Cancela e retorna para a lista de navios
  };

  return (
    <>
      <Header />
      <div className="viagem-container">
        <h2>Tela de viagens</h2>
        <form>
          <div>
            <label>Quantidade de carga:</label>
            <input
              type="text"
              name="cargoQuantity"
              value={tripData.cargoQuantity || ''}
              onChange={handleTripInputChange}
            />
          </div>
          <div>
            <label>Tipo de carga:</label>
            <input
              type="text"
              name="cargoType"
              value={tripData.cargoType || ''}
              onChange={handleTripInputChange}
            />
          </div>
          <div>
            <label>Data de chegada:</label>
            <input
              type="date"
              name="arrivalDate"
              value={tripData.arrivalDate || ''}
              onChange={handleTripInputChange}
            />
          </div>
          <div>
            <label>Equipamentos necessários:</label>
            <input
              type="text"
              name="equipment"
              value={tripData.equipment || ''}
              onChange={handleTripInputChange}
            />
          </div>
          <div>
            <label>Documento de carga:</label>
            <textarea
              name="cargoDocument"
              value={tripData.cargoDocument || ''}
              onChange={handleTripInputChange}
            />
          </div>
          <div>
            <label>Tempo de permanência estimada:</label>
            <input
              type="text"
              name="stayTime"
              value={tripData.stayTime || ''}
              onChange={handleTripInputChange}
            />
          </div>
          <div>
            <label>Telefone do representante do navio:</label>
            <input
              type="text"
              name="representativePhone"
              value={tripData.representativePhone || ''}
              onChange={handleTripInputChange}
            />
          </div>
        </form>
        <div className="viagem-buttons">
          <button onClick={handleRegisterTrip}>Registrar</button>
          <button onClick={handleCancelTrip}>Cancelar</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Viagem;
