import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/components/form/LoginForm";

export const metadata = {
  title: "Lintask - Login",
  description:
    "Sistem rekap penjualan lintas platform yang menggabungkan semua order ke satu layar tanpa proses manual.",
};

export default function Login() {
  const fields = [
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Masukkan email anda",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Masukkan password anda",
      required: true,
    },
  ];

  return (
    <AuthLayout title="Masuk ke akun Lintask Anda">
      <LoginForm
        fields={fields}
        buttonText="Masuk"
        answerLink="/register"
        answerText="Belum"
        ctaText="Daftar"
      />
    </AuthLayout>
  );
}
