import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { BaseFilter } from "src/utils/pagination/baseFilter";
import { PaginationUtils } from "src/utils/pagination/paginationList";


export class BaseRepository<T> {
  constructor(
    private readonly _model: string,
    public readonly prismaService: PrismaService,
  ) { }

  async create(data: Partial<T>, transaction?: Prisma.TransactionClient): Promise<T> {
    const database = transaction ?? this.prismaService;
    return await database[this._model].create({ data }) as Promise<T>;
  }

  async update(id: string, updateDate: Partial<T>, transaction?: Prisma.TransactionClient): Promise<T> {
    const database = transaction ?? this.prismaService;
    return database[this._model].update({
      where: { id },
      data: {
        ...updateDate,
        updatedAt: new Date()
      }
    });
  }

  async updateMany(where: any, data: any, transaction?: Prisma.TransactionClient): Promise<T[]> {
    const database = transaction ?? this.prismaService;
    return database[this._model].updateMany({
      where,
      data: {
        ...data,
        updatedAt: new Date()
      }
    })
  }

  async delete(id: string, transaction?: Prisma.TransactionClient): Promise<T> {
    const database = transaction ?? this.prismaService;
    return database[this._model].update({
      where: { id },
      data: {
        deletedAt: new Date()
      }
    });
  }

  async deleteMany(ids: string[], transaction?: Prisma.TransactionClient): Promise<T> {
    const database = transaction ?? this.prismaService;
    return database[this._model].updateMany({
      where: {
        id: {
          in: ids
        }
      },
      data: {
        deletedAt: new Date()
      }
    });
  }

  async pagination(where: any = null, include: any = null, filter: BaseFilter, select: any = null) {
    return await PaginationUtils.applyPagination(this.prismaService[this._model], {
      where,
      ...include,
      ...filter,
      select,
    });
  }

  async findOneById(id: string, include: any = null, select: any = null): Promise<T | null> {
    return this.prismaService[this._model].findFirst({
      where: { id, deletedAt: null },
      include,
      select,
    });
  }

  async findAll(where: any = null, select: any = null, transaction?: Prisma.TransactionClient): Promise<T[]> {
    const database = transaction ?? this.prismaService;
    return database[this._model].findMany({ ...where && { where: { ...where, deletedAt: null } }, select });
  }
}
