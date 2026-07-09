import React from 'react';
import ActionCard from '../components/ActionCard';
import { ACTIONS } from '../constants';

export default function ActionsScreen() {
  return (
    <div className="screen-container">
      <div style={{ marginBottom: '32px' }}>
        <h2 className="font-rajdhani" style={{ fontSize: '32px', color: 'var(--accent-amber)', letterSpacing: '1px' }}>LOG ACTION</h2>
        <p className="font-noto" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Select a civic action you've performed today. GPS validation module is armed.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {ACTIONS.map(action => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
}
