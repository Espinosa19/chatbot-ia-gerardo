export function evaluateConversation(turns) {
  let coherence = true;
  let understanding = true;
  let apiFailure = false;

  for (let i = 0; i < turns.length; i++) {
    const msg = turns[i].mensaje.toLowerCase();

    if (msg.includes("error_api")) {
      apiFailure = true;
    }

    if (msg.includes("no entiendo")) {
      understanding = false;
    }

    if (msg.length < 3) {
      coherence = false;
    }
  }

  let verdict = "PASS";

  if (apiFailure) verdict = "FAIL";
  else if (!coherence && !understanding) verdict = "FAIL";
  else if (!coherence || !understanding) verdict = "PARCIAL";

  return {
    verdict,
    analysis: `Coherencia: ${coherence}, Entendimiento: ${understanding}, API: ${apiFailure}`
  };
}
