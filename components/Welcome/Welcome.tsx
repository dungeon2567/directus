import React from 'react';

export function Welcome() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Welcome to{' '}
        <span style={{ background: 'linear-gradient(to right, pink, yellow)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          Supabase App
        </span>
      </h1>
      <p style={{ color: '#6c757d', fontSize: '1.125rem', maxWidth: '580px', margin: '1rem auto' }}>
        This starter Next.js project includes a minimal setup for server-side rendering. To learn
        more about integrating Next.js with other tools, explore the{' '}
        <a href="#" style={{ fontSize: '1.125rem', color: '#007bff', textDecoration: 'none' }}>
          documentation
        </a>
        . To get started, edit the <code>page.tsx</code> file.
      </p>
    </div>
  );
}