import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://192.168.0.16:8000';

/**
 fixed :
  - no need to JSON.stringify to then immediatly do a JSON.parse
  - don't use export defaults, because default imports are hard to search for
  - axios already support generic request in one parameter, no need to call specialized ones
**/
export const useAxios = () => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async (params) => {
      try {
       const result = await axios.request(params);
       setResponse(result.data);
       } catch( error ) {
         setError(error);
       } finally {
         setLoading(false);
       }
       return(response, error, loading)
    };
    return fetchData;
};