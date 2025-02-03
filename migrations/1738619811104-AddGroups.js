const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddGroups1738619811104 {
    name = 'AddGroups1738619811104'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "groups" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "users_groups_groups" ("usersId" integer NOT NULL, "groupsId" integer NOT NULL, PRIMARY KEY ("usersId", "groupsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1b46034fbd69664807cb4afb16" ON "users_groups_groups" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_270e39efd76d142903fd6ed528" ON "users_groups_groups" ("groupsId") `);
        await queryRunner.query(`DROP INDEX "IDX_1b46034fbd69664807cb4afb16"`);
        await queryRunner.query(`DROP INDEX "IDX_270e39efd76d142903fd6ed528"`);
        await queryRunner.query(`CREATE TABLE "temporary_users_groups_groups" ("usersId" integer NOT NULL, "groupsId" integer NOT NULL, CONSTRAINT "FK_1b46034fbd69664807cb4afb16f" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_270e39efd76d142903fd6ed528f" FOREIGN KEY ("groupsId") REFERENCES "groups" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("usersId", "groupsId"))`);
        await queryRunner.query(`INSERT INTO "temporary_users_groups_groups"("usersId", "groupsId") SELECT "usersId", "groupsId" FROM "users_groups_groups"`);
        await queryRunner.query(`DROP TABLE "users_groups_groups"`);
        await queryRunner.query(`ALTER TABLE "temporary_users_groups_groups" RENAME TO "users_groups_groups"`);
        await queryRunner.query(`CREATE INDEX "IDX_1b46034fbd69664807cb4afb16" ON "users_groups_groups" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_270e39efd76d142903fd6ed528" ON "users_groups_groups" ("groupsId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_270e39efd76d142903fd6ed528"`);
        await queryRunner.query(`DROP INDEX "IDX_1b46034fbd69664807cb4afb16"`);
        await queryRunner.query(`ALTER TABLE "users_groups_groups" RENAME TO "temporary_users_groups_groups"`);
        await queryRunner.query(`CREATE TABLE "users_groups_groups" ("usersId" integer NOT NULL, "groupsId" integer NOT NULL, PRIMARY KEY ("usersId", "groupsId"))`);
        await queryRunner.query(`INSERT INTO "users_groups_groups"("usersId", "groupsId") SELECT "usersId", "groupsId" FROM "temporary_users_groups_groups"`);
        await queryRunner.query(`DROP TABLE "temporary_users_groups_groups"`);
        await queryRunner.query(`CREATE INDEX "IDX_270e39efd76d142903fd6ed528" ON "users_groups_groups" ("groupsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1b46034fbd69664807cb4afb16" ON "users_groups_groups" ("usersId") `);
        await queryRunner.query(`DROP INDEX "IDX_270e39efd76d142903fd6ed528"`);
        await queryRunner.query(`DROP INDEX "IDX_1b46034fbd69664807cb4afb16"`);
        await queryRunner.query(`DROP TABLE "users_groups_groups"`);
        await queryRunner.query(`DROP TABLE "groups"`);
    }
}
