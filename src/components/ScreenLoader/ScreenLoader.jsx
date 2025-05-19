import React from 'react';
import styled from 'styled-components';

const ScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-lg font-light">Loading Collection...</p>
      </div>
    </div>
  );
}

export default ScreenLoader;
