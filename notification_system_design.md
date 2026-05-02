# Notification System Design & Priority Inbox

## 1. Priority Sorting Algorithm (Stage 1)
I implemented a multi-level sorting strategy to ensure critical academic and career updates are prioritized:
- **Primary Sort:** Weighted categories (Placement: 3, Result: 2, Event: 1).
- **Secondary Sort:** Chronological order (Newest first) for items within the same category to maintain real-time relevance.
- **Complexity:** Utilizes a $O(n \log n)$ approach for efficient rendering of large notification sets.

## 2. Frontend Implementation (Stage 2)
- **Framework:** Developed with React and Material UI (MUI) to create a responsive, student-centric design.
- **State Management:** Utilized React Hooks (`useState`, `useEffect`) to manage real-time filtering and API hydration.
- **Resilience:** Implemented a version-stable environment (React 18.2.0) to resolve complex library dependency conflicts and ensure stable Hook execution.

## 3. Middleware Integration
- **Telemetry:** Integrated a custom logging middleware that tracks UI state changes and API success/failure in real-time.
- **Security:** Implemented strict header-based authorization using verified Bearer tokens for all telemetry log payloads.
- **Graceful Degradation:** The system is designed to remain fully functional for the user even if the telemetry service encounters latency or server-side errors.
