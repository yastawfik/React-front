const API_BASE_URL = 'http://127.0.0.1:8000/api/valeurs'; // Replace with your actual IP

export const valeurSaisieService = {
  getAllValeurs: async () => {
    const response = await fetch(`${API_BASE_URL}/valeurs`);
    return await response.json();
  },

  getValeurById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/valeurs/${id}`);
    return await response.json();
  },

  createValeur: async (valeurData) => {
    const response = await fetch(`${API_BASE_URL}/valeurs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(valeurData)
    });
    return await response.json();
  }
};