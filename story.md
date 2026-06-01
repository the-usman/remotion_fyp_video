# The CrimeX Story: Building Pakistan's First AI Crime Intelligence Pipeline

## The Problem Nobody Wanted to Solve

There is a quiet crisis in Pakistani research that nobody talks about openly. When a researcher wants to study crime patterns in Lahore, Karachi, or Faisalabad, they hit the same wall almost immediately: there is no public data. Police stations hold structured crime records, but those records are locked away — not by malice, but by bureaucracy, privacy concerns, and a system that was never designed to share. Researchers who have published work on Pakistani crime have largely done so by carrying their own collected data into the literature and leaving it there, inaccessible to the next person who comes along.

This is not a small inconvenience. It is a structural blockage that has kept data-driven crime research in Pakistan years behind comparable countries. We ran into this wall ourselves. And instead of stopping, we decided to build a door through it.

---

## Building the Corpus: 200,000 Rows and a New Problem

Our approach was to treat news as a proxy for crime records. Pakistani news sources report on crime extensively — murders, robberies, kidnappings, terrorism incidents — and they do so in Urdu, the language most Pakistanis actually read. We built a pipeline that scraped six major Urdu news sources, cleaned the raw text, deduplicated across sources, and assembled what became a corpus of over 200,000 rows of crime-related news.

It felt like a breakthrough. Then we looked more carefully at the data.

The 200,000 rows were not 200,000 crimes. Only about 25% of the corpus was what we actually wanted — clear, specific, event-level crime reporting. The rest was noise: opinion columns, follow-up articles, general crime statistics pieces, duplicate coverage of the same incident from different angles. We had quantity. We did not yet have quality.

The problem was that we could not simply throw all 200,000 rows into our downstream systems. Deduplication and insight extraction are expensive operations. Feeding them 75% noise would corrupt every output that came after. We needed to classify and filter first.

---

## The Classification Problem: When LLMs Fail

Here is where the project got genuinely difficult.

We needed to classify Urdu crime news by event category — murder, robbery, rape, suicide, kidnapping, terrorism — assigning each article to the crime type it actually described. This sounds straightforward. It was not.

The first signal that something was wrong came when we tried large, capable language models on the task in zero-shot mode. Llama 3.2 3B managed only 25.9% exact match. Qwen 2.5 and Gemini 2.5 both landed at 44%. Grok 4.1 Fast was the best of the group at 65% — and even that number was discouraging. These are frontier systems on what looked like a straightforward classification problem. The reason, we came to understand, was the nature of Urdu crime news itself: event descriptions in Urdu are contextual and idiomatic in ways that transfer poorly to models trained predominantly on English and high-resource languages. The task was harder than it looked.

We tried few-shot prompting next. Results improved across the board — Qwen 2.5 reached 77%, Gemini 2.5 hit 75%, and Grok 4.1 Fast climbed to 82.8%. Better, but still not reliable enough for a production pipeline that would shape every downstream output. We needed a trained classifier, not a prompted one.

We fell back to manual labeling. It is slow, expensive work, but we prepared our first batch of 2,000 labeled rows and trained an initial classifier. The result was 72% accuracy — better than zero-shot LLMs, but not good enough. The low-resource categories were the problem: terrorism, suicide, and kidnapping had badly imbalanced representation, and the model was essentially ignoring them.

---

## RoBERTa-Urdu-Small: Finding the Right Foundation

The turning point came when we reconsidered our base model. We had been working with general-purpose multilingual models that treated Urdu as one language among many. We switched to `roberta-urdu-small`, a model built specifically and exclusively for Urdu text. Its reported F1 score of 96% on standard Urdu benchmarks was what drew us in.

We prepared a second, filtered batch of 2,000 samples — this time using a category-targeted selection strategy to specifically address the underrepresented classes. Training on all 4,000 samples pushed accuracy to 78%. The direction was clear: more data, smarter data.

This was the golden phase. Adding more labeled rows was improving results at a satisfying rate. We reached 8,000 rows and hit 80.7% accuracy. Not perfect, but a trajectory we could believe in.

Then the trajectory died.

The next batch of 1,700 rows produced a gain of only 0.5 percentage points. We were on the flat part of the learning curve, and manual annotation is brutal work — time-consuming, expensive, and difficult to scale. We needed a different lever.

---

## Searching for the Lever

We tried data augmentation using multiple models to synthetically expand the training set. No meaningful improvement. We modified the loss function to penalize errors on minority classes more heavily — accuracy rose to 83%, which was a genuine confidence booster, but the ceiling felt close.

Then we explored a more mathematical direction: extracting RoBERTa's hidden states, applying PCA to reduce them to 100 dimensions, and running a range of ML and deep learning models on top of those compressed representations. The results were worse than what we had before. The reason, in retrospect, is straightforward: PCA and similar dimensionality reduction techniques are designed for tabular feature spaces. RoBERTa's hidden states are dense contextual embeddings — they carry meaning in the relationships between dimensions, not in the individual dimensions themselves. Compressing them with PCA destroys the very structure that makes them useful. The mathematical logic that works on standard ML features simply does not transfer here.

We were at 83%, stuck, with a project deadline that did not care about our technical frustrations.

---

## The Combined System: Inspired by How Humans Annotate

The breakthrough came from stepping back and watching how our human annotators actually did their work. They did not jump directly to "is this murder or robbery?" They first asked a simpler question: does this article describe a crime event at all? And only then did they classify what kind.

We built a two-stage system that mirrored this behavior. The first stage is a binary classifier: does this news article describe a discrete crime event? The second stage, triggered only on articles that pass the first, classifies by category — murder, robbery, rape, suicide, kidnapping, terrorism.

This architecture solved a problem we had been fighting indirectly for months. The model no longer had to simultaneously decide relevance and category in a single step. Each stage could specialize. The combined system achieved 88% exact match accuracy.

That number represented not just a metric improvement but a complete change in what the project could become.

---

## Scaling Up: Fine-Tuning Qwen and Llama on 32K Records

The RoBERTa combined system at 88.7% was our production baseline. But we had a larger question: now that we had built a verified, high-quality labeled dataset, what would happen if we fine-tuned much larger generalist models on it?

By this point we had accumulated 32,000 manually verified records, supplemented with additional mixed-source data. We fine-tuned two models: Llama 3.2 and Qwen 2.5-7B.

The results reframed everything we thought we knew about this problem. Llama 3.2 fine-tuned reached 89.0% exact match — already edging past the RoBERTa combined system. Qwen 2.5-7B went further: 91.2% exact match, 0.93 Union Accuracy, 0.91 Mean IoU. These are the best numbers in the entire experiment table, by a clear margin.

The lesson is worth sitting with. In zero-shot mode, Qwen 2.5 had scored 44% on this exact task — worse than a coin flip on a six-class problem. Fine-tuned on 32K domain-specific Urdu records, the same model family reached 91.2%. The model was never the limitation. The data was.

This is also what makes CrimeX something beyond a single project. The 32K verified dataset is now an asset that any future researcher can build on. The fine-tuning path is proven. The ceiling has not been found yet.

---

## Insights Extraction: Knowing When to Not Build

With a clean, classified corpus in hand, the next challenge was insight extraction — pulling structured facts from unstructured news text. We tested multiple models. Only one produced results we trusted: Perplexity AI, which achieved 99% accuracy on our extraction tasks.

We made a deliberate decision here that is worth stating explicitly. We did not train our own extraction model. The reasoning was practical: Perplexity already works, we have a dataset if a future researcher wants to train their own system, and building a production pipeline on a proven tool is faster and more reliable than building and maintaining a custom one. This is not a compromise — it is engineering judgment.

---

## The Weather Correlation: A Null Result Worth Reporting

We obtained weather data from Open-Metro and performed a full correlation analysis between weather variables and crime patterns across our three districts. Temperature, humidity, rainfall, precipitation — we tested them all.

There was no meaningful correlation.

This is a result the literature sometimes finds and sometimes does not, and it is worth stating clearly rather than burying. In the Pakistani context, at the granularity of our data, weather does not appear to be a reliable predictor of crime frequency.

---

## Dashboard, Predictions, and the Forecasting Architecture

The final phase brought everything together into a live system: a dashboard built on FastAPI, Supabase, and React, displaying classified crime data, trends, and district-level breakdowns in a form that researchers and analysts can actually use.

The prediction system is where the engineering became most interesting. The core forecasting work lives in two notebooks. The first (`chronos.ipynb`) handles everything upstream of the model: loading raw crime data for Lahore, Karachi, and Faisalabad; aggregating daily event counts to weekly crime counts per district; engineering features including weather variables, distance from district and city centers, Islamic holiday flags, inflation rates, and rolling lag features; and producing the clean weekly time series that the model consumes.

The second notebook (`chronos-testing-arima.ipynb`) runs the actual forecasting experiments. The primary model is Chronos-2, Amazon's pretrained time series foundation model, run in a rolling walk-forward evaluation protocol that predicts one week at a time, extending the training history with true values at each step. This is compared against a moving average baseline — the MA-4 seed computed from the final four weeks of training data — to establish whether the model is actually learning signal or just tracking recent momentum.

The feature engineering reflects the reality of Pakistani crime patterns: Ramadan and Muharram periods are flagged explicitly, lag features capture the autocorrelation in weekly crime counts at 1, 2, 3, and 4 week horizons, and rolling means at 4, 8, and 12 week windows provide the model with a sense of medium-term trend.

---

## What This System Is

CrimeX is a complete pipeline from raw Urdu news to structured, classified, insight-enriched, geographically indexed crime data — with forecasting on top. It is the dataset and the toolchain that Pakistani researchers have been unable to build for themselves because the starting material did not exist in accessible form.

The classification system peaks at 91.2% exact match accuracy with fine-tuned Qwen 2.5-7B, trained on 32,000 verified Urdu crime records — up from 44% zero-shot on the same model. The RoBERTa combined system at 88.7% remains a strong, lightweight alternative. The corpus contains over 200,000 articles, refined to a high-quality labeled subset. The forecasting pipeline produces district-level weekly crime predictions for Pakistan's three largest cities using Chronos-2, benchmarked against a principled moving average baseline.

If you want the data, it exists. If you want to build on the classification system, the foundation is there. The door is open.