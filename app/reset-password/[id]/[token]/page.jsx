import AuthLayout from "@/components/layout/AuthLayout";
import ResetPassForm from "@/components/form/ResetPassForm";

export const metadata = {
  title: "Lintask - Reset Password",
  description:
    "Sistem rekap penjualan lintas platform yang menggabungkan semua order ke satu layar tanpa proses manual.",
};

export default function ResetPassword() {
  const fields = [
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Masukkan password baru anda",
      required: true,
    },
  ];

  return (
    <AuthLayout title="Reset Password">
      <ResetPassForm fields={fields} buttonText="Reset Password" />
    </AuthLayout>
  );
}
