const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json()); // middleware, pass json come through body of request

app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

app.post("/", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });
  res.json(newUser);
});

app.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const newAge = req.body.age;

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: { age: newAge },
  });

  res.json(updatedUser);
});
app.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(userId) },
  });

  res.json(deletedUser);
});

app.listen(3000, () => console.log(`Server running on port 3000`));
