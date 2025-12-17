# Reverse an Integer in C

Reverse an Integer in C

# Reverse an Integer

`#include <stdio.h> int main() { int n, rev = 0, remainder; printf("Enter an integer: "); scanf("%d", &n); while (n != 0) { remainder = n % 10; rev = rev * 10 + remainder; n /= 10; } printf("Reversed number = %d", rev); return 0; }`

`#include <stdio.h> int main() { int n, rev = 0, remainder; printf("Enter an integer: "); scanf("%d", &n); while (n != 0) { remainder = n % 10; rev = rev * 10 + remainder; n /= 10; } printf("Reversed number = %d", rev); return 0; }`

**Output**

`Enter an integer: 2345 Reversed number = 5432`

`Enter an integer: 2345 Reversed number = 5432`

This program takes an integer input from the user. Then the `while` loop is used until `n != 0` is false (0).

In each iteration of the loop, the remainder when n is divided by 10 is calculated and the value of n is reduced by 10 times.

Inside the loop, the reversed number is computed using:

rev = rev*10 + remainder;