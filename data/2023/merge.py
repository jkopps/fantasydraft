import csv

a="FantasyPros_2023_Draft_ALL_Rankings_noNotes.csv"
b="FantasyPros_2023_Draft_ALL_Rankings_Notes.csv"
c="FantasyPros_2023_Draft_ALL_Rankings.csv"

filea = open(a, "r")
fileb = open(b, "r")
rdra = csv.reader(filea)
rdrb = csv.reader(fileb)


with open(c, "w") as filec:
    wrtr = csv.writer(filec)
    for linea in rdra:
        lineb = next(rdrb)
        assert linea[0] == lineb[0]
        linea.append(lineb[-1])
        wrtr.writerow(linea)
