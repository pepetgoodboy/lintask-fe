"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import InputAuth from "@/components/ui/input/InputAuth";
import { loginUser } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import ButtonAuth from "../ui/button/ButtonAuth";

export default function LoginForm({
  fields,
  buttonText,
  answerLink,
  answerText,
  ctaText,
}) {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () =>
    setFormData({
      email: "",
      password: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(formData);
      setAccessToken(response.data.accessToken);
      toast.success("Login berhasil!");
      router.push("/dashboard");
      resetForm();
    } catch (err) {
      toast.error(err.message);
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <InputAuth
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name]}
            onChange={onChange}
          />
        ))}

        <div className="text-right">
          <a
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Lupa password?
          </a>
        </div>

        <ButtonAuth buttonText={buttonText} loading={loading} />
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-zinc-500">{answerText} punya akun?</span>{" "}
        <a
          href={answerLink}
          className="font-medium text-secondary hover:underline"
        >
          {ctaText} sekarang
        </a>
      </div>
    </div>
  );
}
