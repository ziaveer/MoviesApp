import { useCallback, useState } from "react";

const useHttps = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback( async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
        
      const response = await fetch(requestConfig.url);

      if (!response.ok) {
        throw new Error("invalid");
      }
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something Went wrong");
    //   console.log(error);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};
export default useHttps;
