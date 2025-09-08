Point =[ 20,   30,     50,   65,    80,    90,  100 ]
Grade =['D',  'C0',  'C+', 'B0', 'B+',  'A0', 'A+'] 

score = int(input())

#Sol 1
Grade_index = sum(score > p for p in Point)
your = Grade[Grade_index]


# Sol 2
Grade_index = 0
while score > Point[Grade_index]:
    Grade_index += 1
your = Grade[Grade_index]


print(f"학점= {your}")