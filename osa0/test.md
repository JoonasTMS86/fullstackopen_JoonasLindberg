```mermaid
sequenceDiagram
    participant joonas1
    participant joonas2
    
    joonas1->>joonas2: Diiba daaba duu!
    activate joonas2
    joonas2-->>joonas1: Dabba dabba duu!
    deactivate joonas2
    
    Note right of joonas1: Something
```