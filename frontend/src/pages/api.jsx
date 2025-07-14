// src/api.js

import axios from 'axios';

export const fetchProfileInfo = async (mobileNumber) => {
  if (!mobileNumber) {
    throw new Error('Mobile number not available');
  }

  try {
    const response = await axios.get(`/api/profile/mobile/${mobileNumber}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch profile info');
  }
};

export const fetchImportantDetails = async (mobileNumber) => {
  if (!mobileNumber) {
    throw new Error('Mobile number not available');
  }

  try {
    const response = await axios.get(`/api/documents/mobile/${mobileNumber}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Important Details');
  }
};