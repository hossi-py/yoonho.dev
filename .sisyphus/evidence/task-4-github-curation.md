# Task 4: GitHub Public Profile Curation & Normalization

## Pinned Repository Selection
The following repositories have been selected for pinning on the GitHub profile `hossi-py` to highlight enterprise-level technical expertise, architectural breadth, and professional growth.

| Repository | Status | Logic |
|---|---|---|
| `yoonho.dev` | Local / Public | The primary portfolio entry point, demonstrating multi-framework capability (Next.js 16.2.1, Vue 2.6.14). |
| `portfolio-server` | Local / Public | Enterprise-grade backend breadth using Java Spring Boot 4.0.4 and Gradle. |
| `mobile-wedding-invite` | Remote / Public | Recent shipped product-style work with a concrete end-user surface. |
| `wedding` | Remote / Public | Additional recent product delivery evidence. |
| `TIL` | Remote / Public | Evidence of continuous learning and operational growth. |
| `mindwiki` | Remote / Public | Original non-fork product work that adds breadth without relying on forks. |

### Verification Details
- **`hossi-portfolio`**: Previously claimed as public, but verified as NOT accessible (404) via `gh api repos/hossi-py/hossi-portfolio`. Retained locally for normalization only.
- **`yoonho.dev`**: Verified version `next: 16.2.1`, `react: 19.2.4`, `vue: 2.6.14`.
- **`portfolio-server`**: Verified version `spring-boot: 4.0.4`.

## README Normalization Summary
The following repositories had their README files normalized to the `Problem / Role / Tech / Run / Result` structure for recruiter-friendly scanning.

### 1. `yoonho.dev` (Root)
- **Location**: Current workspace root
- **Changes**: Corrected versions to Next.js 16.2.1 and Vue 2.6.14. Corrected styling claim to Tailwind CSS v4.
- **Normalized**: Yes

### 2. `next-app` (Portfolio Sub-project)
- **Location**: `./next-app`
- **Changes**: Corrected versions to Next.js 16.2.1 and React 19.2.4. Corrected styling claim to Tailwind CSS v4. Removed incorrect SCSS Modules claim.
- **Normalized**: Yes

### 3. `portfolio-server`
- **Location**: `../portfolio-server`
- **Changes**: Documented Spring Boot 4.0.4 and Gradle architecture.
- **Normalized**: Yes

### 4. `hossi-portfolio`
- **Location**: `../hossi-portfolio`
- **Changes**: Normalized to the standard structure despite 404 status on GitHub.
- **Normalized**: Yes

## GitHub CLI Pinning Outcome: BLOCKED
Current pinned repo query result:

```json
{"data":{"viewer":{"login":"hossi-py","pinnedItems":{"nodes":[]}}}}
```

Attempted to pin the selected repositories via GraphQL mutation. Both `setPinnedItems` and `updatePinnedItems` failed with `Field '...' doesn't exist on type 'Mutation'`.

### Attempt 1: `setPinnedItems`
- **Mutation**:
  ```graphql
  mutation($ids: [ID!]!) {
    setPinnedItems(input: { itemIds: $ids }) {
      pinnedItems { totalCount }
    }
  }
  ```
- **Error**: `{"message":"Field 'setPinnedItems' doesn't exist on type 'Mutation'","extensions":{"code":"undefinedField","typeName":"Mutation","fieldName":"setPinnedItems"}}`

### Attempt 2: `updatePinnedItems`
- **Mutation**:
  ```graphql
  mutation($ids: [ID!]!) {
    updatePinnedItems(input: { itemIds: $ids }) {
      pinnedItems { totalCount }
    }
  }
  ```
- **Error**: `{"message":"Field 'updatePinnedItems' doesn't exist on type 'Mutation'","extensions":{"code":"undefinedField","typeName":"Mutation","fieldName":"updatePinnedItems"}}`

Verified schema check:
- `__type(name:"Mutation")` includes `pinIssue`, `pinIssueComment`, and `pinEnvironment`
- no repository-profile pin mutation is exposed in the available schema response for this environment

**Conclusion**: The current GitHub GraphQL API schema available to this environment does not support programmatic profile repository pinning. The curated list above is the verified recommended manual pin set.

## Broken Link & Badge Check
- **`yoonho.dev`**: Clean.
- **`portfolio-server`**: Clean.
- **`hossi-portfolio`**: Clean.
- Standard Next.js boilerplate links were verified to be up-to-date.

## Next Steps
- This curation serves as a baseline for narrating technical maturity in subsequent tasks (Task 7-10).
