#include <stdio.h>

int main(void)
{
	double height, weight;

	scanf_s("%lf %lf", &height, &weight);

	height /= 100;

	printf("%.3lf", weight / (height * height));

	return 0;
}