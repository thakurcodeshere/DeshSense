import React from 'react';
import { useAppContext } from '../context/AppContext';
import { REWARDS } from '../constants';

export default function RewardsScreen() {
  const { civicCredits, handleRewardRedeem, redeemedRewards } = useAppContext();

  return (
    <div className="screen-container">
      <div style={{ textAlign: 'center', marginBottom: '30px', padding: '30px 20px', background: 'var(--surface-1)', borderRadius: '16px', border: '1px solid var(--accent-amber)', boxShadow: 'inset 0 0 40px rgba(245, 158, 11, 0.1)' }}>
        <p className="font-rajdhani" style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '2px' }}>Spendable Balance</p>
        <div className="font-rajdhani" style={{ fontSize: '64px', color: 'var(--accent-amber)', lineHeight: 1, textShadow: '0 4px 20px rgba(245, 158, 11, 0.4)' }}>{civicCredits} ⚡</div>
      </div>

      <h3 className="font-rajdhani" style={{ fontSize: '20px', marginBottom: '16px', color: '#fff' }}>REWARDS CATALOG</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {REWARDS.map(reward => {
          const isRedeemed = redeemedRewards.includes(reward.id);
          const canAfford = civicCredits >= reward.credits;
          return (
            <div key={reward.id} style={{
              display: 'flex', alignItems: 'center', padding: '20px 16px',
              background: 'var(--surface-1)', borderRadius: '16px',
              border: `1px solid ${isRedeemed ? 'var(--accent-green)' : canAfford ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255,255,255,0.05)'}`,
              opacity: canAfford || isRedeemed ? 1 : 0.5,
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s',
              transform: isRedeemed ? 'scale(0.98)' : 'scale(1)'
            }}>
              <div style={{ fontSize: '36px', marginRight: '16px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>{reward.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>{reward.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>by {reward.partner}</div>
              </div>
              <button onClick={() => handleRewardRedeem(reward)} style={{
                background: isRedeemed ? 'var(--accent-green)' : canAfford ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'rgba(0,0,0,0.5)',
                color: isRedeemed || canAfford ? '#fff' : 'var(--text-tertiary)',
                border: isRedeemed || canAfford ? 'none' : '1px solid rgba(255,255,255,0.1)', 
                padding: '10px 18px', borderRadius: '50px',
                fontWeight: 'bold', cursor: isRedeemed || !canAfford ? 'not-allowed' : 'pointer',
                boxShadow: (canAfford && !isRedeemed) ? '0 4px 10px rgba(245, 158, 11, 0.3)' : 'none'
              }}>
                {isRedeemed ? 'USED' : `${reward.credits} ⚡`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
