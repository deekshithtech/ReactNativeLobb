export const getToken = async () => {
  const response = await fetch(
    'https://swsut62sse.execute-api.ap-south-1.amazonaws.com/prod/generateToken',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'tushar.saini@lobb.in' }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch token');
  }

  const data = await response.json();
  return data.token;
};

export const getContent = async (token) => {
  const response = await fetch(
    'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch content');
  }

  const data = await response.json();
  return data.content;
};
