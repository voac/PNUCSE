#include <stdio.h>

int main(void)
{
	int score;

	scanf_s("%d", &score);

	if (score >= 70)
		printf("Pass");
	else
		printf("Fail");

	return 0;
}