#include <stdio.h>

int main(void)
{
    int c1, c2;

    c1 = 'A';
    c2 = 'a';

    printf("%d\n", c1);
    printf("%d\n", c2);
    printf("%d\n", c2 - c1);
    
    return 0;
}