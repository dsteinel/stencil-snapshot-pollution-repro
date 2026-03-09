import { IonButton } from '@ionic/react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('Stencil Expando Repro', () => {
  it('should demonstrate enumerable Stencil internal properties', () => {
    const { container } = render(<IonButton>Test</IonButton>)
    const button = container.querySelector('ion-button')

    if (!button) throw new Error('IonButton not found')

    const keys = Object.keys(button)
    const stencilKeys = keys.filter(
      (key) => key.startsWith('s-') || key.includes('stencil'),
    )

    console.log('Detected internal Stencil properties:', stencilKeys)

    // This is the core issue: these properties are now enumerable
    // and thus pollute snapshots and object serializations.
    expect(stencilKeys).toContain('s-p')
    expect(stencilKeys).toContain('s-rc')
    expect(stencilKeys).toContain('__stencil__getHostRef')
  })

  it('should verify toHaveTextContent behavior', () => {
    const { container } = render(<IonButton>Test</IonButton>)
    const button = container.querySelector('ion-button')
    expect(button).toHaveTextContent('Test')
  })
})
