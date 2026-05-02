// logging_middleware/index.ts

// Your unique access token from the test server
const AUTH_TOKEN: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdDg0ODRAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNTIyNCwiaWF0IjoxNzc3NzA0MzI0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWM4OWNlMGYtNTE1My00ZTNiLThiMTktMzUxOGMzYzcyYTk3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidGlydW1hbmkgc3VyeWEgc2l2YSBzaGFua2FyIiwic3ViIjoiMjA5MmE4NTYtYmU1Ni00MWIwLTkxYWQtNzFhZTM5NGFiOTIyIn0sImVtYWlsIjoic3Q4NDg0QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoidGlydW1hbmkgc3VyeWEgc2l2YSBzaGFua2FyIiwicm9sbE5vIjoicmEyMzExMDAzMDUwMTk3IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiMjA5MmE4NTYtYmU1Ni00MWIwLTkxYWQtNzFhZTM5NGFiOTIyIiwiY2xpZW50U2VjcmV0IjoiRlNtVEZoRlN2a2dTTmNudiJ9.HhdFSMRISrfEGYQQxRy8MHEs_fgPTrqUzCj7EA55RNE"; 

const LOG_API_URL: string = "http://20.207.122.201/evaluation-service/logs";

// 1. Define strict types based on the evaluation constraints
type AllowedStack = "frontend";

type AllowedLevel = "debug" | "info" | "warn" | "error" | "fatal";

// These are specifically the packages allowed for Frontend and Shared
type AllowedPackage = 
  | "api" | "component" | "hook" | "page" 
  | "state" | "style" | "auth" | "config" 
  | "middleware" | "utils";

interface LogPayload {
  stack: AllowedStack;
  level: AllowedLevel;
  package: AllowedPackage;
  message: string;
}

/**
 * Strongly Typed Reusable Logging Function
 */
export const Log = async (
  stack: AllowedStack, 
  level: AllowedLevel, 
  pkg: AllowedPackage, 
  message: string
): Promise<void> => {
  
  const payload: LogPayload = {
    stack: stack,
    level: level,
    package: pkg,
    message: message
  };

  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error("Test Server Logging Failed:", await response.text());
    }
  } catch (error) {
    console.error("Network error while trying to send log:", error);
  }
};