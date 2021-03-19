import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GlobalMenuInterceptor implements NestInterceptor {
  constructor(private readonly prismaService: PrismaService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const resolverName = context.getClass().name;
    const obtainedEntities = await this.getEntities();
    const currentsEntitiesToSave = obtainedEntities.entity;
    if (!obtainedEntities.entity.includes(resolverName)) {
      currentsEntitiesToSave.push(resolverName);
    }
    this.saveEntities(currentsEntitiesToSave);

    return next.handle().pipe(tap());
  }

  getEntities = async () => {
    return this.prismaService.globalMenu.findUnique({
      where: {
        id: 1,
      },
      select: {
        entity: true,
      },
    });
  };

  saveEntities = async (entities: string[]) => {
    return this.prismaService.globalMenu.update({
      where: {
        id: 1,
      },
      data: {
        entity: entities,
      },
    });
  };
}
