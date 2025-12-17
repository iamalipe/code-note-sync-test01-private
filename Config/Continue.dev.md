C:\Users\Abhiseck\.continue

config.yaml

```YAML
name: LM Studio
version: 1.0.0
schema: v1
models:
  - name: qwen2.5-coder-7b
    provider: lmstudio
    model: qwen2.5-coder-7b-instruct
    apiBase: http://localhost:1234/v1
    roles:
      - chat
      - edit
      - apply
  - name: qwen2.5-coder-0.5b
    provider: lmstudio
    model: qwen2.5-coder-0.5b-instruct
    apiBase: http://localhost:1234/v1
    roles:
      - autocomplete
  - name: text-embedding-nomic-embed-text-v1.5
    provider: lmstudio
    model: text-embedding-nomic-embed-text-v1.5
    apiBase: http://localhost:1234/v1
    roles:
      - embed
context:
  - provider: code
  - provider: docs
  - provider: diff
  - provider: terminal
  - provider: problems
  - provider: folder
  - provider: codebase
```