#include <stdio.h>

int main(void)
{
	int a;
	
	scanf_s("%d", &a);

	if (a % 2 == 0)
		printf("even");
	else
		printf("odd");

	return 0;
}