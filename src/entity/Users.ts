import { Field, ObjectType } from "type-graphql";
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("Users")
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  playername: string;

  @Field()
  @Column()
  playertag: string;

  @Field()
  @Column("text", { unique: true })
  uid: string;
}
