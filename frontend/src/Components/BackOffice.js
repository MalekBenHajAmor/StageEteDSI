import React, { useEffect, useState } from 'react';

function BackOffice() {
  const [reservations, setReservations] = useState([]);
  const [searchDate, setSearchDate] = useState(''); // State to hold the search date

  // Fetch reservations from the backend
  useEffect(() => {
    fetch('http://localhost:8081/api/reservations') 
      .then(response => response.json())
      .then(data => setReservations(data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  // Handle date input change
  const handleDateChange = (event) => {
    setSearchDate(event.target.value);
  };

  // Filter reservations based on the search date
  const filteredReservations = reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.reservationTime).toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
    return reservationDate === searchDate; // Match the search date
  });

  return (
    <div className="wrapper">
      <nav id="sidebar" className="sidebar js-sidebar">
        <div className="sidebar-content js-simplebar">
          <a className="sidebar-brand" href="index.html">
            <span className="align-middle">AdminKit</span>
          </a>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Pages</li>
            <li className="sidebar-item active">
              <a className="sidebar-link" href="index.html">
                <i className="align-middle" data-feather="sliders"></i>
                <span className="align-middle">Dashboard</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="pages-profile.html">
                <i className="align-middle" data-feather="user"></i>
                <span className="align-middle">Profile</span>
              </a>
            </li>
          </ul>
          <div className="sidebar-cta">
            <div className="sidebar-cta-content">
              <strong className="d-inline-block mb-2">Upgrade to Pro</strong>
              <div className="mb-3 text-sm">
                Are you looking for more components? Check out our premium version.
              </div>
              <div className="d-grid">
                <a href="upgrade-to-pro.html" className="btn btn-primary">Upgrade to Pro</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="main">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="date"
            value={searchDate}
            onChange={handleDateChange}
            placeholder="Search by date"
            className="form-control"
          />
        </div>

        {/* Reservation Table */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer ID</th>
              <th scope="col">Reservation Time</th>
              <th scope="col">Number of Guests</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation, index) => (
              <tr key={reservation.id}>
                <th scope="row">{index + 1}</th>
                <td>{reservation.customerId}</td>
                <td>{new Date(reservation.reservationTime).toLocaleString()}</td>
                <td>{reservation.numberOfGuests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BackOffice;
