class Info:
    def __init__(self, Outlook, Temperature, Humidity, Wind, PlayTennis):
        self.Outlook = Outlook
        self.Temperature = Temperature
        self.Humidity = Humidity
        self.Wind = Wind
        self.PlayTennis = PlayTennis
   
data = []

data.append(Info("Sunny", "Hot", "High", "Weak", "No"))
data.append(Info("Sunny", "Hot", "High", "Strong", "No"))
data.append(Info("Overcast", "Hot", "High", "Weak", "Yes"))
data.append(Info("Rain", "Mild", "High", "Weak", "Yes"))
data.append(Info("Rain", "Cool", "Normal", "Weak", "Yes"))
data.append(Info("Rain", "Cool", "Normal", "Strong", "No"))
data.append(Info("Overcast", "Cool", "Normal", "Strong", "Yes"))
data.append(Info("Sunny", "Mild", "High", "Weak", "No"))
data.append(Info("Sunny", "Cool", "Normal", "Weak", "Yes"))
data.append(Info("Rain", "Mild", "Normal", "Weak", "Yes"))
data.append(Info("Sunny", "Mild", "Normal", "Strong", "Yes"))
data.append(Info("Overcast", "Mild", "High", "Strong", "Yes"))
data.append(Info("Overcast", "Hot", "Normal", "Weak", "Yes"))
data.append(Info("Rain", "Mild", "High", "Strong", "No"))

play_yes_count = 9
play_no_count = 9

outl_sunny_yes = 0
temp_cool_yes = 0
humi_high_yes = 0
wind_stro_yes = 0

outl_sunny_no = 0
temp_cool_no = 0
humi_high_no = 0
wind_stro_no = 0

for item in data:
    if item.PlayTennis == "Yes":
        if item.Outlook == "Sunny":
            outl_sunny_yes += 1
        if item.Temperature == "Cool":
            temp_cool_yes += 1
        if item.Humidity == "High":
            humi_high_yes += 1
        if item.Wind == "Strong":
            wind_stro_yes += 1

        play_yes_count += 1
    elif item.PlayTennis == "No":
        if item.Outlook == "Sunny":
            outl_sunny_no += 1
        if item.Temperature == "Cool":
            temp_cool_no += 1
        if item.Humidity == "High":
            humi_high_no += 1
        if item.Wind == "Strong":
            wind_stro_no += 1
        
        play_no_count += 1

print(outl_sunny_yes)
print(temp_cool_yes)
print(humi_high_yes)
print(wind_stro_yes)
print("")
print(outl_sunny_no)
print(temp_cool_no)
print(humi_high_no)
print(wind_stro_no)

yes_total = (
    (outl_sunny_yes / play_yes_count) *
    (temp_cool_yes / play_yes_count) *
    (humi_high_yes / play_yes_count) *
    (wind_stro_yes / play_yes_count)
) * (play_yes_count / len(data))
no_total = (
    (outl_sunny_no / play_no_count) *
    (temp_cool_no / play_no_count) *
    (humi_high_no / play_no_count) *
    (wind_stro_no / play_no_count)
) * (play_no_count / len(data))

print(f"Yes% : {yes_total}")
print(f"No% : {no_total}")

if yes_total > no_total:
    print("Will Play")
else:
    print("Wont Play")