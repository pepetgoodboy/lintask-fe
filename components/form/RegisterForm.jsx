"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import InputAuth from "@/components/ui/input/InputAuth";
import { registerUser, verifUser } from "@/lib/api/auth";
import ButtonAuth from "../ui/button/ButtonAuth";

export default function RegisterForm({
  fields,
  buttonText,
  answerLink,
  answerText,
  ctaText,
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verifPage, setVerifPage] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---- VERIFICATION CODE STATES ----
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [timeLeft, setTimeLeft] = useState(600);

  // Countdown
  useEffect(() => {
    if (!verifPage) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [verifPage]);

  const formattedTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle typing
  const handleCodeChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Backspace navigate
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const resetForm = () =>
    setFormData({
      name: "",
      email: "",
      password: "",
    });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ---- SUBMIT REGISTER ----
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser(formData);

      toast.success(response.message || "Berhasil daftar!");

      // masuk ke halaman verif
      setVerifPage(true);
    } catch (err) {
      toast.error(err.message || "Gagal daftar");
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  // ---- SUBMIT VERIFICATION ----
  const handleSubmitVerif = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await verifUser(code.join(""));

      toast.success(response.message || "Berhasil diverifikasi!");

      router.push("/login");
      resetForm();
    } catch (err) {
      toast.error(err.message || "Kode salah atau kadaluwarsa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="space-y-5"
        onSubmit={verifPage ? handleSubmitVerif : handleSubmitRegister}
      >
        {!verifPage ? (
          <div className="space-y-5">
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
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-center text-sm text-zinc-600">
              Masukkan 6-digit kode yang kami kirim ke email kamu
            </p>

            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="
                    w-12 h-12 text-center text-xl font-semibold 
                    border rounded-lg 
                    focus:ring-2 focus:ring-secondary focus:border-secondary 
                    outline-none
                  "
                />
              ))}
            </div>

            <p className="text-center text-sm text-zinc-500">
              Kode akan kedaluwarsa dalam{" "}
              <span className="font-semibold text-secondary">
                {formattedTime()}
              </span>
            </p>
          </div>
        )}

        <ButtonAuth
          buttonText={verifPage ? "Verifikasi" : buttonText}
          loading={loading}
        />
      </form>

      {!verifPage && (
        <div className="mt-6 text-center text-sm">
          <span className="text-zinc-500">{answerText} punya akun?</span>{" "}
          <a
            href={answerLink}
            className="font-medium text-secondary hover:underline"
          >
            {ctaText} sekarang
          </a>
        </div>
      )}
    </div>
  );
}
