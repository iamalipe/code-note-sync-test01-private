# Markdown Features Demo

## Headings

### Level 3 Heading

#### Level 4 Heading

##### Level 5 Heading

###### Level 6 Heading

---

## Text Formatting

This is **bold text** and this is _italic text_.

This is **_bold and italic text_**.

This is ~~strikethrough text~~.

This is `inline code`.

---

## Lists

### Unordered List

- Item 1
- Item 2
  - Nested Item 2.1
  - Nested Item 2.2
- Item 3

### Ordered List

1. First item
2. Second item
   1. Nested Item 2.1
   2. Nested Item 2.2
3. Third item

### Task List

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

---

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

> This is a nested blockquote.
>
> > Even deeper nested blockquote.

---

## Code Blocks

### Inline Code

Use `const greeting = "Hello";` for basic variables.

### Code Block (General)

```
function helloWorld() {
  console.log("Hello, World!");
}
```

### Code Block (JavaScript)

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

### Code Block (Python)

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```

### Code Block (JSON)

```json
{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "skills": ["JavaScript", "Python", "React"]
}
```

---

## Links

[Link to OpenAI](https://openai.com)

[Link with title](https://github.com "Visit GitHub")

---

## Images

![Alt text](https://via.placeholder.com/150)

![Placeholder Image](https://via.placeholder.com/300x200)

---

## Tables

| Name    | Age | City        |
| ------- | --- | ----------- |
| Alice   | 25  | New York    |
| Bob     | 30  | Los Angeles |
| Charlie | 28  | Chicago     |

| Feature | Description         | Status         |
| ------- | ------------------- | -------------- |
| Login   | User authentication | ✅ Complete    |
| Search  | Find items          | 🔄 In Progress |
| Export  | Download data       | ❌ Pending     |

---

## Horizontal Line

---

---

## Escaping Characters

\*This is not italic\*

\[Not a link\]

---

## HTML Elements

<details>
<summary>Click to expand</summary>

Hidden content goes here!

</details>

<br>

---

## Emphasis Variations

**Bold** or **Bold**

_Italic_ or _Italic_

**_Bold and Italic_** or **_Bold and Italic_**

---

## Mixed Content

> **Note:** This is an important blockquote with **bold text** and _italic text_.

- List item with `code`
- List item with [link](https://example.com)
- List item with **bold** and _italic_

---

## Markdown References

### Footnotes

This is a footnote reference[^1].

[^1]: This is the footnote content.

### Line Breaks

Line 1
Line 2 (with two spaces before)

Line 3

Line 4 (with empty line above)

---

## Mathematical Expressions

Inline math: $E = mc^2$

Block math:

$$
\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

---

## Special Symbols

© ® ™ € £ ¥ • ‰ ‱ ① ② ③

---

## Common Markdown Use Cases

### Installation Instructions

```bash
npm install my-package
yarn add my-package
pip install my-package
```

### Directory Structure

```
project/
├── src/
│   ├── components/
│   ├── pages/
│   └── styles/
├── public/
├── package.json
└── README.md
```

### API Documentation

**Endpoint:** `GET /api/users/:id`

**Parameters:**

- `id` (required): User ID

**Response:**

```json
{
  "id": 1,
  "name": "John",
  "email": "john@example.com"
}
```

---

## Summary

This document demonstrates all major Markdown features including:

- Headings (H1-H6)
- Text formatting (bold, italic, strikethrough)
- Code (inline and blocks)
- Lists (ordered, unordered, nested)
- Task lists
- Blockquotes
- Links and images
- Tables
- Horizontal lines
- HTML elements
- Mathematical expressions
- And more!
