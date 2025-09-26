#include <stdio.h>

int main(void)
{
    double a = 12345.6789;
    int b = a;
    float c = a;

    printf("%f\n", a);
    printf("%d\n", b);
    printf("%f\n", c);

    return 0;
}