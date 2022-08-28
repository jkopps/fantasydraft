import argparse
import sys
import csv

teamAbbrevs = {
    "Arizona Cardinals" : "ARI",
    "Atlanta Falcons" : "ATL",
    "Baltimore Ravens" : "BAL",
    "Buffalo Bills" : "BUF",
    "Carolina Panthers" : "CAR",
    "Chicago Bears" : "CHI",
    "Cincinnati Bengals" : "CIN",
    "Cleveland Browns" : "CLE",
    "Dallas Cowboys" : "DAL",
    "Denver Broncos" : "DEN",
    "Detroit Lions" : "DET",
    "Green Bay Packers" : "GB",
    "Houston Texans" : "HOU",
    "Indianapolis Colts" : "IND",
    "Jacksonville Jaguars" : "JAC",
    "Kansas City Chiefs" : "KC",
    "Los Angeles Chargers" : "LAC",
    "Los Angeles Rams" : "LAR",
    "Las Vegas Raiders" : "LV",
    "Miami Dolphins" : "MIA",
    "Minnesota Vikings" : "MIN",
    "New England Patriots" : "NE",
    "New Orleans Saints" : "NO",
    "New York Giants" : "NYG",
    "New York Jets" : "NYJ",
    "Philadelphia Eagles" : "PHI",
    "Pittsburgh Steelers" : "PIT",
    "Seattle Seahawks" : "SEA",
    "San Francisco 49ers" : "SF",
    "Tampa Bay Buccaneers" : "TB",
    "Tennessee Titans" : "TEN",
    "Washington Commanders" : "WAS"
    }


parser = argparse.ArgumentParser(description=
                                 "Reformat Fantasy Pros depth chart csv file")
parser.add_argument('filename', help='input csv file')
args = parser.parse_args()
filename = args.filename

with open(filename) as fh:
    rdr = csv.reader(fh)
    sys.stdout.write('teamDepthCharts = [\n')
    while True:
        try:
            team = next(rdr)[0]
            hdrs = next(rdr)
        except:
            break
        players = [[] for i in range(4)]
        while True:
            line = next(rdr)
            if len(line) < 2:
                break
            for i in range(1, len(line), 2):
                # Ignore rankings
                if line[i] != "":
                    players[int(i/2)].append(line[i])
        out  = '{ team:"%s",\n' % teamAbbrevs[team]
        for i,pos in enumerate(('QB', 'RB', 'WR', 'TE')):
            out += '  %s: [' % pos
            for p in players[i]:
                out += '"%s", ' % p
            out += ' ],\n'
        out += '},\n'
        sys.stdout.write(out)
    sys.stdout.write(']\n')
