#include <stdio.h>

int main(void)
{
	int day, hour, minute, second;

	scanf_s("%d %d %d %d", &day, &hour, &minute, &second);

	printf("%d", day * 60 * 60 * 24 + hour * 60 * 60 + minute * 60 + second);

	return 0;
}