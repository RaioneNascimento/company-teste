import { createPaginator } from 'prisma-pagination';

import { BaseFilter } from './baseFilter';

export class PaginationUtils {
  static async applyPagination(entity: any, filter: BaseFilter): Promise<any> {
    try {
      const {
        perPage,
        page,
      } = filter;

      const paginate = createPaginator({ perPage });

      let where = filter.where;
      where['deletedAt'] = null
      let orderBy = filter.orderBy;

      const result = await paginate<any, any>(
        entity,
        {
          where,
          orderBy: orderBy ? orderBy : { createdAt: 'desc' }
        },
        { page },
      );


      return result;
    }
    catch (e) {
      console.log(e);
    }

  }
}

