const express = require("express");
const requireAuth = require("../middlewares/auth.middleware");
const { PrismaClient } = require("../mongo-client");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.user.userId,
      },
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await prisma.post.updateMany({
      where: { id, authorId: req.user.userId },
      data: { title, content },
    });

    if (post.count === 0)
      return res.status(403).json({ message: "unauthorised" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  res.json({ posts });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.deleteMany({
      where: { id, authorId: req.user.userId },
    });
    if (post.count === 0)
      return res.status(403).json({ error: "Not authorized" });

    res.json({ message: "Post deleted" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
