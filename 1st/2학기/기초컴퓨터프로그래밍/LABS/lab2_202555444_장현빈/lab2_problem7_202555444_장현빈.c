#include <stdio.h>

int main(void)
{
	double dist, time;

	scanf_s("%lf %lf", &dist, &time);

	printf("%.2lf", dist / time);

	return 0;
}