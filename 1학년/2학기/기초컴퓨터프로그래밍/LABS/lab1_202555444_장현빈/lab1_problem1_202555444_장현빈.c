#include <stdio.h>

int main(void)
{
    int C_degree = 30, F_degree;

    F_degree = (C_degree * 9) / 5 + 32;

    printf("%d", F_degree);

    return 0;
}