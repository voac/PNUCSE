#include <stdio.h>

int main(void)
{
    enum ranks {
        bronze = 5, silver = 15, gold = 20, platinum = 30, diamond = 40, master = 60
    };

    enum ranks rank;
    double sum_score = 0;

    rank = bronze;
    sum_score += rank;

    rank = platinum;
    sum_score += rank;

    rank = master;
    sum_score += rank;

    printf("%.2f\n", sum_score / 3);

    return 0;
}