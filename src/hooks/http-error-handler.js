import { useState, useEffect } from "react";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [
    httpClient.interceptors.request,
    httpClient.interceptors.response,
    reqInterceptor,
    resInterceptor,
  ]);

  const errorConfirmedHandler = () => {
    setError(null);
  };
  return [error, errorConfirmedHandler];
};
