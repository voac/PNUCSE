#include <stdio.h>

int main(void)
{
    // initial settings
    float dollar, rate;
    int won = 100000;

    // calculate the dollar amount each day
    rate = 1069.50;
    dollar = won / rate;
    printf("mon rate : %.2f, 100k won is %.2f dollar.\n", rate, dollar);

    rate = 1071.40;
    dollar = won / rate;
    printf("tue rate : %.2f, 100k won is %.2f dollar.\n", rate, dollar);
    
    rate = 1072.65;
    dollar = won / rate;
    printf("wed rate : %.2f, 100k won is %.2f dollar.\n", rate, dollar);
    
    rate = 1073.00;
    dollar = won / rate;
    printf("thu rate : %.2f, 100k won is %.2f dollar.\n", rate, dollar);
    
    rate = 1071.50;
    dollar = won / rate;
    printf("fri rate : %.2f, 100k won is %.2f dollar.\n", rate, dollar);
    
    // to prevent instant close
    scanf("e");

    return 0;
}