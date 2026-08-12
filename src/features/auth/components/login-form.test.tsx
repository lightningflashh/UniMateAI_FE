import {
    fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'

import { useLogin } from "@/features/auth/hooks/use-login";
import { LoginForm } from "@/features/auth/components/login-form";

jest.mock(
  "@/features/auth/hooks/use-login",
  () => ({
    useLogin: jest.fn(),
  }),
)

const mockedUseLogin = useLogin as jest.MockedFunction<typeof useLogin>

describe('LoginForm', () => {
  const mutateMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    mockedUseLogin.mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    } as any)
  })

  it('should render login form', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/Địa chỉ Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Mật khẩu/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /Đăng nhập/i,
      }),
    ).toBeInTheDocument()
  })

  it('should show validation errors', async () => {
    render(<LoginForm />)

    fireEvent.click(screen.getByRole('button', { name: /Đăng nhập/i }))

    await waitFor(() => {
      expect(screen.getByText(/Vui lòng nhập địa chỉ email|Invalid email address/i)).toBeInTheDocument()
      expect(screen.getByText(/Vui lòng nhập mật khẩu|Password must be at least 6 characters long/i)).toBeInTheDocument()
    })

    expect(mutateMock).not.toHaveBeenCalled()
  })

  it('should submit form with valid data', async () => {
    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/Địa chỉ Email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/Mật khẩu/i), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: /Đăng nhập/i }))

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  it('should toggle password visibility when toggle button is clicked', () => {
    render(<LoginForm />)
    // 1. Lấy ô input Mật khẩu
    const passwordInput = screen.getByLabelText(/^Mật khẩu$/i)

    // Kiểm tra trạng thái ban đầu: input type là "password" (mật khẩu bị ẩn)
    expect(passwordInput).toHaveAttribute('type', 'password')

    // 2. Tìm nút icon mắt (toggle button)
    // Vì nút icon không chứa text, RTL sẽ coi tên của nó là chuỗi rỗng ''
    const toggleButtons = screen.getAllByRole('button', { name: '' })
    const togglePasswordBtn = toggleButtons[0] // Nút toggle của ô Mật khẩu

    // 3. Click lần 1: Chuyển sang HIỆN mật khẩu (type="text")
    fireEvent.click(togglePasswordBtn)
    expect(passwordInput).toHaveAttribute('type', 'text')

    // 4. Click lần 2: Chuyển lại về ẨN mật khẩu (type="password")
    fireEvent.click(togglePasswordBtn)
    expect(passwordInput).toHaveAttribute('type', 'password')
    })
})