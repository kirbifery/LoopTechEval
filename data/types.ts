// Represents a single task card on the board
export interface Task {
    column: string,
    title: string;
    tags: string[];
}

// Represents a project section (Web or Mobile
export interface ProjectData {
    project: string;
    tasks: Task[];
}

// Represents login and app-level configuration
// This data would be stored in a .env or GitHub Secrets if using CI/CD
export interface ProjectConfig {
    url: string;
    username: string;
    password: string;
}
