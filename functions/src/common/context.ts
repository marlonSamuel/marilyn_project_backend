// context.ts
let userId: number | null = null;

export const setUserId = (user: any | null) => {
    if(user) userId = user!.user.id;
};

export const getUserId = () => userId;