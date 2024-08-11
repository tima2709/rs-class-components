'use client';
import React from 'react';
import Result from '../../src/components/result/result';

const Index: React.FC = () => {
  return (
    <>
      <div style={{ display: 'flex', gap: '50px', justifyContent: 'center' }}>
        <div style={{ width: '260px' }}>
          <Result />
        </div>
      </div>
    </>
  );
};

export default Index;
