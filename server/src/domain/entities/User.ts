import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment", { type: "int" })
  id!: number;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  email!: string;

  @Column({ type: "varchar", nullable: true })
  address?: string;

  @Column({ type: "date", nullable: true })
  birthdate?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  private constructor(
    props: Pick<User, "name" | "email" | "address" | "birthdate">
  ) {
    Object.assign(this, props);
  }

  static create(
    props: Pick<User, "name" | "email" | "address" | "birthdate">
  ): User {
    if (!props.email) {
      throw new Error("Email is required");
    }

    if (!props.name) {
      throw new Error("Name is required");
    }

    return new User(props);
  }

  toJSON() {
    const { id, name, email, address, birthdate, created_at } = this;
    return { id, name, email, address, birthdate, created_at };
  }
}
