"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import InputAuth from "@/components/ui/input/InputAuth";
import { resetPass } from "@/lib/api/auth";
import ButtonAuth from "../ui/button/ButtonAuth";
import { useParams, useRouter } from "next/navigation";

export default function ResetPassForm({ fields, buttonText }) {
  const { id, token } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () =>
    setFormData({
      password: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await resetPass(id, token, formData.password);
      toast.success(response.message);
      router.push("/login");
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

        <ButtonAuth buttonText={buttonText} loading={loading} />
      </form>
    </div>
  );
}
