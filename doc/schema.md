# DDB Schema

Queries:

- list public authors
- list public works
- list public meditations
- list public meditations by tag
- list meditations by userId

```typescript

// pk: ${userId}, sk: ${access}/author, data:
//
// list public works: gs1 -> sk:
export type Author = {
    id: string,
    name: string,
    info: string,
    works: Work[],

    access: 'PUBLIC' | 'PRIVATE',

    //bookkeeping
    createdAt: Date,
    updatedAt: Date
}

export type Work = {
    id: string,
    name: string,
    info: string,
    year: number,

    public: boolean,

    //bookkeeping
    createdAt: Date,
    updatedAt: Date
}

export type Meditation = {
    id: string,
    name: string,
    text: string,
    audioUrl: string,
    tags: string[],

    public: boolean,

    //relations
    workId: string,
    authorId: string,
    userId: string,

    //bookkeeping
    createdAt: Date,
    updatedAt: Date
}

export enum UserRole = {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export type User = {
    id: string,
    displayName: string,
    emailAddress: string
    role: UserRole
}

```
