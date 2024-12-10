export const createUser = async (SQLClient, {name, firstname, address, email, password}) => {
    const {rows} = await SQLClient.query(
      "INSERT INTO client(name, firstname, address, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [
            name,
            firstname,
            address,
            email,
            password
        ]
    );
    return rows[0];
};