import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesService {
    constructor(private prismaService: PrismaService){}
    getAllRoles = async() =>{
        return this.prismaService.roles.findMany();
    }

    createRole = async(name: string, description: string, state: boolean) => {
        return this.prismaService.roles.create({
            data:{
                name: name,
                description: description,
                state: state
            }
        })
    }
}
