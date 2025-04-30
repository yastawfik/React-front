
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const ListValeurs = () => {
  const [valeurs, setValeurs] = useState([]);
  const [selectedValeur, setSelectedValeur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://192.168.105.108:8000/api';

  useEffect(() => {
    const fetchValeurs = async () => {
      try {
        const response = await fetch(`${API_URL}/valeurs`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setValeurs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchValeurs();
  }, []);
  const handleDownloadPDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`valeur-${selectedValeur.id}.pdf`);
    });
  };
  

  const handleRowClick = (valeur) => {
    setSelectedValeur(valeur);
  };

  const handleCloseDetails = () => {
    setSelectedValeur(null);
  };

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
            </tr>
          </thead>
          <tbody>
            {valeurs.map((valeur) => (
              <tr key={valeur.id} onClick={() => handleRowClick(valeur)} style={{ cursor: 'pointer' }}>
                <td>{valeur.id}</td>
                <td>{valeur.valeur}</td>
                <td>{new Date(valeur.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

{selectedValeur && (
  <div className="valeur-details" style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
    
    {/* This is what will be captured in the PDF */}
    <div id="pdf-content" style={{ textAlign: 'center' }}>
      <h3>Détails de la valeur #{selectedValeur.id}</h3>
      <p><strong>Valeur1:</strong> {selectedValeur.valeur1}</p>
      <p><strong>Valeur2:</strong> {selectedValeur.valeur2}</p>
      <p><strong>Valeur3:</strong> {selectedValeur.valeur3}</p>
      <p><strong>Valeur4:</strong> {selectedValeur.valeur4}</p>
      <p><strong>Moyenne:</strong> {selectedValeur.moyenne}</p>
      <p><strong>Date de création:</strong> {new Date(selectedValeur.created_at).toLocaleString()}</p>
      <p><strong>Date de mise à jour:</strong> {new Date(selectedValeur.updated_at).toLocaleString()}</p>
    </div>

    {/* Buttons (excluded from PDF) */}
    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
      <button class= "btn btn-danger btn-custom" onClick={handleCloseDetails}>Fermer</button>
      <button class= "btn btn-primary btn-custom" onClick={handleDownloadPDF}>Télécharger PDF</button>
    </div>
  </div>
)}
    </div>
  );
};

export default ListValeurs;
