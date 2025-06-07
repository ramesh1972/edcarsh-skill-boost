import React from 'react';

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
  padding: '2rem 3rem',
  zIndex: 1000,
  minWidth: '320px',
  minHeight: '120px',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.25)',
  zIndex: 999,
};

const CenterModal = ({ children, onClose }) => (
  <>
    <div style={overlayStyle} onClick={onClose} />
    <div style={modalStyle}>
      {children}
      <button style={{ marginTop: 24 }} onClick={onClose}>Close</button>
    </div>
  </>
);

export default CenterModal;
