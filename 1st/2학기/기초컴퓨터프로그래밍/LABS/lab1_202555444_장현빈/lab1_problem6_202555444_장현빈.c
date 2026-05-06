#include <stdio.h>
#define tax_rate 1.1

int main(void)
{
    int sum_price= 3000;
    double final_price = sum_price * tax_rate;

    printf("%f", final_price);

    return 0;
}