//this purpose is easy to create new tabs in home screen 
export interface Investment {
  id: number;
  farmer_name: string;
  amount: number;
  crop: string;
  created_at: string;

}

export interface NewInvestment { 
  farmer_name: string;
  amount: number;
  crop: string;
}