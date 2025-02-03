const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitiMigration1738619101879 {
    name = 'InitiMigration1738619101879'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
