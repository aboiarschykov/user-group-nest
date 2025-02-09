const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitiMigration1739129698432 {
    name = 'InitiMigration1739129698432'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "session" ("id" varchar PRIMARY KEY NOT NULL, "expiresAt" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "status" integer NOT NULL, "userId" varchar, CONSTRAINT "REL_3d2f174ef04fb312fdebd0ddc5" UNIQUE ("userId"))`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "lastName", "age", "password") SELECT "id", "name", "lastName", "age", "password" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_session" ("id" varchar PRIMARY KEY NOT NULL, "expiresAt" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "status" integer NOT NULL, "userId" varchar, CONSTRAINT "REL_3d2f174ef04fb312fdebd0ddc5" UNIQUE ("userId"), CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_session"("id", "expiresAt", "createdAt", "status", "userId") SELECT "id", "expiresAt", "createdAt", "status", "userId" FROM "session"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`ALTER TABLE "temporary_session" RENAME TO "session"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "session" RENAME TO "temporary_session"`);
        await queryRunner.query(`CREATE TABLE "session" ("id" varchar PRIMARY KEY NOT NULL, "expiresAt" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "status" integer NOT NULL, "userId" varchar, CONSTRAINT "REL_3d2f174ef04fb312fdebd0ddc5" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "session"("id", "expiresAt", "createdAt", "status", "userId") SELECT "id", "expiresAt", "createdAt", "status", "userId" FROM "temporary_session"`);
        await queryRunner.query(`DROP TABLE "temporary_session"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "lastName", "age", "password") SELECT "id", "name", "lastName", "age", "password" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }
}
