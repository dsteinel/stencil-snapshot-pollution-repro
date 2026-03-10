import { expect } from 'vitest';
import { setupIonicReact } from '@ionic/react';
import '@testing-library/jest-dom';

setupIonicReact();

// Global fix for Stencil internal property pollution in snapshots and logs
expect.addSnapshotSerializer({
  test: (val) => val instanceof HTMLElement,
  serialize: (val: HTMLElement, config, indentation, depth, refs, printer) => {
    // cloneNode(true) is perfect here because it copies the DOM structure 
    // but NOT the enumerable expando properties like s-p or __reactFiber.
    const clone = val.cloneNode(true);
    return printer(clone, config, indentation, depth, refs);
  },
});
