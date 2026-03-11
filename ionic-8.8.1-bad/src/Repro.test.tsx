import { IonButton } from '@ionic/react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('Stencil Expando Repro', () => {
  it('should verify toHaveTextContent behavior', () => {
    const { container } = render(<IonButton>Test</IonButton>)
    const button = container.querySelector('ion-button')
    
    // Now this will only snapshot the HTML string
    expect(button).toMatchSnapshot()
    expect(button).toHaveTextContent('Test')
  })
})
