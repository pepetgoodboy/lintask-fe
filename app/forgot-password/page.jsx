import AuthLayout from "@/components/layout/AuthLayout";
import ForgotPassForm from "@/components/form/ForgotPassForm";

export const metadata = {
  title: "Lintask - Forgot Password",
  description:
    "Sistem rekap penjualan lintas platform yang menggabungkan semua order ke satu layar tanpa proses manual.",
};

export default function ForgotPassword() {
  const fields = [
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Masukkan email anda",
      required: true,
    },
  ];

  return (
    <AuthLayout title="Lupa Password">
      <ForgotPassForm fields={fields} buttonText="Kirim Link Reset" />
    </AuthLayout>
  );
}
