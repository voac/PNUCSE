import sys
a,b,c = sorted(map(int, sys.stdin.readline().split()))
print(0 if (a + b <= c) else 1 if (a**2 + b**2 == c**2) else 2 if (a**2 + b**2 < c**2) else 3)