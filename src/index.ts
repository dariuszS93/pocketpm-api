import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

type Task = { id: string; title: string; done?: boolean };
type Project = { id: string; name: string; tasks: Task[] };

const projects: Project[] = [
  {
    id: '1',
    name: 'PocketPM Alpha',
    tasks: [{ id: 't1', title: 'Simple MVP' }],
  },
  {
    id: '2',
    name: 'Website Redesign',
    tasks: [{ id: 't2', title: 'Create readme' }],
  },
];

app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/projects', (req, res) => res.json(projects));

app.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const proj = projects.find((p) => p.id === id);
  if (!proj) return res.status(404).json({ error: 'project not found' });
  const task = { id: `t${Date.now()}`, title };
  proj.tasks.push(task);
  return res.status(201).json(task);
});

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`API listening on http://localhost:${port}`),
);
