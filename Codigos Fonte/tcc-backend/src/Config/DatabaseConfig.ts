export const DatabaseConfig = {
    development: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "marquinhos2725",
        database: "A2mi_Dev",
        entities: ["./src/Models/*.ts"],
        migrations: ["./src/Database/Migrations/Development/*.ts"],
        cli: {
            migrationsDir: "./src/Database/Migrations/Development",
            entitiesDir: "./src/Models/"
        }
    },
    staging: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "marquinhos2725",
        database: "A2mi_Hom",
        entities: ["./src/Models/*.ts"],
        migrations: ["./src/Database/Migrations/Staging/*.ts"],
        cli: {
            migrationsDir: "./src/Database/Migrations/Staging",
            entitiesDir: "./src/Models/"
        }
    },
    production: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "marquinhos2725",
        database: "A2mi_Prod",
        entities: ["./src/Models/*.ts"],
        migrations: ["./src/Database/Migrations/Production/*.ts"],
        cli: {
            migrationsDir: "./src/Database/Migrations/Production",
            entitiesDir: "./src/Models/"
        }
    }
}