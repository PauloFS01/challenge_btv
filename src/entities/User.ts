import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property()
  username!: string;

  @Field(() => String)
  @Property()
  password!: string;
}
