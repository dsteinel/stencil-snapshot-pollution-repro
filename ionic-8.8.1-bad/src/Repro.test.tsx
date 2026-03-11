import { IonButton } from '@ionic/react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('Stencil Expando Repro', () => {
  it('should verify toHaveTextContent behavior', () => {
    const { container } = render(<IonButton>Test</IonButton>)
    console.log('HTML in 8.8.1:', container.innerHTML)
    const button = container.querySelector('ion-button')

    expect(button).toMatchSnapshot()
    expect(button).toHaveTextContent('Test')
    expect(button).toBeVisible()
  })
})
