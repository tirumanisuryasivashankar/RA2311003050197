import React, { useEffect, useState } from 'react';
import { fetchAndSortNotifications, type AppNotification } from './apiUtils';
import { Log } from '../../logging_middleware';
import { 
  Container, Typography, Card, CardContent, 
  Box, Chip, Select, MenuItem, FormControl, InputLabel 
} from '@mui/material';

export default function NotificationApp() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAndSortNotifications();
      setNotifications(data);
    };
    loadData();
  }, []);

  const handleFilterChange = (value: string) => {
    setFilter(value);
    Log("frontend", "info", "state", `Filter changed to ${value}`);
  };

  const filtered = filter === "All" 
    ? notifications 
    : notifications.filter(n => n.Type === filter);

  // MUI color props only accept specific strings like 'error', 'primary', 'success'
  const getPriorityColor = (type: string): "error" | "primary" | "success" | "default" => {
    if (type === "Placement") return "error"; 
    if (type === "Result") return "primary";  
    if (type === "Event") return "success";
    return "default";                         
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Priority Inbox</Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select 
            value={filter} 
            label="Filter" 
            onChange={(e) => handleFilterChange(e.target.value as string)}
          >
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Placement">Placements</MenuItem>
            <MenuItem value="Result">Results</MenuItem>
            <MenuItem value="Event">Events</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filtered.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary">
          No notifications found.
        </Typography>
      ) : (
        filtered.slice(0, 5).map((notif) => (
          <Card key={notif.ID} sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Chip label={notif.Type} color={getPriorityColor(notif.Type)} size="small" />
                <Typography variant="caption" color="text.secondary">
                  {new Date(notif.Timestamp).toLocaleTimeString()}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {notif.Message}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}