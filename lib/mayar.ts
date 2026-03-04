const MAYAR_API_KEY = process.env.MAYAR_API_KEY;
const MAYAR_URL = "https://api.mayar.id/v1";

export interface PaylinkRequest {
  name: string;
  email: string;
  amount: number;
  mobile: string;
  description: string;
  payload?: any;
  redirectUrl?: string;
}

export interface PaylinkResponse {
  link: string;
  id: string;
}

export const createPaylink = async (data: PaylinkRequest): Promise<PaylinkResponse> => {
  if (!MAYAR_API_KEY) {
    throw new Error("MAYAR_API_KEY is not defined");
  }

  const response = await fetch(`${MAYAR_URL}/paylink`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${MAYAR_API_KEY}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      amount: data.amount,
      mobile: data.mobile,
      description: data.description,
      payload: data.payload,
      redirectUrl: data.redirectUrl,
    }),
  });

  const responseText = await response.text();
  console.log("DEBUG: Mayar Raw Response:", responseText);

  let body;
  try {
    body = JSON.parse(responseText);
  } catch (e) {
    console.error("DEBUG: Failed to parse Mayar response as JSON:", e);
    throw new Error("Invalid response from Mayar API");
  }

  if (!response.ok) {
    console.error("Mayar API error:", body);
    throw new Error(body.message || "Failed to create Mayar paylink");
  }

  return {
    link: body.data.link,
    id: body.data.id,
  };
};
