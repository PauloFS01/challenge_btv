import { Posts } from "../entities/Posts";
import { MyContext } from "src/types";
import { Ctx, Query, Resolver, Arg, Mutation } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Posts])
  posts(@Ctx() { em }: MyContext): Promise<Posts[]> {
    return em.find(Posts, {});
  }

  @Query(() => Posts, { nullable: true })
  post(@Arg("id") id: number, @Ctx() { em }: MyContext): Promise<Posts | null> {
    return em.findOne(Posts, { id });
  }

  @Mutation(() => Posts, { nullable: true })
  async createPost(
    @Arg("quote") quote: string,
    @Ctx() { em }: MyContext
  ): Promise<Posts | null> {
    const post = em.create(Posts, { quote });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Posts, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("quote", () => String, { nullable: true }) quote: string,
    @Ctx() { em }: MyContext
  ): Promise<Posts | null> {
    const post = await em.findOne(Posts, { id });
    if (!post) {
      return null;
    }
    if (typeof quote !== "undefined") {
      post.quote = quote;
      await em.persistAndFlush(post);
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Boolean> {
    await em.nativeDelete(Posts, { id });
    return true;
  }
}
