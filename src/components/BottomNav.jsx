import React from 'react';
import { useAppContext } from '../context/AppContext';

const NAV_ITEMS = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'actions', icon: '⚡', label: 'Actions' },
  { id: 'videos', icon: '🎬', label: 'Videos' },
  { id: 'ranks', icon: '🏆', label: 'Ranks' },
  { id: 'rewards', icon: '🎁', label: 'Rewards' },
  { id: 'card', icon: '💳', label: 'Card' }
];

export default function BottomNav() {
  const { screen, setScreen } = useAppContext();

  return (
    <div className="hide-scroll" style={{
      position: 'fixed', bottom: 0, width: '100%', maxWidth: '430px',
      background: 'rgba(10, 15, 30, 0.95)', borderTop: '1px solid rgba(255,255,255,0.05)', 
      zIndex: 100, display: 'flex', gap: '10px', padding: '12px 16px', paddingBottom: '24px',
      overflowX: 'auto', backdropFilter: 'blur(12px)'
    }}>
      {NAV_ITEMS.map(nav => {
        const isActive = screen === nav.id;
        return (
          <div key={nav.id} onClick={() => setScreen(nav.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            cursor: 'pointer', opacity: isActive ? 1 : 0.4,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
            minWidth: '60px'
          }}>
            <span style={{ fontSize: '20px', filter: isActive ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.8))' : 'none' }}>
              {nav.icon}
            </span>
            <span className="font-noto" style={{ 
              fontSize: '10px', 
              color: isActive ? 'var(--accent-amber)' : 'var(--text-secondary)',
              fontWeight: isActive ? 'bold' : 'normal'
            }}>
              {nav.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
