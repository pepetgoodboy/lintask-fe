import AuthLayout from "@/components/layout/AuthLayout";
import RegisterForm from "@/components/form/RegisterForm";

export const metadata = {
  title: "Lintask - Register",
  description:
    "Sistem rekap penjualan lintas platform yang menggabungkan semua order ke satu layar tanpa proses manual.",
};

export default function Login() {
  const fields = [
    {
      label: "Name",
      type: "text",
      name: "name",
      placeholder: "Masukkan nama anda",
      required: true,
    },
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
    <AuthLayout title="Daftar akun Lintask Anda">
      <RegisterForm
        fields={fields}
        buttonText="Daftar"
        answerLink="/login"
        answerText="Sudah"
        ctaText="Masuk"
      />
    </AuthLayout>
  );
}
