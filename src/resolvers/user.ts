import { Users } from "../entities/Users";
import { MyContext } from "../types";
import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
  ObjectType,
} from "type-graphql";
import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

@InputType()
class UsernamePasswordInut {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Users, { nullable: true })
  userId?: number;

  @Field({ nullable: true })
  token?: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInut,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "usename",
            message: "Shold be greater then 2",
          },
        ],
      };
    }
    if (options.password.length <= 3) {
      return {
        errors: [
          {
            field: "password",
            message: "Shold be greater then 3",
          },
        ],
      };
    }
    try {
      const cryptedPassword = await argon2.hash(options.password);
      const user = em.create(Users, {
        username: options.username,
        password: cryptedPassword,
      });
      await em.persistAndFlush(user);
      return { userId: user.id };
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
      return {
        errors: [
          {
            field: "user",
            message: "username to create user",
          },
        ],
      };
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInut,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(Users, { username: options.username });
    console.log(`this is  find: ${user?.id}`);
    if (!user) {
      console.log("I am here!");
      return {
        errors: [
          {
            field: "login error",
            message: "this user doesn't exist",
          },
        ],
      };
    }
    const isCorrect = await argon2.verify(user.password, options.password);
    if (!isCorrect) {
      return {
        errors: [
          {
            field: "login",
            message: "username or password are incorrect",
          },
        ],
      };
    }
    console.log(typeof process.env.JWT_SECRET);
    const secret: string = process.env.JWT_SECRET!;

    const token = sign({ id: user.id }, secret, {
      expiresIn: "1d",
    });
    return { token };
  }
}
