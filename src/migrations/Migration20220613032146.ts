import { Migration } from '@mikro-orm/migrations';

export class Migration20220613032146 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null);');

    this.addSql('create table "posts" ("id" serial primary key, "quote" varchar(255) not null);');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "post" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null);');

    this.addSql('create table "post" ("id" serial primary key, "quote" varchar(255) not null);');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "posts" cascade;');
  }

}
