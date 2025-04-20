print(f"\n> prob 4 ")
L= list("Korea_Pusan")
K= L[1:-1]
print(K)
K.reverse()
print(K)
L[1:-2] = K
print(L)
Out = "".join(L)
print(f"> ans. Out= {Out}")