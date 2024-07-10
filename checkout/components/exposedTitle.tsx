import React, { useEffect } from 'react';
import styles from './sample.module.css';

const ExposedTitle = () => {
  console.log('---------loading remote component---------');
  useEffect(() => {
    console.log('HOOKS WORKS');
  }, []);
  return (
    <div className="hero">
      <h1 className={'title ' + styles.thing}>
        This came from <code>checkout</code> !!!
      </h1>
      <p className="description">And it works like a charm v2</p>
    </div>
  );
};

export default ExposedTitle;

