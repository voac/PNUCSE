#include <stdio.h>

int main(void)
{
	char ch;

	scanf_s("%c", &ch);
	printf("\"%c\"\\", ch);

	return 0;
}