const createUser = ({
    nombre,
    apellidos,
    email,
    password,
    telefono,
    username
}) => {
    return new Promise((resolve, reject) => {
        db.query('insert into usuarios (nombre, apellidos, email, password, telefono, username) value (?, ?, ?, ?, ?, ?)', [nombre, apellidos, email, password, telefono, username], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
};

const getByEmail = (pEmail) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios where email = ?', [pEmail], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        })
    })
}

module.exports = {
    createUser,
    getByEmail
};