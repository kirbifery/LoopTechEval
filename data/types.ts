// Represents a single task card on the board
export interface Task {
    column: string,
    title: string;
    tags: string[];
}

// Represents a project section (Web or Mobile
export interface ProjectData {
    project: string;
    confirmText: string;
    tasks: Task[];
}

// Represents login and app-level configuration
export interface ProjectConfig {
    url: string;
    username: string;
    password: string;
}