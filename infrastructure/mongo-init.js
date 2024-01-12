db.createUser(
    {
        user: "ccd",
        pwd: "ccdpass",
        roles: [
            {
                role: "readWrite",
                db: "ccd"
            }
        ]
    }
);