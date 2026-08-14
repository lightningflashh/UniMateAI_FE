import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { RecommendationForm } from '@/features/recommendation/components/recommendation-form'
import { useAdmissionMethods } from '@/features/admission/hooks/use-admission-methods'
import { useMajorGroups } from '@/features/major/hooks/use-major-groups'

jest.mock(
  '@/features/admission/hooks/use-admission-methods',
  () => ({
    useAdmissionMethods: jest.fn(),
  }),
)

jest.mock(
  '@/features/major/hooks/use-major-groups',
  () => ({
    useMajorGroups: jest.fn(),
  }),
)

const mockUseAdmissionMethods =
  useAdmissionMethods as jest.MockedFunction<
    typeof useAdmissionMethods
  >

const mockUseMajorGroups =
  useMajorGroups as jest.MockedFunction<
    typeof useMajorGroups
  >

describe('RecommendationForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    mockUseAdmissionMethods.mockReturnValue({
      data: {
        items: [
          {
            id: 'method-1',
            code: 'THPT',
            name: 'High School Graduation Exam',
          },
          {
            id: 'method-2',
            code: 'HOC_BA',
            name: 'Academic Transcript',
          },
        ],
      },
      isLoading: false,
    } as ReturnType<
      typeof useAdmissionMethods
    >)

    mockUseMajorGroups.mockReturnValue({
      data: {
        items: [
          {
            id: 'group-1',
            code: 'CNTT',
            name: 'Information Technology',
          },
          {
            id: 'group-2',
            code: 'KD',
            name: 'Business',
          },
          {
            id: 'group-3',
            code: 'KT',
            name: 'Engineering',
          },
        ],
      },
      isLoading: false,
    } as ReturnType<
      typeof useMajorGroups
    >)
  })

  it('should render the form', () => {
    render(
      <RecommendationForm
        onSubmit={mockOnSubmit}
        isPending={false}
      />,
    )

    expect(
      screen.getByText(
        'Find Your Best Matches',
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText('Your Score'),
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText('Admission Year'),
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText(
        'Admission Method',
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText('Major Group'),
    ).toBeInTheDocument()
  })

  it('should render admission methods from API', async () => {
    const user = userEvent.setup()

    render(
      <RecommendationForm
        onSubmit={mockOnSubmit}
        isPending={false}
      />,
    )

    await user.click(
      screen.getByRole('combobox', {
        name: 'Admission Method',
      }),
    )

    expect(
      screen.getByText(
        'High School Graduation Exam',
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        'Academic Transcript',
      ),
    ).toBeInTheDocument()
  })

  it('should render major groups from API', async () => {
    const user = userEvent.setup()

    render(
      <RecommendationForm
        onSubmit={mockOnSubmit}
        isPending={false}
      />,
    )

    await user.click(
      screen.getByRole('combobox', {
        name: 'Major Group',
      }),
    )

    expect(
      screen.getByText(
        'Information Technology',
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Business'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Engineering'),
    ).toBeInTheDocument()
  })

  it('should submit valid form data', async () => {
    const user = userEvent.setup()

    render(
      <RecommendationForm
        onSubmit={mockOnSubmit}
        isPending={false}
      />,
    )

    // Score
    const scoreInput =
      screen.getByLabelText('Your Score')

    await user.clear(scoreInput)

    await user.type(
      scoreInput,
      '26.5',
    )

    // Admission method
    await user.click(
      screen.getByRole('combobox', {
        name: 'Admission Method',
      }),
    )

    await user.click(
      screen.getByText(
        'High School Graduation Exam',
      ),
    )

    // Submit
    await user.click(
      screen.getByRole('button', {
        name: 'Get Recommendations',
      }),
    )

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        score: 26.5,
        year: 2026,
        admissionMethodId:
          'method-1',
        majorGroupId: '',
      })
    })
  })

  it('should submit selected major group', async () => {
    const user = userEvent.setup()

    render(
      <RecommendationForm
        onSubmit={mockOnSubmit}
        isPending={false}
      />,
    )

    const scoreInput =
      screen.getByLabelText('Your Score')

    await user.clear(scoreInput)

    await user.type(
      scoreInput,
      '27',
    )

    // Admission method
    await user.click(
      screen.getByRole('combobox', {
        name: 'Admission Method',
      }),
    )

    await user.click(
      screen.getByText(
        'High School Graduation Exam',
      ),
    )

    // Major group
    await user.click(
      screen.getByRole('combobox', {
        name: 'Major Group',
      }),
    )

    await user.click(
      screen.getByText(
        'Information Technology',
      ),
    )

    // Submit
    await user.click(
      screen.getByRole('button', {
        name: 'Get Recommendations',
      }),
    )

    await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })

    expect(mockOnSubmit).toHaveBeenCalledWith({
        score: 27,
        year: 2026,
        admissionMethodId: 'method-1',
        majorGroupId: 'group-1',
    })
  })

  it('should show validation error when admission method is missing', async () => {
    const user = userEvent.setup()

    render(
      <RecommendationForm
        onSubmit={mockOnSubmit}
        isPending={false}
      />,
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Get Recommendations',
      }),
    )

    await waitFor(() => {
      expect(
        screen.getByText(
          'Please select an admission method',
        ),
      ).toBeInTheDocument()
    })

    expect(
      mockOnSubmit,
    ).not.toHaveBeenCalled()
  })

  it('should disable button when pending', () => {
    render(
      <RecommendationForm
        onSubmit={mockOnSubmit}
        isPending={true}
      />,
    )

    const button =
      screen.getByRole('button', {
        name: 'Finding recommendations...',
      })

    expect(button).toBeDisabled()
  })

  it('should show loading state for admission methods', () => {
    mockUseAdmissionMethods.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as ReturnType<
      typeof useAdmissionMethods
    >)

    render(
      <RecommendationForm
        onSubmit={mockOnSubmit}
        isPending={false}
      />,
    )

    expect(
      screen.getByText('Loading...'),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('combobox', {
        name: 'Admission Method',
      }),
    ).toBeDisabled()
  })

  it('should show loading state for major groups', () => {
    mockUseMajorGroups.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as ReturnType<
      typeof useMajorGroups
    >)

    render(
      <RecommendationForm
        onSubmit={mockOnSubmit}
        isPending={false}
      />,
    )

    expect(
      screen.getByRole('combobox', {
        name: 'Major Group',
      }),
    ).toBeDisabled()
  })
})