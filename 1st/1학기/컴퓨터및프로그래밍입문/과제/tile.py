h = list(map(int, input().split()))

VList = [0 for i in range(h[0])]

for i in range(h[0]):
	tem = 0
	
	for j in h:
		if i+1 <= j:
			tem += 1
			
	VList[i] = tem
	
VList.append(0)

print(*VList)