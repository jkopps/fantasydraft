import csv

a="FantasyPros_2022_Draft_ALL_Rankings.csv"
b="FantasyPros_2022_Draft_ALL_Rankings_with_Notes.csv"

filea = open(a, "r")
fileb = open(b, "r")
rdra = csv.reader(filea)
rdrb = csv.reader(fileb)


with open("tmp.csv", "w") as filec:
    wrtr = csv.writer(filec)
    for linea in rdra:
        lineb = next(rdrb)
        assert linea[0] == lineb[0]
        linea.append(lineb[-1])
        wrtr.writerow(linea)
