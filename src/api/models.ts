export interface Message {
    id: number;
    text: string;
    tags: string[];
}
export interface MessageFromClient {
    text: string;
    tags: string[];
}

export interface MessageFromSQL {
    id: number;
    text: string;
    tags: string;
}

export interface InsertResult {
    insertId: number;
}
