import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
@Entity('like')
export class Like {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  drinkId: number;

  @ManyToOne((type) => User, (user) => user.likes)
  user: User;

  @ManyToOne((type) => Recipe, (drink) => drink.likes, {
    eager: true,
  })
  drink: Recipe;
}
