import sys
import csv

attrs = ('rank', 'name', 'team', 'pos', 'min', 'max', 'stddev', 'tier', 'value', 'notes')
attrsmap = dict(
    zip(
        attrs,
        ('Rank', 'Player Name', 'Team', 'Position', 'Min', 'Max', 'STD Dev', 'Tier', 'Value', 'Notes')
    )
)

with open('FantasyPros-consensus-rankings.csv', 'rU') as fh:
    rdr = csv.reader(fh)
    hdrs = rdr.next()
    indices = dict(zip(hdrs, range(len(hdrs))))
    sys.stdout.write('var playerData = [\n')
    for row in rdr:
        entry = '{'
        for attr in attrs:
            entry += '%s:"%s",' % (attr, row[indices[attrsmap[attr]]])
        entry += '},'
        sys.stdout.write(entry + '\n')
    sys.stdout.write(']\n')
