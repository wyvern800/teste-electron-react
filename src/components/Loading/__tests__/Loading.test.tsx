import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../index';
import * as GlobalContext from '../../../features/contexts/global';

// Mock react-spinners
jest.mock('react-spinners/ClipLoader', () => {
  return function DummyLoader(props: any) {
    return (
      <div 
        data-testid="loader" 
        style={{ color: props.color }}
      >
        Loader
      </div>
    );
  };
});

// Mock the GlobalContext
jest.mock('../../../features/contexts/global', () => ({
  useGlobalContext: jest.fn()
}));

describe('Loading Component', () => {
  const mockUseGlobalContext = GlobalContext.useGlobalContext as jest.Mock;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading spinner in light mode', () => {
    mockUseGlobalContext.mockReturnValue({
      data: { isDarkMode: false }
    });

    render(<Loading />);
    
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveStyle({ color: '#000' });
  });

  it('renders loading spinner in dark mode', () => {
    mockUseGlobalContext.mockReturnValue({
      data: { isDarkMode: true }
    });

    render(<Loading />);
    
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveStyle({ color: '#fff' });
  });
});
