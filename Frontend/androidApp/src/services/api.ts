import axios from 'axios';
import { Investment, NewInvestment } from '../types/investment';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const api = {
  async getInvestments(): Promise<Investment[]> {
    const response = await axios.get(`${BASE_URL}/api/investments`);
    return response.data;
  },
  
 
};