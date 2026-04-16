import axios from "axios";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function getGroqResponse(messages) {
  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: "llama-3.1-8b-instant",
        messages
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error Groq:", error.message);
    return "Error al generar mensaje";
  }
}