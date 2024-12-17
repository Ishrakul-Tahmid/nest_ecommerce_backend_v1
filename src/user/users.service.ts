import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './users.entity';
import { UpdateUserDto } from "./update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>
    ) {}

    create(name: string, username: string, email: string, password: string, role: string) {
        const user = this.repo.create({ name, username, email, password, role });
        return this.repo.save(user);
    }

    findOne(user_id: number) {
        if (!user_id) {
            return null;
        }
        return this.repo.findOneBy({ user_id });
    }

    find() {
        return this.repo.find();
    }

    async update(user_id: number, body: Partial<UpdateUserDto>) {
        const user = await this.findOne(user_id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, body); 
        return this.repo.save(user); 
    }

    async remove(user_id: number) {
        const user = await this.repo.findOne({ where: { user_id } });
    
        if (!user) {
          throw new NotFoundException('User not found');
        }
      
        await this.repo.remove(user);
      
        return { message: 'User deleted successfully' };
      }
      
}
