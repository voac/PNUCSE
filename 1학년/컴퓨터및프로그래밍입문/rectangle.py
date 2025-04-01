"""
생각해본 것
-   어떻게 하면 두 사각형의 모서리 좌표 ((x1a, y1a), (x2a, y2a), (x1b, y1b), (x2b, y2b))로
    x축에서 겹치는 길이와 y축에서 겹치는 길이를 구할 수 있을까?
    ( x1a < x2a,  y1a < y2a,  x1b < x2b,  y1b < y2b )
    
    -   겹치는 구간의 시작점 : 항상 x1a, x1b를 비교했을 때 x좌표가 더 큰 곳에서 시작함.
        겹치는 구간의 끝점   : 항상 x2a, x2b를 비교했을 때 x좌표가 더 작은 곳에서 끝남.

        -  위 2가지를 조합해서 x축에서 겹치는 길이를 min(x2a, x2b) - max(x1a, x1b)로 계산할 수 있음!
           똑같은 논리로 y축에서 겹치는 길이 역시 min(y2a, y2b) - max(y1a, y1b)로 계산할 수 있는 것!

           -   이를 통해 얻은 겹치는 길이가
               x, y 둘 다 딱 0이다! -> 한 점에서 만난다는 것!
               x, y 중 하나만 0이다! -> 한 선분에서 만난다는 것!
               x, y 둘 다 양수다! -> 겹치는 면적이 존재한다는 것!
               x, y 둘 다 음수다! -> 만나지 않는다는 것!
"""


def overlap(rect1, rect2):
    x1a, y1a, x2a, y2a = rect1
    x1b, y1b, x2b, y2b = rect2

    x = min(x2a, x2b) - max(x1a, x1b)             # x축의 겹치는 길이
    y = min(y2a, y2b) - max(y1a, y1b)             # y축의 겹치는 길이
    
    if x < 0 or y < 0:           return   "NULL"       # 겹치는 부분이 없을 때
    elif x == 0 and y == 0:      return   "POINT"      # 겹치는 점이 있을 때
    elif x == 0 or y == 0:       return   "LINE"       # 겹치는 선분이 있을 때
    return "FACE"

import sys

for i in range(4):
    coords = list(map(int, sys.stdin.readline().split()))
    print(overlap(coords[:4], coords[4:]))        # 8개 좌표값 중 앞 4개는 rect1, 뒤 4개는 rect2로 설정 후 함수 호출