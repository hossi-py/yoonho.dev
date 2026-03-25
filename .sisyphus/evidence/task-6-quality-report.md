# Task 6 — Quality Report Aggregation

- **Timestamp**: 2026-03-25T01:54:41.285Z
- **Commit Hash**: `7cd2143b879afae87d732fffe154f5def9626513`

## Summary Table

| Gate | Status | Duration | Failure Reference |
| :--- | :---: | :--- | :--- |
| lint | ✅ PASS | 7.47s | - |
| typecheck | ✅ PASS | 3.62s | - |
| test | ✅ PASS | 4.25s | - |
| test:e2e | ✅ PASS | 11.94s | - |
| check:links | ✅ PASS | 3.75s | - |
| check:content | ✅ PASS | 0.69s | - |
| lighthouse:ci | ❌ FAIL | 45.77s | [Report](https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1774403754920-88694.report.html) |

## Detailed Results

### lint (PASS)

```text
> next-app@0.1.0 lint C:\Users\hyh_k\Desktop\workspace\yoonho.dev\next-app
> eslint --no-error-on-unmatched-pattern src tests scripts *.config.*


C:\Users\hyh_k\Desktop\workspace\yoonho.dev\next-app\scripts\aggregate-quality.mjs
  2:25  warning  'mkdirSync' is defined but never used  @typescript-eslint/no-unused-vars
  9:10  warning  'e' is defined but never used          @typescript-eslint/no-unused-vars

✖ 2 problems (0 errors, 2 warnings)
```

### typecheck (PASS)

```text
> next-app@0.1.0 typecheck C:\Users\hyh_k\Desktop\workspace\yoonho.dev\next-app
> tsc --noEmit
```

### test (PASS)

```text
> next-app@0.1.0 test C:\Users\hyh_k\Desktop\workspace\yoonho.dev\next-app
> vitest run


[1m[46m RUN [49m[22m [36mv3.2.4 [39m[90mC:/Users/hyh_k/Desktop/workspace/yoonho.dev/next-app[39m

 [32m✓[39m tests/unit/home-page.test.tsx [2m([22m[2m1 test[22m[2m)[22m[32m 39[2mms[22m[39m

[2m Test Files [22m [1m[32m1 passed[39m[22m[90m (1)[39m
[2m      Tests [22m [1m[32m1 passed[39m[22m[90m (1)[39m
[2m   Start at [22m 10:54:53
[2m   Duration [22m 2.41s[2m (transform 83ms, setup 0ms, collect 509ms, tests 39ms, environment 1.09s, prepare 274ms)[22m
```

### test:e2e (PASS)

```text
> next-app@0.1.0 test:e2e C:\Users\hyh_k\Desktop\workspace\yoonho.dev\next-app
> playwright test


Running 1 test using 1 worker
·
  1 passed (9.2s)
```

### check:links (PASS)

```text
> next-app@0.1.0 check:links C:\Users\hyh_k\Desktop\workspace\yoonho.dev\next-app
> node ./scripts/check-links.mjs

[ok] https://github.com/vercel/next.js -> HTTP 200
[ok] https://nextjs.org -> HTTP 200
[ok] https://nextjs.org/docs -> HTTP 200
[ok] https://nextjs.org/docs/app/api-reference/cli/create-next-app -> HTTP 200
[ok] https://nextjs.org/docs/app/building-your-application/deploying -> HTTP 200
[ok] https://nextjs.org/docs/app/building-your-application/optimizing/fonts -> HTTP 200
[ok] https://nextjs.org/learn -> HTTP 200
[ok] https://vercel.com/font -> HTTP 200
[ok] https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme -> HTTP 200

[check:links] Passed (9 links checked).
```

### check:content (PASS)

```text
> next-app@0.1.0 check:content C:\Users\hyh_k\Desktop\workspace\yoonho.dev\next-app
> node ./scripts/check-content.mjs

[check:content] Passed (12 tracked files scanned).
```

### lighthouse:ci (FAIL)

> [!IMPORTANT]
> This gate failed.
> **Failure Reference**: [https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1774403754920-88694.report.html](https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1774403754920-88694.report.html)
> See logs below for details.

```text
... (truncated)
ion build ...
✓ Compiled successfully in 4.1s
  Running TypeScript ...
  Finished TypeScript in 4.8s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/8) ...
  Generating static pages using 7 workers (2/8) 
  Generating static pages using 7 workers (4/8) 
  Generating static pages using 7 workers (6/8) 
✓ Generating static pages using 7 workers (8/8) in 1205ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /case-studies
├ ○ /contact
└ ○ /lab


○  (Static)  prerendered as static content

✅  .lighthouseci/ directory writable
✅  Configuration file found
✅  Chrome installation found
⚠️   GitHub token not set
Healthcheck passed!

Started a web server with "pnpm start"...
Running Lighthouse 1 time(s) on http://localhost:3000/
Run #1...done.
Done running Lighthouse!


Uploading median LHR of http://localhost:3000/...success!
Open the report at https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1774403754920-88694.report.html
No GitHub token set, skipping GitHub status check.

 ELIFECYCLE  Command failed with exit code 1.
Checking assertions against 1 URL(s), 1 total run(s)

9 result(s) for [1mhttp://localhost:3000/[0m :

  [31m×[0m  [1mlabel-content-name-mismatch[0m failure for [1mminScore[0m assertion
       Elements with visible text labels do not have matching accessible names.
       https://dequeuniversity.com/rules/axe/4.10/label-content-name-mismatch

        expected: >=[32m0.9[0m
           found: [31m0[0m
      [2mall values: 0[0m


  [31m×[0m  [1mlegacy-javascript-insight[0m failure for [1mminScore[0m assertion
       Legacy JavaScript
       https://web.dev/articles/baseline-and-polyfills

        expected: >=[32m0.9[0m
           found: [31m0[0m
      [2mall values: 0[0m


  [31m×[0m  [1mnetwork-dependency-tree-insight[0m failure for [1mminScore[0m assertion
       Network dependency tree
       https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains

        expected: >=[32m0.9[0m
           found: [31m0[0m
      [2mall values: 0[0m


  [31m×[0m  [1munused-javascript[0m failure for [1mmaxLength[0m assertion
       Reduce unused JavaScript
       https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/

        expected: <=[32m0[0m
           found: [31m1[0m
      [2mall values: 1[0m


  ⚠️  [1mlargest-contentful-paint[0m warning for [1mminScore[0m assertion
       Largest Contentful Paint
       https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/

        expected: >=[32m0.9[0m
           found: [31m0.69[0m
      [2mall values: 0.69[0m


  ⚠️  [1mlegacy-javascript[0m warning for [1mmaxLength[0m assertion
       Avoid serving legacy JavaScript to modern browsers
       https://web.dev/baseline

        expected: <=[32m0[0m
           found: [31m1[0m
      [2mall values: 1[0m


  ⚠️  [1mmax-potential-fid[0m warning for [1mminScore[0m assertion
       Max Potential First Input Delay
       https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/

        expected: >=[32m0.9[0m
           found: [31m0.59[0m
      [2mall values: 0.59[0m


  ⚠️  [1mrender-blocking-insight[0m warning for [1mmaxLength[0m assertion
       Render blocking requests
       https://web.dev/learn/performance/understanding-the-critical-path#render-blocking_resources

        expected: <=[32m0[0m
           found: [31m1[0m
      [2mall values: 1[0m


  ⚠️  [1mrender-blocking-resources[0m warning for [1mmaxLength[0m assertion
       Eliminate render-blocking resources
       https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/

        expected: <=[32m0[0m
           found: [31m1[0m
      [2mall values: 1[0m

Assertion failed. Exiting with status code 1.
assert command failed. Exiting with status code 1.
```

---
*Generated automatically by `pnpm report:quality`*
