import axios from 'axios';
import { Investment, NewInvestment } from '../types/investment';

const BASE_URL = 'http://192.168.8.112:3000';

export const api = {
  async getInvestments(): Promise<Investment[]> {
    const response = await axios.get(`${BASE_URL}/api/investments`);
    return response.data;
  },
  
   async createInvestment(investment: NewInvestment): Promise<Investment> {
    const response = await axios.post(`${BASE_URL}/api/investments`, investment);
    return response.data;
  }
 
};