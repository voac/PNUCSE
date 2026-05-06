def f_define():
    f = {}

    _, fn = input().split()

    for _ in range(int(fn)):
        temp_e = int(input())
        temp_e_poly = input().split()
        temp_e_poly_n = int(( len(temp_e_poly) - 1 ) / 2)

        
        for i in range(temp_e_poly_n):
            temp_poly = {}
            start_index = 2 * i

            part = temp_e_poly[start_index:start_index + 2]
            temp_poly[part[1]] = part[0]
        
        f[temp_e] = temp_poly
    
    return f

def g_define():
    g = {}
    
    _, gn = input().split()

    for _ in range(int(gn)):
        temp_e = int(input())
        temp_e_poly = input().split()
        temp_e_poly_n = int(( len(temp_e_poly) - 1 ) / 2)

        
        for i in range(temp_e_poly_n):
            temp_poly = {}
            start_index = 2 * i

            part = temp_e_poly[start_index:start_index + 2]
            temp_poly[part[1]] = part[0]
        
        g[temp_e] = temp_poly

    return g

def multiply(func1, func2):
    for e1, p1 in func1.items():
        for e2, p2 in func2.items():
            # CONTINUE

f = f_define()
g = g_define()
