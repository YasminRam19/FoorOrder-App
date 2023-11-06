import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }
  return resData;
}

const useHttp = (url, config, initialData) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);

  //We wrap it inside useCallback -> will only be recreated when its dependency changes
  const sendRequest = useCallback(
    async function sendRequest() {
      try {
        setIsLoading(true);
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || "Something wen wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  //sendRequest is a dependency of the useEffect because it's defined outside of the request function
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
