const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUser = async (username) =>
  await prisma.user.findFirst({
    where: { username },
  });

exports.createUser = async ({ username, password, email }) => {
  return await prisma.user
    .create({
      data: {
        username,
        password,
        email,
      },
    })
    .catch((err) => {
      console.log("implement error handler", err);
    });
};
