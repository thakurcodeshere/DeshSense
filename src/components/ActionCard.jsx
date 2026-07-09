import React from 'react';
import { useAppContext } from '../context/AppContext';
import { calcCredits } from '../utils/engine';

export default function ActionCard({ action }) {
  const { completedActions, handleActionLog, trustScore } = useAppContext();
  const isDone = completedActions.includes(action.id);
  const credits = calcCredits(action, trustScore);

  return (
    <div 
      onClick={() => !isDone && handleActionLog(action)}
      style={{
        background: isDone ? 'rgba(34, 197, 94, 0.1)' : 'var(--surface-1)',
        border: isDone ? '1px solid var(--accent-green)' : '1px solid rgba(255,255,255,0.1)',
        padding: '24px 16px', borderRadius: '16px', textAlign: 'center',
        cursor: isDone ? 'default' : 'pointer',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        opacity: isDone ? 0.8 : 1,
        boxShadow: isDone ? '0 0 20px rgba(34, 197, 94, 0.2)' : '0 4px 12px rgba(0,0,0,0.3)',
        transform: isDone ? 'scale(0.98)' : 'scale(1)'
      }}>
      <div style={{ fontSize: '38px', marginBottom: '16px', animation: isDone ? 'pop 0.4s' : 'none', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>
        {isDone ? '✅' : action.icon}
      </div>
      <h4 style={{ fontSize: '14px', marginBottom: '12px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1.3 }}>
        {action.name}
      </h4>
      <div style={{
        background: isDone ? 'var(--accent-green)' : 'rgba(15, 23, 42, 0.8)',
        color: isDone ? '#fff' : 'var(--accent-amber)',
        padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold',
        border: isDone ? 'none' : '1px solid rgba(245, 158, 11, 0.3)'
      }}>
        {isDone ? 'COMPLETED' : `+${credits} ⚡`}
      </div>
    </div>
  );
}
