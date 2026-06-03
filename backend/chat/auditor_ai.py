from groq import Groq
import json
import os
from dotenv import load_dotenv

# Load .env
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found. Check your .env file.")

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

# Use a safe, available model for your laptop
SUPPORTED_MODEL = "llama-3.1-8b-instant"

def generate_auditor_focus(paragraph_text):
    """
    Generate structured auditor-focused insight using Groq.
    """

    prompt = f"""
You are a professional IFRS audit assistant.

Based only on the IFRS paragraph below, provide a concise auditor-focused analysis.

Return STRICT JSON only in this format:

{{
  "risk_level": "",
  "auditor_focus": "",
  "key_judgment_area": "",
  "recommended_action": ""
}}

IFRS Paragraph:
{paragraph_text}
"""

    try:
        response = client.chat.completions.create(
            model=SUPPORTED_MODEL,
            messages=[
                {"role": "system", "content": "You are an expert IFRS auditor. Respond only in valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,
            max_tokens=300
        )

        content = response.choices[0].message.content.strip()

        # Remove ```json blocks if any
        content = content.replace("```json", "").replace("```", "").strip()

        return json.loads(content)

    except Exception as e:
        error_msg = str(e)
        return {
            "risk_level": "Unknown",
            "auditor_focus": f"Unable to generate analysis: {error_msg}",
            "key_judgment_area": "N/A",
            "recommended_action": "Check API configuration or model settings.",
            "error": error_msg
        }


# Example usage
if __name__ == "__main__":

    paragraphs = [
        ("IFRS9", "Purchased or originated financial asset(s) that are originated credit-impaired on initial recognition."),
        ("IFRS16", "A lessee shall recognize a right-of-use asset and a lease liability at the commencement date of the lease."),
        ("IFRS17", "Insurance contract liabilities comprise the fulfilment cash flows and a contractual service margin."),
        ("IFRS18", "Revenue from contracts with customers is recognized when control of goods or services transfers to the customer.")
    ]

    for standard, paragraph in paragraphs:
        analysis = generate_auditor_focus(paragraph)
        print(f"{standard} Analysis:\n{analysis}\n")

