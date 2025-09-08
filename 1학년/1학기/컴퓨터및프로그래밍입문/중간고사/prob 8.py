S="abbbcfgheeertpowwwsz"
Out=""

for i in S:
    if i not in Out: Out += i

print(f"> Out = { Out }") # 결과 Out =abcfghertpows