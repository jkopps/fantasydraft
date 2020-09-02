import sys
import csv

attrs = dict(
    zip(
        ('rank', 'name', 'team', 'pos', 'min', 'max', 'stddev'),
        ('Rank', 'Player Name', 'Team', 'Position', 'Min', 'Max', 'STD Dev')
    )
)

with open('FantasyPros-consensus-rankings.csv', 'r') as fh:
    rdr = csv.reader(fh)
    hdrs = rdr.next()
    indices = dict(zip(hdrs, range(len(hdrs))))
    sys.stdout.write('var playerDataYahoo = [\n')
    for row in rdr:
        entry = '{'
        for attr in ("name", "pos", "team", "rank"):
            entry += '%s:"%s",' % (attr, row[indices[attrs[attr]]])
        entry += '},'
        sys.stdout.write(entry + '\n')
    sys.stdout.write(']\n')
