h1, h2 = input().split()

def win(h1, h2):
    if h1 == h2:
        print("D")
    elif (h1 == "R" and h2 == "S") or (h1 == "S" and h2 == "P") or (h1 == "P" and h2 == "R"):
        print(h1)
    else:
        print(h2)

win(h1, h2)