#include <stdio.h>

int main(void)
{
	int num1, num2;

	scanf_s("%d %d", &num1, &num2);

	printf("%d", num1 / num2);
	printf("\n%d", num1 % num2);

	return 0;
}