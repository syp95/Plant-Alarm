const parseNameLength = (userName: string | null | undefined) => {
    if (userName === null || userName === undefined) {
        return '';
    }
    if (userName.length === 3) {
        return userName.slice(1, 3);
    } else if (userName.length === 4) {
        return userName.slice(2, 4);
    } else {
        return userName;
    }
};

export { parseNameLength };
