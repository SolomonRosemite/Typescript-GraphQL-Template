import { Users } from "../entity/Users";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => [Users])
  async getPlayers() {
    return await Users.find();
  }
}
