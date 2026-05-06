#include "minNumber.h"

int main(void)
{
	int a, b, c, temp;

	scanf_s("%d %d %d", &a, &b, &c);

	temp = minNumber(a, b);
	printf("%d", minNumber(temp, c));
}