const getDateNow = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');

    let dateNow = `${year}-${month}-${day}`;
    return dateNow;
};

export { getDateNow };
