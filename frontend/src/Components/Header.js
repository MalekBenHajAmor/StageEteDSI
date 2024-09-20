import React, { useState } from 'react';
import { useUser } from './UserContext';

const Header = () => {
  const { currentUser } = useUser();
  const [reservationSuccess, setReservationSuccess] = useState(false); // State for success message
  console.log('Current user in Header:', currentUser);

  const dishes = [
    {
      title: 'Plat Principale',
      imgSrc: `${process.env.PUBLIC_URL}/template/img/specials/1.jpg`,
      description: 'Classic Italian pasta with eggs, cheese, pancetta, and pepper.',
    },
    {
      title: 'Entrée',
      imgSrc: `${process.env.PUBLIC_URL}/template/img/specials/2.jpg`,
      description: 'Traditional pizza topped with tomatoes, mozzarella, and basil.',
    },
  ];

  const handleOrder = () => {
    if (!currentUser) {
      alert('Please sign in to make a reservation.');
      return;
    }

    const reservationData = {
      customerId: currentUser.id,
      reservationTime: new Date().toISOString(),
      numberOfGuests: 2,
      createdAt: new Date().toISOString(),
    };

    fetch('http://localhost:8081/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Reservation created:', data);
        setReservationSuccess(true); // Set success message
      })
      .catch((error) => {
        console.error('Error creating reservation:', error);
        setReservationSuccess(false); // Optionally handle error state
      });
  };

  return (
    <div>
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="intro-text">
                  <h1>Restaurant Universitaire Esprit</h1>
                  <p>Reservations: (216) 58115996</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div id="features" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>PLAT DU JOUR</h2>
          </div>
          <div className="row">
            {dishes.map((dish, index) => (
              <div key={index} className="col-xs-12 col-sm-4 features-item">
                <h3>{dish.title}</h3>
                <img src={dish.imgSrc} className="img-responsive" alt={dish.title} />
                <p>{dish.description}</p>
              </div>
            ))}
          </div>
          <button className="order-button" onClick={handleOrder}>
            Réserver
          </button>
          {reservationSuccess && ( // Show success message if reservation is successful
            <div className="success-message">
              <p>Reservation made successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
