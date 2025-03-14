# AI-Powered Music Review System

An intelligent music analysis platform that provides detailed feedback on tracks using OpenAI's GPT-4. The system offers comprehensive analysis of music tracks, including strengths, areas for improvement, genre fit, and specific technical suggestions.

## Features

- **Initial Analysis**: Get a comprehensive review of your track covering multiple aspects
- **Detailed Discussions**: Dive deeper into specific aspects of your track
- **Interactive UI**: Easy-to-use interface with real-time feedback
- **AI-Powered Insights**: Leverages GPT-4 for professional music analysis
- **Responsive Design**: Works well on both desktop and mobile devices

## Tech Stack

- **Frontend**: React.js
- **Backend**: Django
- **AI**: OpenAI GPT-4 with LangChain
- **Styling**: CSS3

## Prerequisites

- Python 3.8 or higher
- Node.js 14.0 or higher
- OpenAI API key
- pip (Python package manager)
- npm (Node package manager)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/VisionOra/music-Analysis---AI---LLM.git

cd music-Analysis---AI---LLM
```

### 2. Backend Setup

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Create .env file
echo "OPENAI_API_KEY=your_api_key_here" > .env

# Run migrations
python manage.py migrate

# Start the Django server
python manage.py runserver
```

### 3. Frontend Setup

```bash
# Install dependencies
cd frontend
npm install

# Start the development server
npm start
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a SoundCloud or music track URL in the input field
3. Click "Analyze Track" to get the initial analysis
4. Click on specific aspect buttons to get detailed analysis of particular elements

## API Endpoints

### POST /api/analyze-track/

Analyzes a music track and provides feedback.

**Request Body:**
```json
{
    "url": "track_url_here",
    "aspect": "optional_aspect_here"
}
```

**Response:**
```json
{
    "analysis": "comprehensive_analysis_here",
    "available_aspects": ["aspect1", "aspect2", ...]
}
```

## Project Structure

```
music-review-system/
├── backend/
│   ├── api/
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── models.py
│   ├── backend/
│   │   ├── settings.py
│   │   └── urls.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ReviewForm.js
│   │   │   └── ReviewForm.css
│   │   └── App.js
│   └── package.json
└── README.md
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the GPT-4 API
- Django and React.js communities for their excellent frameworks
- All contributors who help improve this project

## Support

For support, please open an issue in the GitHub repository or contact the maintainers. 