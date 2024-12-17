import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
} from 'typeorm';
 
@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: number;
 
    @Column({nullable: false})
    name: string;
 
    @Column({ unique: true })
    username: string;
 
    @Column({ unique: true })
    email: string;
 
    @Column()
    password: string;
 
    @Column()
    role: string;
 
    @CreateDateColumn()
    created_at: Date;
}