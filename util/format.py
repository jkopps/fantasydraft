import argparse
import string
import sys
import csv

attrs = ('rank', 'tier', 'name', 'team', 'pos', 'best', 'worst', 'avg', 'stddev', 'ecrvsadp', 'notes')
numerics = set(['rank', 'tier', 'best', 'worst', 'avg', 'stddev'])
attrsmap = dict(
    zip(
        attrs,
        ('RK', 'TIERS', 'PLAYER NAME', 'TEAM', 'POS', 'BEST', 'WORST', 'AVG.', 'STD.DEV', 'ECR VS. ADP', 'NOTES')
    )
)

parser = argparse.ArgumentParser(description=
                                 "Reformat Fantasy Pros rankings csv file")
parser.add_argument('filename', help='input csv file')
args = parser.parse_args()
filename = args.filename

with open(filename, 'r', newline=None) as fh:
    rdr = csv.reader(fh)
    hdrs = next(rdr)
    indices = dict(zip(hdrs, range(len(hdrs))))
    sys.stdout.write('var playerData = [\n')
    for row in rdr:
        playerData = dict(
            [(attr,row[indices[attrsmap[attr]]]) for attr in attrs]
            )
        # position is actually given as rank in position, e.g., RB1
        playerData['pos'] = playerData['pos'].strip(string.digits)
        entry = '{'
        for attr in attrs:
            if attr in numerics:
                entry += '%s:%s,' % (attr, playerData[attr])
            else:
                entry += '%s:"%s",' % (attr, playerData[attr])
        entry += '},'
        sys.stdout.write(entry + '\n')
    sys.stdout.write(']\n')
