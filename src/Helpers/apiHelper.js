import axios from 'axios';

const instance = axios.create();

const errorInterceptor = (response) => {
  if (!axios.isCancel(response) && response?.response?.data?.error) {
    throw response?.response?.data.error;
  }

  return response;
};

instance.interceptors.response.use(null, errorInterceptor);

export const fetchCves = async (params) => {
  return instance.get('/api/ocp-vulnerability/v1/cves', { params });
};

export const fetchClusters = async (params) => {
  return instance.get('/api/ocp-vulnerability/v1/clusters', { params });
};

export const fetchExposedClusters = async (params, cveId) => {
  return instance.get(
    `/api/ocp-vulnerability/v1/cves/${cveId}/exposed_clusters`,
    {
      params,
    }
  );
};

export const fetchCveDetails = async (cveId) => {
  return instance.get(`/api/ocp-vulnerability/v1/cves/${cveId}`);
};

export const fetchClusterCves = async (params, clusterId) => {
  return instance.get(`/api/ocp-vulnerability/v1/clusters/${clusterId}/cves`, {
    params,
  });
};

export const fetchClusterDetails = async (clusterId) => {
  return instance.get(`/api/ocp-vulnerability/v1/clusters/${clusterId}`);
};
