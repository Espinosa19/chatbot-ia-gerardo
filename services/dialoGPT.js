import axios from "axios";

const URL =
  "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";

export async function getDialoGPTResponse(
  text,
  past_user_inputs,
  generated_responses
) {
  try {
    const response = await axios.post(
      URL,
      {
        inputs: {
          past_user_inputs,
          generated_responses,
          text

        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data[0]?.generated_text || "Sin respuesta";
  } catch (error) {
    throw new Error("DIALOGPT_API_ERROR");
  }
}
