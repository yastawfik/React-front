import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You can use axios or fetch

const ListValeurs = () => {
  const [valeurs, setValeurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your Laravel API base URL
  const API_URL = 'http://127.0.0.1:8000/api'; 

  useEffect(() => {
    const fetchValeurs = async () => {
      try {
        // Using fetch
        const response = await fetch(`${API_URL}/valeurs`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setValeurs(data);
        setLoading(false);
        
        // Alternative using axios:
        // const response = await axios.get(`${API_URL}/valeurs`);
        // setValeurs(response.data);
        // setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchValeurs();
  }, []);

  if (loading) return <div>Loading valeurs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="valeurs-container">
      <h2>Liste des Valeurs</h2>
      
      {valeurs.length === 0 ? (
        <p>Aucune valeur trouvée</p>
      ) : (
        <table className="valeurs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Valeur</th>
              <th>Date</th>
              {/* Add other columns as needed */}
            </tr>
          </thead>
          <tbody>
            {valeurs.map((valeur) => (
              <tr key={valeur.id}>
                <td>{valeur.id}</td>
                <td>{valeur.valeur}</td> {/* Replace with your actual field name */}
                <td>{new Date(valeur.created_at).toLocaleDateString()}</td>
                {/* Add other fields as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListValeurs;