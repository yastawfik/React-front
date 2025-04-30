import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ValeursList from './components/ValeursList';
import axios from 'axios';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [num4, setNum4] = useState('');
  const [average, setAverage] = useState(null);

  useEffect(() => {
    const n1 = parseFloat(num1.replace(',', '.'));
    const n2 = parseFloat(num2.replace(',', '.'));
    const n3 = parseFloat(num3.replace(',', '.'));
    const n4 = parseFloat(num4.replace(',', '.'));

    const allValid = [n1, n2, n3, n4].every(n => !isNaN(n));

    if (allValid) {
      const avg = (n1 + n2 + n3 + n4) / 4;
      setAverage(avg.toFixed(2).replace('.', ','));
    } else {
      setAverage(null);
    }
  }, [num1, num2, num3, num4]);

  const handleSave = async () => {
    try {
      const response = await axios.post('http://192.168.105.108:8000/api/valeurs', {
        valeur1: parseFloat(num1.replace(',', '.')),
        valeur2: parseFloat(num2.replace(',', '.')),
        valeur3: parseFloat(num3.replace(',', '.')),
        valeur4: parseFloat(num4.replace(',', '.')),
        moyenne: parseFloat(average.replace(',', '.')),
      });
      console.log('Saved successfully:', response.data);
      alert('Valeurs enregistrées avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error.response?.data || error.message);
      alert('Erreur: ' + (error.response?.data?.message || error.message));
    }

    setNum1('');
    setNum2('');
    setNum3('');
    setNum4('');
    setAverage(null);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Router>
      <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
        <h2>Entrez 4 nombres (utilisez une virgule pour les décimales):</h2>
        <input
          type="text"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          style={inputStyle}
          placeholder="Nombre 1"
        />
        <input
          type="text"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          style={inputStyle}
          placeholder="Nombre 2"
        />
        <input
          type="text"
          value={num3}
          onChange={(e) => setNum3(e.target.value)}
          style={inputStyle}
          placeholder="Nombre 3"
        />
        <input
          type="text"
          value={num4}
          onChange={(e) => setNum4(e.target.value)}
          style={inputStyle}
          placeholder="Nombre 4"
        />

        {average && (
          <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
            Moyenne: {average}
          </p>
        )}

        <button
          className="btn btn-danger btn-custom"
          onClick={handleSave}
          style={buttonStyle}
        >
          Enregistrer
        </button>

        <button
          className="btn btn-secondary btn-custom"
          onClick={handleRefresh}
          style={buttonStyle}
        >
          Refresh
        </button>

        <Link to="/valeurs" className="btn btn-primary btn-custom" style={{ ...buttonStyle, width: '100%' }}>
          Voir les valeurs enregistrées
        </Link>
      </div>

      <Routes>
        <Route path="/valeurs" element={<ValeursList />} />
      </Routes>
    </Router>
  );
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default App;
