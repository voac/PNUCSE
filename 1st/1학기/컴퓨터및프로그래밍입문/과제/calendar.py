import sys

months = int(sys.stdin.readline())
days = list(map(int, sys.stdin.readline().split()))
dow = {0:"월", 1:"화", 2:"수", 3:"목", 4:"금", 5:"토", 6:"일"}
reversed_dow = {v: k for k, v in dow.items()}
j1st = str(sys.stdin.readline().strip())
j1st_dow = reversed_dow[j1st]

for i in range(3):
    m, d = map(int, sys.stdin.readline().split())
    if d  >  days[m-1]:
        print("땡")
    else:
        print(dow[(  j1st_dow  +  sum(days[:m-1])  +  d  -  1  )  %  7])