#include <stdio.h>

int main(void)
{
    int c;

    c = 'A';
    printf("char of c : %c\n", c);
    printf("ascii of c : %d\n\n", c);

    c = c + 1;
    printf("char of c : %c\n", c);
    printf("ascii of c : %d\n\n", c);

    return 0;
}