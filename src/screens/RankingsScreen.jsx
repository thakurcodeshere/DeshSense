import React from 'react';
import { useAppContext } from '../context/AppContext';
import { getRank, fmtN } from '../utils/engine';
import { LEADERBOARD, RANKS } from '../constants';

export default function RankingsScreen() {
  const { civicScore } = useAppContext();
  const rank = getRank(civicScore);

  return (
    <div className="screen-container">
      <h2 className="font-rajdhani" style={{ fontSize: '28px', marginBottom: '20px', textAlign: 'center' }}>NATIONAL RANKINGS</h2>
      
      <div style={{
        background: `linear-gradient(135deg, var(--surface-1), ${rank.color}22)`,
        padding: '24px', borderRadius: '16px', border: `1px solid ${rank.color}88`,
        marginBottom: '30px', textAlign: 'center', boxShadow: `0 8px 30px ${rank.color}30`
      }}>
        <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Position</h3>
        <div className="font-rajdhani" style={{ fontSize: '56px', color: rank.color, lineHeight: 1, textShadow: `0 0 15px ${rank.color}80` }}>#47</div>
        <div style={{ fontSize: '16px', marginTop: '8px' }}>Bharat Citizen • {rank.name}</div>
      </div>

      <h3 className="font-rajdhani" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--accent-amber)' }}>TOP GUARDIANS</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
        {LEADERBOARD.map((user, idx) => (
          <div key={user.id} style={{
            display: 'flex', alignItems: 'center', gap: '16px', padding: '16px',
            background: 'rgba(30, 41, 59, 0.6)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>
            <div className="font-rajdhani" style={{ fontSize: '24px', fontWeight: 'bold', width: '20px', color: idx < 3 ? 'var(--accent-amber)' : 'var(--text-primary)' }}>{idx + 1}</div>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #B45309)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)'
            }}>{user.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{user.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{user.city}</div>
            </div>
            <div className="font-rajdhani" style={{ color: 'var(--accent-amber)', fontSize: '20px', fontWeight: 'bold' }}>
              {fmtN(user.score)}
            </div>
          </div>
        ))}
      </div>
      
      <h3 className="font-rajdhani" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--accent-amber)' }}>HONOR RANKS</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {RANKS.slice().reverse().map(r => {
          const unlocked = civicScore >= r.range[0];
          return (
            <div key={r.level} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px', borderRadius: '12px', background: unlocked ? 'var(--surface-1)' : 'rgba(0,0,0,0.2)',
              borderLeft: `4px solid ${r.color}`, opacity: unlocked ? 1 : 0.4,
              transition: 'all 0.3s'
            }}>
              <div>
                <span style={{ fontWeight: 'bold', fontSize: '16px', color: unlocked ? '#fff' : 'var(--text-secondary)' }}>{r.name}</span>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{fmtN(r.range[0])}+ pts</div>
              </div>
              {unlocked && <span style={{ color: 'var(--accent-green)', filter: 'drop-shadow(0 0 5px var(--accent-green))', fontSize: '18px' }}>✓</span>}
            </div>
          )
        })}
      </div>
    </div>
  );
}
