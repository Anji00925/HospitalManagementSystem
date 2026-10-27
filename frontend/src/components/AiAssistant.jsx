import { useState } from "react";
import "../styles/aiAssistant.css";
import { analyzeSymptoms } from "../api/aiApi";

function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [symptoms, setSymptoms] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello 👋 I'm your AI Hospital Assistant. Describe the patient's symptoms."
    }
  ]);


    const analyzeSymptoms = () => {
      if (!symptoms.trim()) return;

      const text = symptoms.toLowerCase();

      let response = "";

      if (
        text.includes("chest pain") ||
        text.includes("heart") ||
        text.includes("breathing")
      ) {
        response =
          "Based on the symptoms described, I recommend consulting the Cardiology department. These symptoms may indicate a heart-related condition and should be evaluated promptly.";
      } else if (
        text.includes("fever") ||
        text.includes("cough") ||
        text.includes("cold") ||
        text.includes("headache")
      ) {
        response =
          "The symptoms appear to be related to a common infection or viral illness. I recommend consulting the General Medicine department.";
      } else if (
        text.includes("eye") ||
        text.includes("vision") ||
        text.includes("blur")
      ) {
        response =
          "The symptoms seem related to eye health. I recommend consulting the Ophthalmology department.";
      } else if (
        text.includes("ear") ||
        text.includes("nose") ||
        text.includes("throat")
      ) {
        response =
          "The symptoms appear related to ENT conditions. I recommend consulting the ENT department.";
      } else if (
        text.includes("tooth") ||
        text.includes("gum") ||
        text.includes("dental")
      ) {
        response =
          "The symptoms appear related to dental health. I recommend consulting the Dental department.";
      } else if (
        text.includes("skin") ||
        text.includes("rash") ||
        text.includes("allergy")
      ) {
        response =
          "The symptoms appear related to a skin condition. I recommend consulting the Dermatology department.";
      } else {
        response =
          "I am unable to determine the appropriate department from the provided symptoms. Please consult a General Physician for further evaluation.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: symptoms
        },
        {
          sender: "ai",
          text: response
        }
      ]);

      setSymptoms("");
    };

  return (
    <>
      <button
        className="ai-float-btn"
        onClick={() => setOpen(!open)}
      >
        🤖
      </button>

      {open && (
        <div className="ai-modal">
          <div className="ai-header">
            <h3>AI Hospital Assistant</h3>
          </div>

          <div className="chat-box">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "user-message"
                    : "ai-message"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="input-section">
            <textarea
              placeholder="Describe symptoms..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />

            <button onClick={analyzeSymptoms}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AiAssistant;