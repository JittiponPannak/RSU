import math
import operator

class Info:
    def __init__(self, Name, Attributes, Species):
        self.Name = Name
        self.Attributes = Attributes
        self.Species = Species

list = []
targetA = None
targetB = None

list.append(Info("Frog",        [ 0, 1, 0, 0, 0, 0, 1, 1, 0 ], "Semiaquatic"))
list.append(Info("Anabas",      [ 0, 1, 0, 0, 1, 0, 1, 0, 1 ], "Aquatic"))
list.append(Info("Crocodile",   [ 0, 1, 0, 0, 1, 0, 1, 0, 0 ], "Reptile"))
list.append(Info("Anabas",      [ 0, 0, 0, 0, 1, 0, 1, 0, 1 ], "Aquatic"))
list.append(Info("Turtle",      [ 0, 1, 0, 0, 0, 0, 1, 0, 0 ], "Reptile"))
list.append(Info("Dog",         [ 1, 0, 1, 1, 0, 1, 0, 0, 0 ], "Reptile"))
list.append(Info("Ostrich",     [ 1, 0, 0, 1, 0, 1, 0, 0, 0 ], "Bird"))

targetA = Info("Mysterious A",  [ 1, 0, 0, 1, 0, 0, 0, 0, 0 ], "???")
targetB = Info("Mysterious B",  [ 0, 1, 0, 0, 1, 0, 1, 0, 0 ], "???")

accumsA = []
accumsB = []

for index, info in enumerate(list):
    accumA = 0.0
    accumB = 0.0
    
    print(info.Name)

    for idx, val in enumerate(info.Attributes):
    #   print(targetA.Attributes[idx], "\t", info.Attributes[idx])

        if not (targetA.Attributes[idx] == 0 and info.Attributes[idx] == 0):
            accumA += (targetA.Attributes[idx] - val) ** 2
    
    for idx, val in enumerate(info.Attributes):
        if not (targetB.Attributes[idx] == 0 and info.Attributes[idx] == 0):
            accumB += (targetB.Attributes[idx] - val) ** 2
    
    print(math.sqrt(accumA), "\t", math.sqrt(accumB))
    print("")

    accumsA.append({ "index" : index, "value" : math.sqrt(accumA) })
    accumsB.append({ "index" : index, "value" : math.sqrt(accumB) })

accumsA3 = sorted(accumsA, key=operator.itemgetter("value"))
accumsB3 = sorted(accumsB, key=operator.itemgetter("value"))

print(accumsA3[0], "\t", accumsA3[1], "\t", accumsA3[2], "\t")
print(accumsB3[0], "\t", accumsB3[1], "\t", accumsB3[2], "\t")