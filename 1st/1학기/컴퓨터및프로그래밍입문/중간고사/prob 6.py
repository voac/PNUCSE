from functools import cmp_to_key
def mycomp(w):
    if w[1]== 'c':
        return( 1,  w[2], w[0])
    if w[1]== 'a':
        return( 2,  -w[2], w[0])
L=[
   ("Tomy","a",78),  ("Carry","c", 13),  ("Samdra",  "a", 56),
   ("Zilda","a",36), ("Romio","a", 54),  ("Henry", "c",   8),
   ("Maria","c",6),  ("Olivia", "c", 11),  ("Bessi","c",  12),
   ("Fonte","a",36), ("Denis", "a", 28),   ("Petro",  "a",  43),
  ]
L2 = sorted(L, key=mycomp)
for w in L2 :                # 이 결과를 출력해야 함.
    print(f" : {w[0]}")