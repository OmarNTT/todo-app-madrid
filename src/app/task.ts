export interface Task { 
    id?: number;
    title?: string;
    description?: string;
    priority?: number;
    status?: "notstarted" | "started" | "finished";
    date?: string;
}
