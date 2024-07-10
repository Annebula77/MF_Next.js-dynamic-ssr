import React, { useEffect } from 'react';

const ExportedTitle: React.FC = () => {
  console.log('---------loading remote component---------');

  useEffect(() => {
    console.log('HOOKS WORKS');
  }, []);

  return (
    <div className="hero">
      <h1 className="title">
        {' '}
        This came from <code>shop</code> !!!
      </h1>
      <p className="description">And it works like a charm v2</p>
    </div>
  );
};

export default ExportedTitle;
