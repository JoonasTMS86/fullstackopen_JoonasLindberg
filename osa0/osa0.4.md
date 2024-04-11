sequenceDiagram
    participant joonas1
    participant joonas2
    
    joonas1->>joonas2: Testiteksti!
    activate joonas2
    joonas2-->>joonas1: Toinen testiteksti!
    deactivate joonas2
    
    Note right of joonas1: stuff!