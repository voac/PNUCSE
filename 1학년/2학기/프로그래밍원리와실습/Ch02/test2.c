#include <stdio.h>
#define PI 3.141592

int main(void)
{
    int radius = 5;
    double area, cir;
    // const double pi = 3.141592;

    cir = 2 * radius * PI;
    area = radius * radius * PI;

    // cir = 2 * radius * pi;
    // area = radius * radius * pi;

    printf("%f\n", cir);
    printf("%f\n", area);

    return 0;
}