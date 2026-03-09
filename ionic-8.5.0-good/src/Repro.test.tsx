import React from 'react';
import { render } from '@testing-library/react';
import { IonButton } from '@ionic/react';
import { describe, it, expect } from 'vitest';

describe('Stencil Expando Repro - Baseline (8.5.0)', () => {
  it('should NOT reveal internal Stencil properties are enumerable', () => {
    const { container } = render(<IonButton>Test</IonButton>);
    const button = container.querySelector('ion-button');
    
    if (!button) throw new Error('IonButton not found');

    const keys = Object.keys(button);
    const stencilKeys = keys.filter(key => key.startsWith('s-') || key.includes('stencil'));
    
    console.log('Detected internal Stencil properties (Baseline):', stencilKeys);
    
    // In 8.5.0, internal Stencil properties should NOT be enumerable
    expect(stencilKeys).not.toContain('s-p');
    expect(stencilKeys).not.toContain('s-rc');
    expect(stencilKeys).not.toContain('__stencil__getHostRef');
  });

  it('clean snapshot demo', () => {
    const { container } = render(<IonButton>Test</IonButton>);
    // The snapshot should NOT include Stencil expandos
    expect(container.firstChild).toMatchSnapshot();
  });
});
