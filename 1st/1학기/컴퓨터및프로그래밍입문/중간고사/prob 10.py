prob = [ 0.3, 0.15, 0.1, 0.01, 0.002 ]
import random 
def get_item( ) :
    r = random.random()
    c = 0
    for i,p in enumerate(prob):
        c += p
        if r < c:
            return (i+1)
    return (0)

for _ in range(10):
    print(get_item())

# return 값은 {0, 1, 2, 3, 4, 5}