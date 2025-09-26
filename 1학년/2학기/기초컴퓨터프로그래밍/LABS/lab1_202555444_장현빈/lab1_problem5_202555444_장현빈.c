#include <stdio.h>
#define PI 3.14

int main(void)
{
    int r = 10;
    double area;

    area = PI * r * r * 0.5;

    printf("%.2f", area);
    
    return 0;
}