result = {}

for _ in range(2):
    _, n = input().split()

    for _ in range(int(n)):
        c, e = map(int, input().split())
        result[e] = result.get(e, 0) + c

result = {e: c for e, c in result.items() if c != 0}
sorted_result = sorted(result.keys(), reverse=True)

if not result:
    print("0 0")
else:
    print("s", len(result))
    for e in sorted_result:
        print(result[e], e)
