import { IonButton } from '@ionic/react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('Stencil Expando Repro - Baseline (8.5.0)', () => {
  it('should verify toHaveTextContent behavior', () => {
    const { container } = render(<IonButton>Test</IonButton>)
    const button = container.querySelector('ion-button')
    expect(button).toHaveTextContent('Test')
  })
})
