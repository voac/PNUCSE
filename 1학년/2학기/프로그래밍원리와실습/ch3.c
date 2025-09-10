#include <stdio.h>

int main(void)
{
	// initial settings
	int sum = 0, score;

	const float PI = 3.14;
	double r, area;

	short no_univ = 340;
	int population = 51269544;
	int budget = 447200;

	// example of summation
	score = 70;
	sum = sum + score;
	printf("score is %d and sum is %d now.\n", score, sum);

	score = 100;
	sum = sum + score;
	printf("score is %d and sum is %d now.\n", score, sum);

	score = 80;
	sum = sum + score;
	printf("score is %d and sum is %d now.\n", score, sum);

	score = 90;
	sum = sum + score;
	printf("score is %d and sum is %d now.\n\n", score, sum);

	// calculate area of circle by its radius
	r = 50.0;
	area = PI * r * r;
	printf("area is : %.2f\n\n", area);

	// variable sizeof
	printf("char size : %d\n", sizeof(char));
	printf("short size : %d\n", sizeof(short));
	printf("int size : %d\n", sizeof(int));
	printf("long size : %d\n\n", sizeof(long));
	
	// range of variable
	printf("data\n");
	printf("univ : %d\n", no_univ);
	printf("popu : %d\n", population);
	printf("budg : %d\n", budget);

	// to prevent instant close
	scanf("e");

	return 0;
}