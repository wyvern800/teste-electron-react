import React from 'react';
import PokemonsList from './PokemonsList';
import { useGlobalContext } from '../features/contexts/global';

const App: React.FC = () => {
  const { data: { isDarkMode } } = useGlobalContext();
  
  return (
    <div className="app" style={{ 
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0',
      minHeight: '100vh'
    }}>
      <PokemonsList />
    </div>
  );
};

export default App;
