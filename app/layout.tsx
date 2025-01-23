import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Simple Chat App',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
