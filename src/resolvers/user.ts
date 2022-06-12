import { User } from "../entities/User";
import { MyContext } from "../types";
import { Resolver, Mutation, Arg, InputType, Field, Ctx } from "type-graphql";
import * as argon2 from "argon2";

@InputType()
class UsernamePasswordInut {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UsernamePasswordInut,
    @Ctx() { em }: MyContext
  ) {
    const cryptedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: cryptedPassword,
    });
    await em.persistAndFlush(user);
    return user;
  }
}
