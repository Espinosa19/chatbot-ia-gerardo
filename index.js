import "dotenv/config";
import fs from "fs";
import { getGroqResponse } from "./services/groq.js";
import { getDialoGPTResponse } from "./services/dialogpt.js";
import { scenarios } from "./utils/scenarios.js";
import { evaluateConversation } from "./utils/evaluator.js";

async function runScenario(scenario) {
  let turns = [];

  let past_user_inputs = [];
  let generated_responses = [];

  let groqMessages = [
    {
      role: "system",
      content: scenario.initialPrompt
    }
  ];
let apiError = false;

for (let i = 0; i < 4; i++) {
  try {
    const groqMessage = await getGroqResponse(groqMessages);

    turns.push({ rol: "groq", mensaje: groqMessage });

    const botResponse = await getDialoGPTResponse(
      groqMessage,
      past_user_inputs,
      generated_responses
    );

    turns.push({ rol: "dialogpt", mensaje: botResponse });

    past_user_inputs.push(groqMessage);
    generated_responses.push(botResponse);

    groqMessages.push({ role: "assistant", content: botResponse });

  } catch (error) {
    console.error("Fallo en API:", error.message);

    apiError = true;

    turns.push({
      rol: "dialogpt",
      mensaje: "ERROR_API"
    });

    break;
  }
}

// 🔥 ESTO TE FALTABA
let evaluation;

if (apiError) {
  evaluation = {
    verdict: "FAIL",
    analysis: "Error en API de DialoGPT"
  };
} else {
  evaluation = evaluateConversation(turns);
}
  const result = {
    escenario: scenario.name,
    turnos: turns,
    veredicto: evaluation.verdict ,
    analisis: evaluation.analysis
  };

  fs.writeFileSync(
    `./output/escenario${scenarios.indexOf(scenario) + 1}.json`,
    JSON.stringify(result, null, 2)
  );
}

async function main() {
  for (const scenario of scenarios) {
    await runScenario(scenario);
  }
}

main();