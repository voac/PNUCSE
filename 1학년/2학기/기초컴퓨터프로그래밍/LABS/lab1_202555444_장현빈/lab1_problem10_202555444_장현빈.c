#include <stdio.h>
#define increase_rate 1.08

int main(void)
{
    int init_value = 250;

    init_value *= increase_rate;
    printf("%.2f\n", init_value);

    init_value *= increase_rate;
    printf("%.2f\n", init_value);

    init_value *= increase_rate;
    printf("%.2f\n", init_value);

    init_value *= increase_rate;
    printf("%.2f\n", init_value);

    return 0;
}