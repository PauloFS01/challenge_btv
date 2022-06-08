import { Migration } from '@mikro-orm/migrations';

export class Migration20220606041753 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "quote" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "post" cascade;');
  }

}
