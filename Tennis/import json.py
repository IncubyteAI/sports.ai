import json
import glob

# Initialize the maximum length and the stage with the maximum length
max_length = 0
max_length2 = 0
max_length3 = 0
max_stage = ""
max_stage2 = ""
max_stage3 = ""

filenames = glob.glob('/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData/RStages-Ann/*.json')
print(filenames)

# Iterate over all JSON files in the current directory
for filename in filenames:
    with open(filename, 'r') as f:
        data = json.load(f)
        # Iterate over all stages in the current file
        for stage in data['tags']:
            # Calculate the length of the current stage
            stage_length = stage['frameRange'][1] - stage['frameRange'][0]
            # If the current stage is longer than the maximum length, update the maximum length and the stage
            if stage_length > max_length3:
                max_length3 = stage_length
                if stage_length > max_length2:
                    max_length3 = max_length2
                    max_length2 = stage_length
                    if stage_length > max_length:
                        max_length2 = max_length
                        max_length = stage_length
                        max_stage = stage['name']

    

print(f"1. {max_length}, 2. {max_length2}, 3. {max_length3}")