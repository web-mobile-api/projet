// Exclude keys from user
export const exclude = (user, keys) => {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    );
}