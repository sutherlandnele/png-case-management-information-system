export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {

      const {
        auth: { isUserAuthenticated, accessToken }
      } = store.getState();

      if (isUserAuthenticated) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    err => Promise.reject(err)
  );
}
