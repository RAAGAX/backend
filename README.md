RaagaX is a machine learning and audio-processing based project that detects musical notes (Sa, Re, Ga, etc.) from audio files. The project uses audio signal processing techniques along with a Random Forest Classifier to identify notes from extracted frequencies and provide structured JSON output for further music analysis applications.

 Features:
 Detects musical notes from audio files
 Extracts frequencies using Librosa
 Uses Machine Learning for note classification
 Structured JSON output with note timings
 Saves trained model using Pickle
 Beginner-friendly ML + audio processing workflow

 Tech Stack: 
Python
Librosa
NumPy
Scikit-learn
Pickle
JSON

Project Workflow:
Generate synthetic dataset of note frequencies
Train Random Forest Classifier
Load audio file using Librosa
Extract pitch/frequency features
Predict musical notes
Return structured JSON output
