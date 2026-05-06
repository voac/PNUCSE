"""
생각해본 것
-   어떻게 하면 N * M 크기의 리스트에 spiral 형식으로 숫자를 채워나갈 수 있을까?

    -   처음엔 아래 모양 그대로 채우는 방법을 생각했었음.
        5 6  7  8  9  10 11
        4 23 24 25 26 27 12
        3 22 33 34 35 28 13
        2 21 32 31 30 29 14
        1 20 19 18 17 16 15
        그러나 위 방법처럼 채울 시 cell_num과 cell_coord 간의 변환이 매우 까다로움을 알게 됨.

        -   이를 해결할 방법을 찾던 중, 1번 cell이 (1,1)의 좌표를 갖는다는 것을 보고
            문제에서 주어진 리스트를 시계 방향으로 90도 회전하면 쉽게 해결될 것이라는 것을 알게 됨!!!
             1  2  3  4  5  
            20 21 22 23  6  
            19 32 33 24  7  
            18 31 34 25  8  
            17 30 35 26  9  
            16 29 28 27 10  
            15 14 13 12 11 <-- 이런 식으로

        -   따라서 [[0] * m for i in range(n)]를 이용해 M * N의 배열을 리스트 형식으로 만들었고,
            grid[x][y]의 형식으로 표현하여 좌표와 숫자간 변환이 용이하도록 하였음!

+   .get()에 대한 설명
-   num_coord.get(15, (0, 0))에서 딕셔너리에 15가 없으면 (0, 0)을 반환한다는 것임!
    get(key, default)는 딕셔너리에서 key가 없을 때 기본값을 줄 수 있는 안전한 방법임.

+   * 언패킹 연산자의 의미
-   print(num_coord[8]) 하면 -> (3, 2) 이렇게 튜플 형태로 출력됨
    그러나 우리가 원하는 답은 3 2 <- 이런 식으로 띄어쓰기로 구분된 결과임!
    따라서 * 이라는 언패킹 연산자를 이용해 해당 튜플을 띄어쓰기로 구분되도록 언패킹(Unpacking) 하는 것!
"""

import sys

# 문제에서 주어진 리스트를 시계 방향으로 90도 회전하여 생각해볼 수 있음.

def cell_num(n, m):
    grid = [[0] * m for i in range(n)]
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]  # 우, 하, 좌, 상
    x, y, d = 0, 0, 0  # 리스트 시작 위치 = (0, 0) -> 실제 좌표 값 (1, 1)
    num_coord = {}
    coord_num = {}
    
    for num in range(1, n * m + 1):
        grid[x][y] = num
        num_coord[num] = (x + 1, y + 1) 
        coord_num[(x + 1, y + 1)] = num

        nx, ny = x + directions[d][0], y + directions[d][1]
        if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] == 0:
            x, y = nx, ny
        else:
            d = (d + 1) % 4  # 방향 전환
            x, y = x + directions[d][0], y + directions[d][1]
    
    return num_coord, coord_num

n, m = map(int, sys.stdin.readline().split())
num_coord, coord_num = cell_num(n, m)

for _ in range(4):
    query = list(map(int, sys.stdin.readline().split()))
    
    if len(query) == 1:
        num = query[0]
        print(*num_coord.get(num, (0, 0)))
    else:
        coord = tuple(query)
        print(coord_num.get(coord, 0))