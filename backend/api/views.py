# backend/api/views.py

import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from django.conf import settings
import os

# Initialize OpenAI client
llm = ChatOpenAI(
    model_name="gpt-4",
    temperature=0.7,
    openai_api_key=os.getenv('OPENAI_API_KEY')
)

# Initial analysis prompt template
ANALYSIS_TEMPLATE = """You are a professional music producer and critic. Analyze the following track:
URL: {track_url}

Provide a detailed analysis covering:
1. Strengths
2. Areas for Improvement
3. Genre Fit and Style Analysis
4. Specific Technical and Creative Suggestions

Be specific and technical in your feedback while maintaining a constructive tone."""

# Follow-up discussion prompt template
DISCUSSION_TEMPLATE = """Based on the previous analysis of the track ({track_url}), 
let's discuss the specific aspect the user is interested in: {aspect}

Provide detailed, actionable insights and recommendations specifically about this aspect.
Include technical details, creative suggestions, and industry best practices."""

analysis_chain = LLMChain(
    llm=llm,
    prompt=ChatPromptTemplate.from_template(ANALYSIS_TEMPLATE)
)

discussion_chain = LLMChain(
    llm=llm,
    prompt=ChatPromptTemplate.from_template(DISCUSSION_TEMPLATE)
)

@csrf_exempt
def analyze_track(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            track_url = body.get('url')
            aspect = body.get('aspect')  # The specific aspect user wants to discuss
            
            if not track_url:
                return JsonResponse({"error": "Track URL is required"}, status=400)
            
            # If no specific aspect is provided, perform initial analysis
            if not aspect:
                # Generate initial analysis
                analysis = analysis_chain.run(track_url=track_url)
                
                # Parse the analysis into structured format
                response_data = {
                    "analysis": analysis,
                    "available_aspects": [
                        "Strengths",
                        "Areas for Improvement",
                        "Genre Fit",
                        "Technical Suggestions",
                        "Creative Direction"
                    ]
                }
            else:
                # Generate focused discussion on specific aspect
                detailed_response = discussion_chain.run(
                    track_url=track_url,
                    aspect=aspect
                )
                
                response_data = {
                    "aspect": aspect,
                    "detailed_analysis": detailed_response
                }
            
            return JsonResponse(response_data)
            
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid HTTP method"}, status=405)
