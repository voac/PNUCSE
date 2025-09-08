def left_rotate(L, n):
    for i in range(n%len(L)):
        L.append(L.pop(0))

def right_rotate(L, n):
    for i in range(n%len(L)):
        L.insert(0, L.pop())

X=list("PythonX")
left_rotate(X,3)
print(X)
right_rotate(X,2)
print(X)
right_rotate(X,1)
print(X)
right_rotate(X,4)
print(X)
left_rotate(X,100)
print(X)