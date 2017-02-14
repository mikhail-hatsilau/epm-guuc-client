const fetchUser = (id) =>
    Promise.resolve({ user: { username: 'jest' } });

export default {
    fetchUser
};
