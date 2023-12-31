import { getSelf } from "./auth-service";
import { db } from "./db";

export const getRecomanded = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select:{
            isLive:true
          }
        },
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select:{
            isLive:true
          }
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
