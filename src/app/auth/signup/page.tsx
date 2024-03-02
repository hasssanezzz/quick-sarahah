import SignupForm from '@/components/AuthForms/SignupForm'

function RegisterPage() {
  return (
    <main className="container mx-auto px-5 flex items-center justify-center min-h-screen flex-col gap-10">
      <h3 className="text-4xl sm:text-5xl font-semibold text-center">Signup</h3>
      <SignupForm />
    </main>
  )
}

export default RegisterPage
