import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'

import { RegisterForm } from '@/features/auth/components/register-form'
import { useRegister } from '@/features/auth/hooks/use-register'

jest.mock(
  '@/features/auth/hooks/use-register',
  () => ({
    useRegister: jest.fn(),
  }),
)

const mockedUseRegister = useRegister as jest.MockedFunction<typeof useRegister>

describe('RegisterForm', () => {
  const mutateMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    mockedUseRegister.mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    } as any)
  })

  it('should render register form', () => {
    render(<RegisterForm />)

    expect(
      screen.getByLabelText(/Họ và tên/i),
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText(/Địa chỉ Email/i),
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText(/^Mật khẩu$/i),
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText(/Xác nhận mật khẩu/i),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /Đăng ký tài khoản/i,
      }),
    ).toBeInTheDocument()
  })

  it('should show validation errors', async () => {
    render(<RegisterForm />)

    fireEvent.click(
      screen.getByRole('button', {
        name: /Đăng ký tài khoản/i,
      }),
    )

    await waitFor(() => {
      // Lưu ý: Đảm bảo chuỗi thông báo lỗi trùng khớp với registerSchema (Zod) của bạn
      expect(
        screen.getByText(
          /Full name must be at least 2 characters|Họ và tên phải có ít nhất/i,
        ),
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          /Invalid email address|Email không hợp lệ/i,
        ),
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          /Password must be at least 8 characters|Mật khẩu phải có ít nhất/i,
        ),
      ).toBeInTheDocument()
    })

    expect(mutateMock).not.toHaveBeenCalled()
  })

  it('should show error when passwords do not match', async () => {
    render(<RegisterForm />)

    fireEvent.change(
      screen.getByLabelText(/Họ và tên/i),
      {
        target: {
          value: 'John Doe',
        },
      },
    )

    fireEvent.change(
      screen.getByLabelText(/Địa chỉ Email/i),
      {
        target: {
          value: 'john@example.com',
        },
      },
    )

    fireEvent.change(
      screen.getByLabelText(/^Mật khẩu$/i),
      {
        target: {
          value: 'password123',
        },
      },
    )

    fireEvent.change(
      screen.getByLabelText(/Xác nhận mật khẩu/i),
      {
        target: {
          value: 'password456',
        },
      },
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: /Đăng ký tài khoản/i,
      }),
    )

    await waitFor(() => {
      expect(
        screen.getByText(
          /Passwords do not match|Mật khẩu không khớp/i,
        ),
      ).toBeInTheDocument()
    })

    expect(mutateMock).not.toHaveBeenCalled()
  })

  it('should submit correct data', async () => {
    render(<RegisterForm />)

    fireEvent.change(
      screen.getByLabelText(/Họ và tên/i),
      {
        target: {
          value: 'John Doe',
        },
      },
    )

    fireEvent.change(
      screen.getByLabelText(/Địa chỉ Email/i),
      {
        target: {
          value: 'john@example.com',
        },
      },
    )

    fireEvent.change(
      screen.getByLabelText(/^Mật khẩu$/i),
      {
        target: {
          value: 'password123',
        },
      },
    )

    fireEvent.change(
      screen.getByLabelText(/Xác nhận mật khẩu/i),
      {
        target: {
          value: 'password123',
        },
      },
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: /Đăng ký tài khoản/i,
      }),
    )

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      })
    })
  })

  it('should disable submit button while registering', () => {
    mockedUseRegister.mockReturnValue({
      mutate: mutateMock,
      isPending: true,
    } as any)

    render(<RegisterForm />)

    const button = screen.getByRole('button', {
      name: /Đang khởi tạo tài khoản/i,
    })

    expect(button).toBeDisabled()
  })

  it('should toggle password visibility when eye icon button is clicked', () => {
    render(<RegisterForm />)

    const passwordInput = screen.getByLabelText(/^Mật khẩu$/i)
    const toggleButtons = screen.getAllByRole('button', { name: '' }) 

    // Mặc định là type="password"
    expect(passwordInput).toHaveAttribute('type', 'password')

    // Nút toggle đầu tiên thuộc trường Mật khẩu
    fireEvent.click(toggleButtons[0])
    expect(passwordInput).toHaveAttribute('type', 'text')

    // Click lại để ẩn mật khẩu
    fireEvent.click(toggleButtons[0])
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should toggle confirm password visibility when eye icon button is clicked', () => {
    render(<RegisterForm />)

    const confirmPasswordInput = screen.getByLabelText(/Xác nhận mật khẩu/i)
    const toggleButtons = screen.getAllByRole('button', { name: '' })

    // Mặc định là type="password"
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')

    // Nút toggle thứ hai thuộc trường Xác nhận mật khẩu
    fireEvent.click(toggleButtons[1])
    expect(confirmPasswordInput).toHaveAttribute('type', 'text')

    // Click lại để ẩn
    fireEvent.click(toggleButtons[1])
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
  })

  it('should render link to login page with correct href', () => {
    render(<RegisterForm />)

    const loginLink = screen.getByRole('link', { name: /Đăng nhập ngay/i })

    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/login')
  })
})