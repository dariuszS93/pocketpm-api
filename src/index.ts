import express from 'express';
import cors from 'cors';
import { prisma } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

type Task = { id: string; title: string; done?: boolean };
type Project = { id: string; name: string; tasks: Task[] };

app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/projects', async (_req, res) => {
  try {
    const projects: Project[] = await prisma.project.findMany({
      include: { tasks: true },
      orderBy: { name: 'asc' },
    });

    res.json(projects);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/projects/:id/tasks', async (req, res) => {
  try {
    const { id: projectId } = req.params;
    const titleRaw = req.body?.title;

    const title = typeof titleRaw === 'string' ? titleRaw.trim() : '';
    if (!title) {
      return res.status(400).json({ error: 'title required' });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      return res.status(404).json({ error: 'project not found' });
    }

    const task = await prisma.task.create({
      data: { title, projectId },
      select: { id: true, title: true },
    });

    return res.status(200).json(task);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to add task' });
  }
});

app.patch('/tasks/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.task.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ error: 'task not found' });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: { done: !existing.done },
      select: { id: true, title: true, done: true },
    });

    res.json(updated);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to toggle task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.task.findUnique({ where: { id } });

    if(!existing) {
      return res.status(404).json({ error: 'task not found' });
    }

    await prisma.task.delete({ where: { id } });
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to delete task'});
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`API listening on http://localhost:${port}`),
);

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
