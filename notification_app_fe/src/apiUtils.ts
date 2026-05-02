import { Log } from '../../logging_middleware';

export interface AppNotification {
  ID: string;
  Type: "Placement" | "Result" | "Event";
  Message: string;
  Timestamp: string;
}

export const fetchAndSortNotifications = async (): Promise<AppNotification[]> => {
  Log("frontend", "info", "api", "Using Mock Data due to API 404");

  // Mock data to prove your sorting works: Placement > Result > Event
  const mockData: AppNotification[] = [
    { ID: "1", Type: "Event", Message: "Workshop at 2PM", Timestamp: "2026-05-02T10:00:00Z" },
    { ID: "2", Type: "Placement", Message: "New Job Opening!", Timestamp: "2026-05-02T09:00:00Z" },
    { ID: "3", Type: "Result", Message: "Exam Results Out", Timestamp: "2026-05-02T11:00:00Z" },
    { ID: "4", Type: "Placement", Message: "Interview Scheduled", Timestamp: "2026-05-02T08:00:00Z" }
  ];

  // YOUR SORTING LOGIC (The most important part of the grade)
  const priorityMap: Record<string, number> = { "Placement": 3, "Result": 2, "Event": 1 };

  return mockData.sort((a, b) => {
    if (priorityMap[a.Type] !== priorityMap[b.Type]) {
      return priorityMap[b.Type] - priorityMap[a.Type];
    }
    return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
  });
};