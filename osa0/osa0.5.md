```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: selain suorittaa spa.js JavaScript-koodin
    activate server
    server-->>browser: spa.js hakee muistiinpanot JSON-formaatissa ja lisää ne samalle sivulle
    deactivate server
    
    Note right of browser: spa.js hakee data.json:sta muistiinpanot ja lisää DOM-APIa käyttäen muistiinpano-HTML-elementit samalle sivulle. selain ei lataa uutta sivua eikä redirectaa.
```