import LoginForm from '@/components/AuthForms/LoginForm'

function LoginPage() {
  return (
    <main className="container mx-auto px-5 flex items-center justify-center pt-10 flex-col gap-10">
      <h3 className="text-4xl sm:text-5xl font-semibold text-center">Login</h3>
      <LoginForm />
    </main>
  )
}

export default LoginPage
