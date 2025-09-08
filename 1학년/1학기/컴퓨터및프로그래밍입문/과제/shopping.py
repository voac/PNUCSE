import sys
from collections import defaultdict

CList = []
CDict = defaultdict(set)
max_customers = []
max_similarity = 0

while ( True ):
	line = sys.stdin.readline().strip()
	
	if line == "":
		break
	else:
		CList.append(line.split())
		
for i in range(len(CList)):
	try:
		NList = [int(k) for k in set(CList[i][1:])]
		for j in NList:
			CDict[CList[i][0]].add(j)
	except KeyError:
		CDict[CList[i][0]] = {}
		NList = [int(k) for k in set(CList[i][1:])]
		for j in NList:
			CDict[CList[i][0]].add(j)

def get_similarity(c1, c2):
	c1_items = CDict[c1]
	c2_items = CDict[c2]
	intersection = len(c1_items.intersection(c2_items))
	union = len(c1_items.union(c2_items))
	return intersection / (union + 1)

for i in CDict.keys():
	for j in CDict.keys():
		if i != j and i < j:
			sim = get_similarity(i, j)
			
			if sim > max_similarity:
				NList = sorted([[i, j]])
				max_customers = NList
				max_similarity = sim
			elif sim == max_similarity:
				NList = sorted([i, j])
				max_customers.append(NList)
				
max_customers = sorted(max_customers, key=lambda x: (x[0], x[1]))

for i in max_customers:
	print(*i)