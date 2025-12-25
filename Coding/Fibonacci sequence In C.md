# Fibonacci sequence In C

Fibonacci sequence In C

# Fibonacci sequence

**The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21**

The Fibonacci sequence is a sequence where the next term is the sum of the previous two terms. The first two terms of the Fibonacci sequence are 0 followed by 1.

`\#include <stdio.h>  
int main() {  
int i, n, t1 = 0, t2 = 1, nextTerm;  
printf(“Enter the number of terms:”);  
scanf(“%d”, &n);  
printf(“Fibonacci Series:”);

```Plain
for (i = 1; i <= n; ++i) {
    printf("%d, ", t1);
    nextTerm = t1 + t2;
    t1 = t2;
    t2 = nextTerm;
}

return 0;
```

}`

`\#include <stdio.h>  
int main() {  
int i, n, t1 = 0, t2 = 1, nextTerm;  
printf(“Enter the number of terms:”);  
scanf(“%d”, &n);  
printf(“Fibonacci Series:”);

```Plain
for (i = 1; i <= n; ++i) {
    printf("%d, ", t1);
    nextTerm = t1 + t2;
    t1 = t2;
    t2 = nextTerm;
}

return 0;
```

}`

> Output Enter the number of terms: 10 Fibonacci Series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34,

# Fibonacci Sequence Up to a Certain Number

`\#include <stdio.h>  
int main() {  
int t1 = 0, t2 = 1, nextTerm = 0, n;  
printf(“Enter a positive number:”);  
scanf(“%d”, &n);

```Plain
// displays the first two terms which is always 0 and 1
printf("Fibonacci Series: %d, %d, ", t1, t2);
nextTerm = t1 + t2;

while (nextTerm <= n) {
    printf("%d, ", nextTerm);
    t1 = t2;
    t2 = nextTerm;
    nextTerm = t1 + t2;
}

return 0;
```

}`

`\#include <stdio.h>  
int main() {  
int t1 = 0, t2 = 1, nextTerm = 0, n;  
printf(“Enter a positive number:”);  
scanf(“%d”, &n);

```Plain
// displays the first two terms which is always 0 and 1
printf("Fibonacci Series: %d, %d, ", t1, t2);
nextTerm = t1 + t2;

while (nextTerm <= n) {
    printf("%d, ", nextTerm);
    t1 = t2;
    t2 = nextTerm;
    nextTerm = t1 + t2;
}

return 0;
```

}`

> Output Enter a positive integer: 100 Fibonacci Series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89,

# Use recursion

`//Fibonacci Series using Recursion  
\#include<stdio.h>  
int fib(int n)  
{  
if (n <= 1)  
return n;  
return fib(n-1) + fib(n-2);  
}

int main ()  
{  
int n = 9;  
printf(“%d”, fib(n));  
getchar();  
return 0;  
}`

`//Fibonacci Series using Recursion  
\#include<stdio.h>  
int fib(int n)  
{  
if (n <= 1)  
return n;  
return fib(n-1) + fib(n-2);  
}

int main ()  
{  
int n = 9;  
printf(“%d”, fib(n));  
getchar();  
return 0;  
}`

```Plain
                                                    `fib(5)
                 /                \
           fib(4)                fib(3)
         /        \              /       \
     fib(3)      fib(2)         fib(2)   fib(1)
    /    \       /    \        /      \
```

fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)  
/

fib(1) fib(0)`

```Plain
                                                    `fib(5)
                 /                \
           fib(4)                fib(3)
         /        \              /       \
     fib(3)      fib(2)         fib(2)   fib(1)
    /    \       /    \        /      \
```

fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)  
/

fib(1) fib(0)`