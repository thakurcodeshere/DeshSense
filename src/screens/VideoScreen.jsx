import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { fmtN, getRank } from '../utils/engine';
import { VIDEOS, RANKS } from '../constants';

const VideoScreen = React.memo(() => {
  const { setCivicScore, setCivicCredits, setScreen, showToast } = useAppContext();
  const [view, setView] = useState('feed'); 
  const [feedIdx, setFeedIdx] = useState(0);
  const [studioStep, setStudioStep] = useState('capture'); 
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intv;
    if (view === 'feed') {
      setProgress(0);
      intv = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 2));
      }, 100);
    }
    return () => clearInterval(intv);
  }, [view, feedIdx]);

  const currentVid = VIDEOS[feedIdx];

  const handleLike = () => {
    setCivicScore(s => s + 5);
    showToast('+5 ⚡ for supporting civic action!', 'success');
  };

  const handlePublish = () => {
    const est = 120; 
    setCivicScore(s => s + (est * 3));
    setCivicCredits(c => c + est);
    showToast(`Published! You earned ${est} ⚡`, 'success');
    setView('feed');
    setStudioStep('capture');
  };

  if (view === 'studio') {
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#000', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', maxWidth: '430px', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setView('feed')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}>✕</button>
          <div className="font-bebas" style={{ color: '#fff', fontSize: '24px' }}>CIVIC STUDIO</div>
          <div style={{ width: '24px' }}></div>
        </div>
        
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {studioStep === 'capture' && (
            <>
              <div style={{ position: 'absolute', top: '10%', right: '10px', display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '24px' }}>
                <span>⚡</span><span>⏱️</span><span>✨</span>
              </div>
              <div style={{ width: '100%', height: '100%', border: '2px solid rgba(255,255,255,0.1)', borderTopWidth: '33vh', borderBottomWidth: '33vh' }}></div>
              <div style={{ position: 'absolute', bottom: '100px', display: 'flex', alignItems: 'center', gap: '40px' }}>
                <div style={{ fontSize: '30px' }}>🖼️</div>
                <div onClick={() => setStudioStep('edit')} style={{
                  width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-red)',
                  border: '4px solid #fff', outline: '4px solid rgba(255,255,255,0.3)', cursor: 'pointer',
                  animation: 'recRing 2s infinite'
                }} />
                <div style={{ fontSize: '30px' }}>🔄</div>
              </div>
            </>
          )}

          {studioStep === 'edit' && (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1E293B, #0F172A)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', animation: 'float 3s infinite' }}>🎥 PREVIEW</div>
              <div style={{ height: '300px', background: 'var(--bg-dark)', borderRadius: '24px 24px 0 0', padding: '20px' }}>
                <div className="hide-scroll" style={{ display: 'flex', gap: '20px', overflowX: 'auto', marginBottom: '40px' }}>
                  {['🎨 Filters', '✍️ Text', '😄 Stickers', '🎵 Music', '🎭 GIFs'].map(t => (
                    <div key={t} style={{ padding: '8px 16px', background: 'var(--surface-1)', borderRadius: '20px', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.1)' }}>{t}</div>
                  ))}
                </div>
                <button onClick={() => setStudioStep('publish')} style={{
                  width: '100%', padding: '16px', background: 'var(--accent-amber)', color: '#000',
                  border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer'
                }}>NEXT 🚀</button>
              </div>
            </div>
          )}

          {studioStep === 'publish' && (
            <div style={{ width: '100%', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <textarea placeholder="Describe your civic action... #SwachhBharat" style={{
                width: '100%', height: '150px', background: 'var(--surface-1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                padding: '16px', color: '#fff', fontSize: '16px', marginBottom: '20px', fontFamily: 'inherit', resize: 'none'
              }}></textarea>
              <div style={{ background: 'var(--surface-1)', padding: '16px', borderRadius: '12px', marginBottom: 'auto', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                   <span style={{ color: 'var(--text-secondary)' }}>Visibility:</span> <span>Everyone 🌍</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-amber)' }}>
                   <span style={{ color: 'var(--text-secondary)' }}>Est. Reward:</span> <span className="font-rajdhani" style={{ fontSize: '24px' }}>~120 ⚡</span>
                </div>
              </div>
              <button onClick={handlePublish} style={{
                  width: '100%', padding: '18px', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', color: '#fff',
                  border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer', letterSpacing: '1px'
              }}>🇮🇳 PUBLISH CIVIC VIDEO</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const userRankColor = RANKS.find(r=>r.level===currentVid.rankLevel).color;

  return (
    <div style={{ width: '100vw', height: '100vh', background: currentVid.bg, position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', maxWidth: '430px', zIndex: 1000, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, height: '3px', background: 'linear-gradient(90deg, #F59E0B, #EF4444)', width: `${progress}%`, transition: 'width 0.1s linear', zIndex: 10 }}></div>
      
      <div style={{ position: 'absolute', top: '20px', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 20px', zIndex: 10 }}>
        <button onClick={() => setScreen('home')} style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '50px', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '14px', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>← App</button>
        <div className="font-bebas" style={{ fontSize: '32px', color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>🇮🇳 CIVICFEED</div>
        <div style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>🔍</div>
      </div>
      
      <div className="hide-scroll" style={{ position: 'absolute', top: '75px', left: 0, width: '100%', display: 'flex', gap: '12px', padding: '0 20px', overflowX: 'auto', zIndex: 10 }}>
        {['All', 'Beach Cleanup', 'Tutorial', 'Recycling', 'Education'].map(c => (
          <div key={c} style={{ padding: '6px 16px', background: 'rgba(0,0,0,0.5)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', color: c === currentVid.category ? 'var(--accent-amber)' : '#fff', whiteSpace: 'nowrap', backdropFilter: 'blur(4px)' }}>
            {c}
          </div>
        ))}
      </div>

      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '140px', opacity: 0.9, filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.3))' }}>
        {currentVid.emoji}
      </div>

      <div style={{ position: 'absolute', right: '16px', bottom: '120px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 10 }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#fff', border: `3px solid ${userRankColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
          <span className="font-rajdhani" style={{ color: '#000', fontWeight: 'bold', fontSize: '20px' }}>{currentVid.name.charAt(0)}</span>
          <div style={{ position: 'absolute', bottom: '-10px', background: 'var(--accent-red)', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: '2px solid #fff' }}>+</div>
        </div>
        <div onClick={handleLike} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ fontSize: '36px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))' }}>❤️</span>
          <span style={{ fontSize: '13px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{fmtN(currentVid.likes)}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '36px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))' }}>💬</span>
          <span style={{ fontSize: '13px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{fmtN(currentVid.comments)}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '36px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))' }}>↗️</span>
          <span style={{ fontSize: '13px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Share</span>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '90px', left: '20px', width: '75%', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '18px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{currentVid.user}</span>
          {currentVid.verified && <span style={{ color: '#3B82F6', background: '#fff', borderRadius: '50%', width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</span>}
        </div>
        <p className="font-noto" style={{ fontSize: '15px', marginBottom: '12px', textShadow: '0 2px 4px rgba(0,0,0,0.8)', lineHeight: 1.4 }}>{currentVid.caption}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.4)', padding: '6px 12px', borderRadius: '20px', width: 'max-content', backdropFilter: 'blur(4px)' }}>
          <span style={{ animation: 'spin 4s linear infinite', fontSize: '14px' }}>🎵</span>
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{currentVid.audio}</span>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '70px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(15px)', zIndex: 10 }}>
        <button onClick={() => setView('feed')} style={{ background: 'none', border: 'none', color: view==='feed'?'#fff':'#888', fontWeight: 'bold', fontSize: '16px' }}>Feed</button>
        <button onClick={() => setView('studio')} style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)', border: 'none', color: '#fff', width: '54px', height: '36px', borderRadius: '14px', fontWeight: 'bold', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(245,158,11,0.4)' }}>+</button>
        <button onClick={() => setView('discover')} style={{ background: 'none', border: 'none', color: view==='discover'?'#fff':'#888', fontWeight: 'bold', fontSize: '16px' }}>Discover</button>
      </div>

      <div 
        onClick={() => setFeedIdx((feedIdx + 1) % VIDEOS.length)}
        style={{ position: 'absolute', top: '100px', left: 0, width: '70%', height: 'calc(100vh - 200px)', zIndex: 5 }} 
      />
    </div>
  );
});

export default VideoScreen;
