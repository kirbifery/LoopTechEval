
# Playwright Tech Evaluation – Task Validation Suite

This project is a Playwright-based end-to-end test suite written in TypeScript. It validates task visibility and tagging in a demo Asana-style application using a **data-driven approach**, powered by external JSON files.

## Objective

- Automate login to the demo application.
- Validate that tasks appear in the correct columns (e.g., "To Do", "In Progress", "Done").
- Verify that each task has the correct tags.
- Use **external JSON** to drive all test data (no hardcoding).
- Minimize code duplication using a reusable test function.

## Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js

## Project Structure

```

/data
├── websiteTasks.json
└── mobileTasks.json      # Contains test case data
/tests
└── taskValidation.spec.ts # Main test suite
playwright.config.ts
tsconfig.json
package.json

````

## Test Scenarios Covered

| App Section         | Column      | Task                      | Tags                    |
|---------------------|-------------|---------------------------|-------------------------|
| Web Application     | To Do       | Implement user auth       | Feature, High Priority  |
| Web Application     | To Do       | Fix navigation bug        | Bug                     |
| Web Application     | In Progress | Design system updates     | Design                  |
| Mobile Application  | To Do       | Push notification system  | Feature                 |
| Mobile Application  | In Progress | Offline mode              | Feature, High Priority  |
| Mobile Application  | Done        | App icon design           | Design                  |

## Thought Process

- I separated test logic from test data using external JSON files to improve scalability and reduce duplication.
- A shared helper function (`validateTasksInColumns`) dynamically verifies task title and tag visibility based on the input JSON.
- I used TypeScript interfaces to enforce data structure, enabling autocomplete and early error detection.
- The login flow is abstracted into `beforeEach()` to keep tests clean and focused.

## How to Run

### 1. Install dependencies

npm install

### 2. Run tests

npx playwright test


### 3. (Optional) View test report

npx playwright show-report

## Login Info Used

* **URL**: [https://animated-gingersnap-8cf7f2.netlify.app](https://animated-gingersnap-8cf7f2.netlify.app)
* **Username**: `admin`
* **Password**: `password123`

## Notes

* All selectors are scoped to avoid cross-task interference.
* Tests rely on visual headings and roles for accurate targeting.
* No code duplication — all scenarios are driven by data.

## Submission

This project was built for a technical evaluation to demonstrate test automation, code quality, and scalable architecture using Playwright.

---

