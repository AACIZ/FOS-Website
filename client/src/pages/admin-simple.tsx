import { useEffect } from 'react';

export default function AdminSimple() {
  console.log('Admin component rendering');
  
  useEffect(() => {
    // Make body visible (it's hidden by default in CSS)
    document.body.style.visibility = 'visible';
  }, []);
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ff0000', // Red background to make it very visible
      color: 'white', 
      padding: '2rem',
      position: 'relative',
      zIndex: 9999
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '2rem',
        backgroundColor: '#00ff00', // Green background for title
        color: 'black',
        padding: '1rem'
      }}>ADMIN PANEL - VISIBLE TEST</h1>
      <p style={{ fontSize: '1.5rem', backgroundColor: 'blue', padding: '1rem' }}>This should be very visible now!</p>
      <button 
        style={{ 
          backgroundColor: '#ffff00', 
          color: 'black', 
          padding: '1rem 2rem', 
          border: '3px solid black', 
          borderRadius: '0.5rem',
          marginTop: '2rem',
          cursor: 'pointer',
          fontSize: '1.2rem'
        }}
        onClick={() => alert('Button clicked!')}
      >
        CLICK ME - TEST BUTTON
      </button>
    </div>
  );
}