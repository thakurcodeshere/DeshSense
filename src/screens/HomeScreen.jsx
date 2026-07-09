import React from 'react';
import { useAppContext } from '../context/AppContext';
import { getRank, fmtN } from '../utils/engine';
import { RANKS, ACTIVITY_FEED, MISSIONS } from '../constants';

export default function HomeScreen() {
  const { civicScore, civicCredits, totalActions, trustScore } = useAppContext();
  const rank = getRank(civicScore);
  const nextRank = RANKS.find(r => r.level === rank.level + 1);
  const progress = nextRank ? ((civicScore - rank.range[0]) / (rank.range[1] - rank.range[0])) * 100 : 100;

  return (
    <div className="screen-container">
      <div style={{
        background: 'var(--surface-1)', padding: '20px', borderRadius: '16px',
        border: `1px solid ${rank.color}33`, marginBottom: '20px',
        boxShadow: rank.level >= 8 ? `0 0 15px ${rank.color}40` : 'none',
        animation: rank.level >= 8 ? 'glow 3s infinite' : 'fadeUp 0.4s ease-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 className="font-rajdhani" style={{ fontSize: '24px', color: rank.color, marginBottom: '4px' }}>{rank.name}</h2>
            <p className="font-noto" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Bharat Citizen • Sector 01</p>
          </div>
          <div style={{ fontSize: '40px', animation: 'float 4s ease-in-out infinite' }}>
            {rank.level >= 8 ? '👑' : '⭐'}
          </div>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.3)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ background: `linear-gradient(90deg, ${rank.color}, var(--accent-amber))`, height: '100%', width: `${progress}%` }} />
        </div>
        <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'right' }}>
          {nextRank ? `${fmtN(nextRank.range[0] - civicScore)} pts to ${nextRank.name}` : 'Max Rank Achieved!'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Credits', val: civicCredits, icon: '⚡', color: 'var(--accent-amber)' },
          { label: 'Actions', val: totalActions, icon: '✅', color: 'var(--accent-green)' },
          { label: 'Trust', val: trustScore.toFixed(1), icon: '🔒', color: 'var(--accent-blue)' }
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'var(--surface-1)', padding: '16px 12px', borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>{stat.icon}</div>
            <div className="font-rajdhani" style={{ fontSize: '20px', color: stat.color }}>{stat.val}</div>
            <div className="font-noto" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <h3 className="font-rajdhani" style={{ fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)', animation: 'pulse 1.5s infinite' }} />
        LIVE CIVIC FEED
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {ACTIVITY_FEED.map(item => {
          const itemRank = RANKS.find(r => r.level === item.rankLevel);
          return (
            <div key={item.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
              background: 'var(--surface-1)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid ${itemRank.color}`, fontWeight: 'bold'
              }}>
                {item.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name} <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)', fontSize: '12px' }}>did</span></p>
                <p style={{ fontSize: '13px', color: 'var(--accent-green)' }}>{item.action}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--accent-amber)', fontSize: '14px', fontWeight: 'bold' }}>+{item.credits} ⚡</div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>{item.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="font-rajdhani" style={{ fontSize: '18px', marginBottom: '12px' }}>ACTIVE MISSIONS</h3>
      <div className="hide-scroll" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
        {MISSIONS.map(mission => (
          <div key={mission.id} style={{
            minWidth: '240px', background: 'linear-gradient(135deg, var(--surface-1), var(--surface-2))',
            padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>{mission.icon}</div>
            <h4 style={{ fontSize: '15px', marginBottom: '8px', lineHeight: 1.2 }}>{mission.title}</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <span>🏃 {fmtN(mission.participants)} joined</span>
              <span style={{ color: 'var(--accent-red)' }}>⏱️ {mission.deadline}</span>
            </div>
            <button style={{
              width: '100%', padding: '10px', borderRadius: '8px', border: 'none',
              background: 'linear-gradient(135deg, #F59E0B, #EF4444)', color: '#fff',
              fontWeight: 'bold', cursor: 'pointer', transition: '0.2s',
            }}>
              JOIN +{mission.bonus} ⚡
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
