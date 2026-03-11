import { setupIonicReact } from '@ionic/react'
import '@testing-library/jest-dom'
import { expect } from 'vitest'

setupIonicReact()

// Fix for Stencil Snapshot Pollution
expect.addSnapshotSerializer({
  serialize(val) {
    return val.outerHTML;
  },
  test(val) {
    return val && typeof val === 'object' && val.nodeType === 1;
  },
});
