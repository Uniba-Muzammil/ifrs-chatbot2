from groq import Groq
import os

def generate_deep_analysis(question):

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        return "Deep analysis error: GROQ_API_KEY not found."

    try:
        client = Groq(api_key=api_key)

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",   # latest working model
            messages=[
                {
                    "role": "system",
                    "content": "You are a Big 4 IFRS technical partner providing structured IFRS analysis."
                },
                {
                    "role": "user",
                    "content": f"""
Provide a professional IFRS technical analysis for the following scenario.

Structure the response clearly using headings:

Technical Analysis
Measurement Explanation
Journal Entry Approach
Risk Assessment
Disclosure Considerations

Scenario:
{question}
"""
                }
            ],
            temperature=0.2,
            max_tokens=1000,
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"Deep analysis error: {str(e)}"