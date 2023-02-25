import axios from 'axios';

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const login = async (username, password) => {
  try {
    const {data} = await authAxios.post(
      '/auths/login',
      { username, password },
      {
        headers: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      },
    );
    // console.log(d);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { login };
