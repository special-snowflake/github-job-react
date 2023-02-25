import axios from 'axios';

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getListJobs = async (search, location, fulltime, page) => {
  try {
    const authorization = localStorage.getItem('token');
    const { data } = await authAxios.get('/jobs', {
      headers: {
        api_key: process.env.REACT_APP_API_KEY,
        authorization,
      },
      params: {
        search,
        location,
        fulltime,
        page,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
const getJobDetails = async (id) => {
  try {
    const authorization = localStorage.getItem('token');
    const url = `/jobs/detail/${id}`;
    const { data } = await authAxios.get(url, {
      headers: {
        api_key: process.env.REACT_APP_API_KEY,
        authorization,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { getListJobs, getJobDetails };
