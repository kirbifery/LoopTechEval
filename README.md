```md
# ✅ Playwright Tech Evaluation – Data-Driven Task Validation Suite

This is a Playwright-based end-to-end test suite written in TypeScript. It validates that tasks in an Asana-style demo app appear in the correct columns and have the correct tags — using a fully **data-driven approach**.

---

## 🎯 Objective

- ✅ Automate login to the app using provided credentials.
- ✅ Navigate to project sections ("Web Application" / "Mobile Application").
- ✅ Validate tasks under correct columns with expected tags.
- ✅ Use JSON to drive **all** test data and configuration.
- ✅ Refactor logic into a **single scalable test** to minimize duplication.

---

## 🧠 Thought Process

- I refactored the original tests into a **single reusable test** that dynamically runs validations for both Web and Mobile tasks.
- I separated:
  - **Test logic** into a single `taskValidation.spec.ts` file
  - **Environment config** (like credentials and URL) into `projectConfig.json`
  - **Test data** (project names, task columns, tags, and UI confirmation text) into `taskData.json`
- I created a `types.ts` file for type safety, making the test easier to maintain and less error-prone.

> ✅ This meets the requirement of being completely **data-driven** and scalable as more projects/tasks are added.

---

## 🔧 Tech Stack

- [Playwright](https://playwright.dev/) – end-to-end test framework
- TypeScript – for strong typing and maintainability
- JSON – for fully externalized test data and config

---

## 🧪 Test Scenarios Covered

All data below is driven from `taskData.json`.

| App Section         | Column      | Task                      | Tags                    |
|---------------------|-------------|---------------------------|-------------------------|
| Web Application     | To Do       | Implement user auth       | Feature, High Priority  |
| Web Application     | To Do       | Fix navigation bug        | Bug                     |
| Web Application     | In Progress | Design system updates     | Design                  |
| Mobile Application  | To Do       | Push notification system  | Feature                 |
| Mobile Application  | In Progress | Offline mode              | Feature, High Priority  |
| Mobile Application  | Done        | App icon design           | Design                  |

---

## 🔐 Login Credentials Used

These are stored in `data/projectConfig.json`:
This data would normally be stored in a .env or Github Secrets if using CI/CD

```json
{
  "url": "https://animated-gingersnap-8cf7f2.netlify.app/",
  "username": "admin",
  "password": "password123"
}
```

---

## 📌 Summary

This solution is:

* ✅ Fully data-driven using JSON
* ✅ Refactored into a single test for scalability
* ✅ Free of hardcoded UI or config values
* ✅ Maintains clarity, separation of concerns, and type safety

---

Thanks for reviewing my submission!

```

