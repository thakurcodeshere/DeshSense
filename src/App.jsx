import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';

import HomeScreen from './screens/HomeScreen';
import ActionsScreen from './screens/ActionsScreen';
import VideoScreen from './screens/VideoScreen';
import RankingsScreen from './screens/RankingsScreen';
import RewardsScreen from './screens/RewardsScreen';
import CardScreen from './screens/CardScreen';

function AppLayout() {
  const { screen } = useAppContext();

  const renderScreen = () => {
    switch(screen) {
      case 'home': return <HomeScreen />;
      case 'actions': return <ActionsScreen />;
      case 'ranks': return <RankingsScreen />;
      case 'rewards': return <RewardsScreen />;
      case 'card': return <CardScreen />;
      case 'videos': return <VideoScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <>
      <Toast />
      {screen !== 'videos' && <Header />}
      
      <div style={{ paddingBottom: screen === 'videos' ? 0 : '80px' }}>
        {renderScreen()}
      </div>

      {screen !== 'videos' && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
