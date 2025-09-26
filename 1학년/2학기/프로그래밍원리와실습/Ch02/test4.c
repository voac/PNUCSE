#include <stdio.h>

int main(void)
{
    double num = 123.456;
    int a = 0;
    double b = 0;

    a = (int) num;
    b = num - a;

    printf("숫자 : %f\n", num);
    printf("정수부 : %d\n", a);
    printf("실수부 : %f\n", b);

    return 0;
}