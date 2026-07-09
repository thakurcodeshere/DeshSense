/**
 * @department Data Architecture
 * @role Data Architect & Signal Analyst
 * @description Immutable data registries providing O(1) time complexity configuration blocks for the runtime engine.
 * @security Verified safe literal objects. No executable payloads.
 */

export const RANKS = [
  { level: 1, name: 'Civilian', range: [0, 500], color: '#94A3B8' },
  { level: 2, name: 'Civic Cadet', range: [500, 2000], color: '#3B82F6' },
  { level: 3, name: 'Civic Volunteer', range: [2000, 5000], color: '#22C55E' },
  { level: 4, name: 'Civic Officer', range: [5000, 10000], color: '#14B8A6' },
  { level: 5, name: 'Civic Captain', range: [10000, 20000], color: '#A855F7' },
  { level: 6, name: 'Civic Commander', range: [20000, 35000], color: '#EF4444' },
  { level: 7, name: 'Civic Marshal', range: [35000, 50000], color: '#F97316' },
  { level: 8, name: 'Civic Sentinel', range: [50000, 75000], color: '#E2E8F0' },
  { level: 9, name: 'Bharat Civic Guardian', range: [75000, 9999999], color: '#F59E0B' },
];

export const ACTIONS = [
  { id: 1, name: 'Plastic Bottle Return', icon: '♻️', base: 5, impact: 1.5, effort: 1.0 },
  { id: 2, name: 'Glass Bottle Return', icon: '🍶', base: 6, impact: 1.3, effort: 1.0 },
  { id: 3, name: 'Clothes Donation', icon: '👕', base: 10, impact: 1.0, effort: 1.2 },
  { id: 4, name: 'Food Waste Compost', icon: '🌱', base: 8, impact: 1.2, effort: 1.0 },
  { id: 5, name: 'Community Cleanup', icon: '🧹', base: 20, impact: 1.5, effort: 2.0 },
  { id: 6, name: 'River Cleaning', icon: '🌊', base: 30, impact: 1.5, effort: 2.0 },
  { id: 7, name: 'Waste Segregation', icon: '🗑️', base: 7, impact: 1.2, effort: 1.3 },
  { id: 8, name: 'Tree Plantation', icon: '🌳', base: 15, impact: 1.4, effort: 1.5 },
];

export const LEADERBOARD = [
  { id: 101, name: 'Aarav M.', city: 'Mumbai', score: 98450, rankLevel: 9, avatar: 'A' },
  { id: 102, name: 'Priya K.', city: 'Bengaluru', score: 92100, rankLevel: 9, avatar: 'P' },
  { id: 103, name: 'Rohan S.', city: 'Delhi', score: 88300, rankLevel: 9, avatar: 'R' },
  { id: 104, name: 'Ananya D.', city: 'Pune', score: 85200, rankLevel: 9, avatar: 'A' },
  { id: 105, name: 'Kiran V.', city: 'Chennai', score: 81400, rankLevel: 9, avatar: 'K' },
];

export const REWARDS = [
  { id: 1, icon: '🚇', name: 'Metro Ride Free', credits: 200, partner: 'Delhi Metro' },
  { id: 2, icon: '🎬', name: 'Movie Ticket ₹100 Off', credits: 350, partner: 'BookMyShow' },
  { id: 3, icon: '🍽️', name: 'Restaurant 20% Off', credits: 500, partner: 'Swiggy Dine' },
  { id: 4, icon: '🚌', name: 'Bus Pass 1 Week', credits: 400, partner: 'BEST Mumbai' },
  { id: 5, icon: '🛍️', name: 'Shopping ₹200 Off', credits: 600, partner: 'Flipkart' },
  { id: 6, icon: '✈️', name: 'Flight Discount ₹500', credits: 1500, partner: 'IndiGo' },
];

export const MISSIONS = [
  { id: 1, title: 'Plastic Free Market Week', icon: '🛍️', bonus: 500, deadline: '5 days left', participants: 12450 },
  { id: 2, title: 'Monsoon Drain Clearing', icon: '🌧️', bonus: 800, deadline: '2 days left', participants: 8300 },
  { id: 3, title: 'Beach Cleanup Sunday', icon: '🏖️', bonus: 1000, deadline: '12 hrs left', participants: 4100 },
];

export const ACTIVITY_FEED = [
  { id: 1, name: 'Vikram S.', action: 'River Cleaning', credits: 108, time: '2m ago', rankLevel: 4 },
  { id: 2, name: 'Neha G.', action: 'Tree Plantation', credits: 38, time: '5m ago', rankLevel: 2 },
  { id: 3, name: 'Rahul P.', action: 'Plastic Bottle Return', credits: 9, time: '12m ago', rankLevel: 1 },
  { id: 4, name: 'Sneha M.', action: 'Community Cleanup', credits: 72, time: '15m ago', rankLevel: 5 },
];

export const VIDEOS = [
  { id: 1, user: '@eco_warrior', name: 'Aditi R.', city: 'Mumbai', rankLevel: 6, caption: 'Cleaned up Juhu beach this morning! 🙌 #SwachhBharat', tags: ['#SwachhBharat', '#Mumbai'], likes: 12400, comments: 450, shares: 120, credits: 50, views: '1.2M', duration: '0:45', verified: true, trending: true, category: 'Beach Cleanup', bg: 'linear-gradient(135deg, #1E3A8A, #0F172A)', emoji: '🌊', audio: 'Clean India Anthem' },
  { id: 2, user: '@green_delhi', name: 'Karan B.', city: 'Delhi', rankLevel: 4, caption: 'Starting a rooftop garden. Join the movement! 🌿', tags: ['#GreenDelhi', '#UrbanFarming'], likes: 8200, comments: 310, shares: 85, credits: 30, views: '800K', duration: '0:58', verified: false, trending: true, category: 'Tutorial', bg: 'linear-gradient(135deg, #14532D, #064E3B)', emoji: '🌱', audio: 'Green Revolution' },
  { id: 3, user: '@recycle_king', name: 'Omar F.', city: 'Hyderabad', rankLevel: 8, caption: 'Sorted 50kgs of plastic today. Let\'s go! ♻️', tags: ['#Recycling', '#Hyderabad'], likes: 45000, comments: 1200, shares: 500, credits: 100, views: '3.5M', duration: '0:30', verified: true, trending: true, category: 'Recycling', bg: 'linear-gradient(135deg, #7C2D12, #451A03)', emoji: '♻️', audio: 'Bharat Rising' }
];
