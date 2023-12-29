import React, {useState, useEffect} from "react";
import axios from "axios";

export const usePostQuery = (url, payload) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'ueQu0lb35MnIsk5erCAWqIVPQ4BKzf';

        setLoading(true);

        await axios.post(
          url,
          payload,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (url && payload) {
      fetchData();
    }
  }, [url]);
  return { loading, error};
};
