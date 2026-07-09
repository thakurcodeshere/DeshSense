/**
 * @department Logic & State Management
 * @role System Orchestrator & Logic Designer
 * @description Global application state managed securely in an immutable React Context wrapper.
 * @security Access strictly controlled via Context Consumers. Direct DOM mutation strictly prohibited.
 */

import React, { createContext, useState, useContext, useCallback } from 'react';
import { calcCredits } from '../utils/engine';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [screen, setScreen] = useState('home'); // home, actions, videos, ranks, rewards, card, team
  const [civicScore, setCivicScore] = useState(4250);
  const [civicCredits, setCivicCredits] = useState(240);
  const [totalActions, setTotalActions] = useState(34);
  const [trustScore, setTrustScore] = useState(1.2);
  const [completedActions, setCompletedActions] = useState([]);
  const [redeemedRewards, setRedeemedRewards] = useState([]);
  const [toast, setToast] = useState(null);

  // Performance Engineer: Memoized callbacks to prevent downstream re-renders
  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleActionLog = useCallback((action) => {
    const earnedCredits = calcCredits(action, trustScore);
    setCivicScore(prev => prev + (earnedCredits * 2)); 
    setCivicCredits(prev => prev + earnedCredits);
    setTotalActions(prev => prev + 1);
    setCompletedActions(prev => [...prev, action.id]);
    showToast(`+${earnedCredits} CivicCredits for ${action.name}! 🎉`, 'success');
  }, [trustScore, showToast]);

  const handleRewardRedeem = useCallback((reward) => {
    if (redeemedRewards.includes(reward.id)) return;
    if (civicCredits >= reward.credits) {
      setCivicCredits(prev => prev - reward.credits);
      setRedeemedRewards(prev => [...prev, reward.id]);
      showToast('Reward claimed! Check your email.', 'success');
    } else {
      showToast('Not enough credits!', 'error');
    }
  }, [civicCredits, redeemedRewards, showToast]);

  const value = {
    screen, setScreen,
    civicScore, setCivicScore,
    civicCredits, setCivicCredits,
    totalActions, trustScore,
    completedActions, handleActionLog,
    redeemedRewards, handleRewardRedeem,
    toast, showToast
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
