import { useState, useEffect } from 'react';

const useGetDueño = () => {
  const [dueñoData, setDueñoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.ecuadorlegalonline.com/modulo/sri/matriculacion/consultar-dueno.php?placa=&_POG0449=${Date.now()}`,
          {
            headers: {
              Host: 'www.ecuadorlegalonline.com',
              Referer: 'https://www.ecuadorlegalonline.com/consultas/consultar-dueno-de-vehiculo/'
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.text();
        setDueñoData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once

  return { dueñoData, loading, error };
};

export default useGetDueño;
