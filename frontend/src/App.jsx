import { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [priority, setPriority] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/notifications/1042")
      .then(res => res.json())
      .then(data => setNotifications(data));

    fetch("http://localhost:3000/priority/1042")
      .then(res => res.json())
      .then(data => setPriority(data));
  }, []);

  return (
    <Container>
      <Typography variant="h4">All Notifications</Typography>
      <List>
        {notifications.map(n => (
          <ListItem key={n._id}>
            <ListItemText primary={`${n.notificationType}: ${n.message}`} secondary={n.createdAt} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h4" sx={{ mt: 4 }}>Priority Inbox</Typography>
      <List>
        {priority.map(n => (
          <ListItem key={n._id}>
            <ListItemText primary={`${n.notificationType}: ${n.message}`} secondary={n.createdAt} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
