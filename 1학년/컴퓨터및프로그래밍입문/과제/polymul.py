#함수 곱 정의
def multiply(D1, D2):
    s = {}
    for e1, c1 in D1.items():
        for e2, c2 in D2.items():
            s[e1 + e2] = s.get(e1 + e2, 0) + (c1 * c2)
    return s

# 초기 변수 설정
f = {}
t = {}

# 함수 입력받기
_, fn = input().split()

for i in range(int(fn)):
    c, e = map(int, input().split())
    f[e] = f.get(e, 0) + c

_, tn = input().split()

for i in range(int(tn)):
    c, e = map(int, input().split())
    t[e] = t.get(e, 0) + c

s = multiply(f, t) # s를 f 함수와 t 함수의 곱으로 설정
s = {e: c for e, c in s.items() if c != 0}  # 계수가 0이 아닌 항목만 필터링
s_e = sorted(s.keys(), reverse=True)  # e 값만 내림차순 정렬 (index로 사용할 것임.)

if not s:
    print("0 0")
else:
    print("s", len(s))
    for e in s_e:
        print(s[e], e)