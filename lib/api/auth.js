export const loginUser = async (data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json;
};

export const registerUser = async (data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json;
};

export const resendCode = async (email) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-code`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    }
  );

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json;
};

export const verifUser = async (verifCode) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      verifCode,
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json;
};

export const forgotPass = async (email) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    }
  );

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json;
};

export const resetPass = async (id, token, password) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${id}/${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
      }),
    }
  );

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json;
};
