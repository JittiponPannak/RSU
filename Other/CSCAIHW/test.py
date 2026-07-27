data = [
    [ "youth",          "high",     "no",  "fair",          "no" ],
    [ "youth",          "high",     "no",  "execllent",     "no" ],
    [ "middle-aged",    "high",     "no",  "fair",          "yes" ],
    [ "senior",         "medium",   "no",  "fair",          "yes" ],
    [ "senior",         "low",      "yes", "fair",          "yes" ],
    [ "senior",         "low",      "yes", "execllent",     "no" ],
    [ "middle-aged",    "low",      "yes", "execllent",     "yes" ],
    [ "youth",          "medium",   "no",  "fair",          "no" ],
    [ "youth",          "low",      "yes", "fair",          "yes" ],
    [ "senior",         "medium",   "yes", "fair",          "yes" ],
    [ "youth",          "medium",   "yes", "execllent",     "yes" ],
    [ "middle-aged",    "medium",   "no",  "execllent",     "yes" ],
    [ "middle-aged",    "high",     "yes", "fair",          "yes" ],
    [ "senior",         "medium",   "no",  "execllent",     "no" ],
]

buy_yes_count = 0
buy_no_count = 0

yes_age_youth = 0
yes_inc_medium = 0
yes_student_yes = 0
yes_credit_fair = 0

no_age_youth = 0
no_inc_medium = 0
no_student_yes = 0
no_credit_fair = 0

for index, item in enumerate(data):
    if item[4] == "yes":
        if item[0] == "youth":
            yes_age_youth += 1
        if item[1] == "medium":
            yes_inc_medium += 1
        if item[2] == "yes":
            yes_student_yes += 1
        if item[3] == "fair":
           yes_credit_fair += 1
        
        buy_yes_count += 1
    elif item[4] == "no":
        if item[0] == "youth":
            no_age_youth += 1
        if item[1] == "medium":
            no_inc_medium += 1
        if item[2] == "yes":
            no_student_yes += 1
        if item[3] == "fair":
           no_credit_fair += 1
        
        buy_no_count += 1

yes_total = (
    (yes_age_youth / buy_yes_count) *
    (yes_inc_medium / buy_yes_count) *
    (yes_student_yes / buy_yes_count) *
    (yes_credit_fair / buy_yes_count)
) * (buy_yes_count / len(data))
no_total = (
    (no_age_youth / buy_no_count) *
    (no_inc_medium / buy_no_count) *
    (no_student_yes / buy_no_count) *
    (no_credit_fair / buy_no_count)
) * (buy_no_count / len(data))

if yes_total > no_total:
    print("Will Buy")
else:
    print("Wont Buy")