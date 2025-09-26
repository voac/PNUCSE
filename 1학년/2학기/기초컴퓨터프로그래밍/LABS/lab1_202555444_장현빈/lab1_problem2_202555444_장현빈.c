#include <stdio.h>

int main(void)
{
    printf("%d", sizeof(char));
    printf("%d", sizeof(int));
    printf("%d", sizeof(short));
    printf("%d", sizeof(double));

    int sum_size = sizeof(char) + sizeof(int) + sizeof(short) + sizeof(double);

    printf("%d", sum_size);

    return 0;
}