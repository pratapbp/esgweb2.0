import { Suspense } from "react"
import ResetPasswordPage from "./reset-password-page"

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  )
}
