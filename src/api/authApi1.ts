export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  password: string;
};

type RegisterResponse = {
  id: number;
};

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to register user');
  }

  return response.json();
};
