# Sports.AI
Hey 👋 This is the official github repo for sports.ai, an AI-based startup founded by 2 highschool freshmen, Tanay Agrawal (@YanatPlayz) and Daniel Zhu (@danielzsh).

Sports.ai is an innovative tool for sports coaching and provides real-time feedback to players. Our technology uses artificial intelligence to analyze player performance through mobile videos and offer personalized insights.

## Setup
We use [Poetry](https://python-poetry.org/) to manage packages for Python and npm for JavaScript.
### Python
This project uses Python 3.8; consider using [pyenv](https://github.com/pyenv/pyenv) to manage your Python versions if you have a different version installed (once installed, you can run `pyenv install 3.11 && pyenv local 3.8`).

Once the proper Python version is installed, run `poetry install` to install dependencies. To activate the venv, run `poetry shell`; to deactivate, simply run `exit`. You can also run something like `poetry run python script.py` to invoke a command through the venv.

Make sure to install dependencies through `poetry add package` and not `pip install package` so the dependencies are kept up to date!

## Credits
Pascal Qin for collecting some video data.

## RData folder
The RData folder that contains all the training data (videos and annotations) is not included in this repository due to the amount of memory they occupy. Please ask our team for the dataset separately.
## Removing Spaces
If the RData file you import is formatted with "Stage X" in folders and filenames instead of "StageX", run `source rm_spaces.sh` to remove these spaces.
## Pre-commit setup
To use `pre-commit`, a tool we use to ensure proper formatting and documentation, follow the instructions [here](https://pre-commit.com/).
