export const scenarios = [
  {
    name: "Consulta simple",
    description: "Usuario hace pregunta básica y pide más info",
    initialPrompt:
      "Actúa como un usuario que saluda, hace una pregunta y luego pide más detalles."
  },
  {
    name: "Cambio de tema",
    description: "Usuario cambia abruptamente de tema",
    initialPrompt:
      "Actúa como usuario que empieza hablando del clima y luego cambia a comida."
  },
  {
    name: "Usuario confuso",
    description: "Preguntas ambiguas",
    initialPrompt:
      "Actúa como usuario que hace preguntas poco claras y confusas."
  },
  {
    name: "Usuario exigente",
    description: "Usuario corrige al chatbot",
    initialPrompt:
      "Actúa como usuario exigente que corrige respuestas del chatbot."
  }
];