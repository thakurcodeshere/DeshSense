import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function Toast() {
  const { toast } = useAppContext();
  if (!toast) return null;
  
  const isSuccess = toast.type === 'success';
  return (
    <div style={{
      position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)',
      background: isSuccess ? 'linear-gradient(135deg, var(--accent-green), #14532D)' : 'linear-gradient(135deg, var(--accent-red), #7F1D1D)',
      color: '#fff', padding: '14px 28px', borderRadius: '50px',
      fontWeight: '600', zIndex: 1000, animation: 'slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      boxShadow: `0 8px 24px ${isSuccess ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
      whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.2)'
    }} className="font-noto">
      {toast.msg}
    </div>
  );
}
