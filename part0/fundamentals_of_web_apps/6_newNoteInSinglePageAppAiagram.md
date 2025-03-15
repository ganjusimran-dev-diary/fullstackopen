``` mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: The POST request to the address new_note_spa contains the new note as JSON data {content: "ok", date: "2025-03-15T14:48:22.051Z"}
    server-->>browser: 201 Created (Respone: {"message":"note created"})
    deactivate server
    Note left of server: Server does not ask for a redirect, the browser stays on the same page