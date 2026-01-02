import React from 'react';
import { render, screen } from '@testing-library/react-native';
import InvestmentItem from '../src/components/InvestmentItem';
import { Investment } from '../src/types/investment';

const mockInvestment: Investment = {
  id: 1,
  farmer_name: 'Dimesha Wijerathna',
  amount: 15000.00,
  crop: 'Green Apple',
  created_at: '2024-01-15T10:30:00Z'
};

describe('InvestmentItem', () => {
  it('renders investment details correctly', () => {
    render(<InvestmentItem investment={mockInvestment} />);
    
    expect(screen.getByText('Dimesha Wijerathna')).toBeTruthy();
    expect(screen.getByText('15000.00')).toBeTruthy();
    expect(screen.getByText('Green Apple')).toBeTruthy();
  });
});