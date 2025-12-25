# Factorial In C

Factorial In C

# Factorial

> The factorial of a positive number n is given by: factorial of n (n!) = 1 * 2 * 3 * 4 … n The factorial of a negative number doesn’t exist. And the factorial of 0 is 1.

`\#include <stdio.h>  
int main() {  
int n, i;  
unsigned long long fact = 1;  
printf(“Enter an integer:”);  
scanf(“%d”, &n);

```Plain
// shows error if the user enters a negative integer
if (n < 0)
    printf("Error! Factorial of a negative number doesn't exist.");
else {
    for (i = 1; i <= n; ++i) {
        fact *= i;
    }
    printf("Factorial of %d = %llu", n, fact);
}

return 0;
```

}`

`\#include <stdio.h>  
int main() {  
int n, i;  
unsigned long long fact = 1;  
printf(“Enter an integer:”);  
scanf(“%d”, &n);

```Plain
// shows error if the user enters a negative integer
if (n < 0)
    printf("Error! Factorial of a negative number doesn't exist.");
else {
    for (i = 1; i <= n; ++i) {
        fact *= i;
    }
    printf("Factorial of %d = %llu", n, fact);
}

return 0;
```

}`

# Using Recursion

`\#include<stdio.h>  
long int multiplyNumbers(int n);  
int main() {  
int n;  
printf(“Enter a positive integer:”);  
scanf(“%d”,&n);  
printf(“Factorial of %d = %ld”, n, multiplyNumbers(n));  
return 0;  
}

long int multiplyNumbers(int n) {  
if (n>=1)  
return n*multiplyNumbers(n-1);  
else  
return 1;  
}`

`\#include<stdio.h>  
long int multiplyNumbers(int n);  
int main() {  
int n;  
printf(“Enter a positive integer:”);  
scanf(“%d”,&n);  
printf(“Factorial of %d = %ld”, n, multiplyNumbers(n));  
return 0;  
}

long int multiplyNumbers(int n) {  
if (n>=1)  
return n*multiplyNumbers(n-1);  
else  
return 1;  
}`

> Output Enter a positive integer: 6 Factorial of 6 = 720