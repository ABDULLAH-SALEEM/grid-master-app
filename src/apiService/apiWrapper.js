import { constants, showErrorTost } from 'src/constants';
import { clearStorage, retrieveData } from 'src/helper/storageHelper';
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function apiService(endPoint, method, body = null) {
  const token = retrieveData(constants.authToken);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`${baseUrl}/${endPoint}`, options);
  const responseData = await response.json();
  if (!response.ok) {
    if (response.status === 401 && token) {
      showErrorTost('Session expired. Please login again.');
      clearStorage();
      window.location.reload();
    }
    throw new Error(responseData.message || 'Something went wrong');
  }
  return responseData;
}
