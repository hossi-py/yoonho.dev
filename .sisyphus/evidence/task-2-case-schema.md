# Task 2 — Case Study Content Schema and Anonymization Policy

Date: 2026-03-25 (Asia/Seoul)

## 1. Reusable Case Study Schema
All case study pages must follow these 8 sections to ensure consistency and readability for enterprise reviewers.

### Context
Describe the business background and the core problem. What was the goal of the project? Why did it matter to the company?

### Constraints
List the technical and operational limits. These include browser support, legacy code dependencies, tight deadlines, or budget restrictions.

### My Role
Detail your specific contributions. Specify whether you were the lead developer, a component designer, or a performance optimization specialist.

### Decision
Explain the key technical choices. Provide the "why" behind choosing a specific library, architectural pattern, or tool.

### Execution
Describe the implementation process. Focus on how you solved the problem using the chosen tools and how you handled unexpected hurdles.

### Outcome
Present the results using quantitative metrics. Show the impact of your work on performance, user engagement, or operational efficiency.

### Evidence
Provide proof of your claims. This includes screenshots, logs, links to public repositories, or test execution results.

### Limitation
Be honest about what wasn't solved. Discuss the trade-offs you made and what you'd improve if you had more time or resources.

---

## 2. Metric Labels
Every quantitative metric must have one of these 4 labels to establish credibility.

| Label | Meaning | Usage Example |
|---|---|---|
| `verified` | Directly measured from a reliable source (GA, Lighthouse, internal logs). | "Lighthouse performance score: 98 (`verified`)" |
| `anonymized` | Real data that's been scaled or modified to protect privacy. | "Handled 10X more traffic than the previous year (`anonymized`)" |
| `estimate` | A calculated figure based on partial data or reasonable assumptions. | "Estimated 20% reduction in manual QA time (`estimate`)" |
| `reconstruction` | Data reconstructed from memory or similar projects because the original is inaccessible. | "Legacy bundle size was approximately 1.2MB (`reconstruction`)" |

---

## 3. Anonymization Policy
Protecting internal data and client confidentiality is mandatory. Use this checklist before publishing any content.

### Publish-Safety Denylist
- **Real Names**: Do not use names of colleagues, managers, or stakeholders.
- **Client/Company Names**: Do not name specific clients or the employer's internal project code names.
- **Internal Identifiers**: Remove database IDs, internal server IPs, and URLs of private management tools.
- **Sensitive Data**: Avoid exposing exact revenue figures, specific user counts, or private API endpoints.

### Replacement Rules
| Original | Replacement Rule | Example |
|---|---|---|
| Client Name | Use generic alphabet or industry terms. | `A사`, `국내 대형 이커머스`, `S사` |
| Project Name | Use functional descriptions. | `B 프로젝트`, `신규 정산 시스템 구축` |
| Exact Revenue | Use percentage change or relative scale. | "Increased by 150%" or "Reached 2X target" |
| Internal ID | Use generic placeholders or labels. | `[USER_ID]`, `[API_ENDPOINT]` |
| Employee Name | Use roles or titles. | `PM`, `Backend Lead`, `Senior Designer` |

---

## 4. Content Review Checklist
- [ ] Are all 8 sections present?
- [ ] Does every number have a metric label?
- [ ] Is all information in the denylist removed?
- [ ] Are replacement rules applied consistently?
- [ ] Is the evidence block verifiable (links work, screenshots are clear)?
