won = 1000000
wpe = 1571

e = won // wpe

h = e // 100
f = (e - 100*h) // 50
t = (e - 100*h - 50*f) // 10
o = (e - 100*h - 50*f - 10*t)

print(h, f, t, o, sep=" ")