/**
 * @department Performance & Logic
 * @role Runtime Engineer & Latency Slayer
 * @description Pure functions with zero side-effects to ensure lighting-fast O(1) mathematical operations. 
 */
import { RANKS } from '../constants';

export const getRank = (score) => {
  return RANKS.find(r => score >= r.range[0] && score <= r.range[1]) || RANKS[0];
};

export const calcCredits = (action, trustScore = 1.2) => {
  return Math.round(action.base * action.impact * action.effort * trustScore);
};

export const fmtN = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
};
