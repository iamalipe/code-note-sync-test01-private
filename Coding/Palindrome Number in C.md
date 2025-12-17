# Palindrome Number in C

Palindrome Number in C

# Palindrome Number

**An integer is a palindrome if the reverse of that number is equal to the original number.**

`\#include <stdio.h>  
int main() {  
int n, reversedN = 0, remainder, originalN;  
printf(“Enter an integer:”);  
scanf(“%d”, &n);  
originalN = n;

```Plain
// reversed integer is stored in reversedN
while (n != 0) {
    remainder = n % 10;
    reversedN = reversedN * 10 + remainder;
    n /= 10;
}

// palindrome if orignalN and reversedN are equal
if (originalN == reversedN)
    printf("%d is a palindrome.", originalN);
else
    printf("%d is not a palindrome.", originalN);

return 0;
```

}`

`\#include <stdio.h>  
int main() {  
int n, reversedN = 0, remainder, originalN;  
printf(“Enter an integer:”);  
scanf(“%d”, &n);  
originalN = n;

```Plain
// reversed integer is stored in reversedN
while (n != 0) {
    remainder = n % 10;
    reversedN = reversedN * 10 + remainder;
    n /= 10;
}

// palindrome if orignalN and reversedN are equal
if (originalN == reversedN)
    printf("%d is a palindrome.", originalN);
else
    printf("%d is not a palindrome.", originalN);

return 0;
```

}`

**Output**

`Enter an integer: 1001 1001 is a palindrome.`

`Enter an integer: 1001 1001 is a palindrome.`