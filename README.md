# Sentiment Analysis Tool

A browser-based sentiment analysis dashboard built for Week 3 (Sentiment Analysis & Data Insights) of the AI Bootcamp.

Paste customer comments (one per line) and the tool scores each one, shows overall and per-topic sentiment, lists the words driving the mood, and generates an insights report.

## Run it
No install needed. Open `index.html` in any modern browser.

To host it free: push to GitHub, then Settings > Pages > Deploy from branch `main` / root.

## How it works
Lexicon-based (rule-based) classifier, similar in spirit to VADER:
1. Tokenize: lowercase, strip punctuation, split into words.
2. Score words using a built-in dictionary (-3 to +3).
3. Context: negators (not, never) within 3 words flip and soften the score (x -0.8); intensifiers (very, extremely) multiply by 1.5; dampeners (slightly) by 0.6; exclamation marks add a small boost.
4. Normalize: compound = s / sqrt(s^2 + 15), giving -1 to +1.
5. Classify: >= 0.15 Positive, <= -0.15 Negative, otherwise Neutral.
6. Topic tagging: keyword groups (price, support, delivery, quality, app) allow average sentiment per topic.

## Limitations
English only, small dictionary, no sarcasm detection. A trained model (Naive Bayes, logistic regression on TF-IDF, or a transformer) would learn word weights from labelled data and generalise better.

## Project deliverables
- Dashboard analysing sentiment: `index.html`
- Insights report: generated in the dashboard
- Technical explanation: this README and the bottom of the dashboard

## Tech
HTML, CSS and vanilla JavaScript. No dependencies.
