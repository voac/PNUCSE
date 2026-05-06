#include <stdio.h>

int main(void)
{
    // 변수 선언 후 초기화 방법도 있음.
    // int kor; / kor = 0;
    // int kor = 0, eng = 0, math = 0;
    // int eng = 0;
    // int math = 0;

    // init
    int kor, eng, math, sum;
    double avg;
    
    kor = 59;
    eng = 74;
    math = 69;

    // calc sum and avg
    sum = kor + eng + math;
    avg = (double) sum / 3;

    // print all var
    printf("국어 : %d \n영어 : %d \n수학 : %d \n합계 : %d \n평균 : %f \n", kor, eng, math, sum, avg);

    return 0;
}