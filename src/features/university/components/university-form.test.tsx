import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { UniversityForm } from './university-form'

describe('UniversityForm', () => {
  it('should render form fields', () => {
    render(
      <UniversityForm
        onSubmit={jest.fn()}
      />,
    )

    expect(
      screen.getByPlaceholderText(
        'University name',
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText(
        'HCMUTE',
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /save/i,
      }),
    ).toBeInTheDocument()
  })

  it('should submit form', async () => {
    const onSubmit = jest.fn()

    const user = userEvent.setup()

    render(
      <UniversityForm
        onSubmit={onSubmit}
      />,
    )

    await user.type(
      screen.getByPlaceholderText(
        'University name',
      ),
      'HCMUTE',
    )

    await user.type(
      screen.getByPlaceholderText(
        'HCMUTE',
      ),
      'UTE',
    )

    await user.type(
      screen.getByPlaceholderText(
        'SPK',
      ),
      'SPK',
    )

    await user.type(
      screen.getByPlaceholderText(
        'Ho Chi Minh City',
      ),
      'Ho Chi Minh',
    )

    await user.type(
      screen.getByPlaceholderText(
        '1 Vo Van Ngan...',
      ),
      'Vo Van Ngan',
    )

    await user.click(
      screen.getByRole('button', {
        name: /save/i,
      }),
    )

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})