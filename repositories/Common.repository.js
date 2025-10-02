const prisma = require("../models");

class CommonRepository {
  constructor(model, data, options) {
    this.model = model;
    this.data = data;
    this.options = options;
  }

  // Helper function to convert string IDs to integers for Prisma
  convertStringIdsToInt = (whereCondition) => {
    if (whereCondition?.id && typeof whereCondition?.id === 'string') {
      whereCondition.id = parseInt(whereCondition?.id);
    }

    // Handle other common ID fields that might be strings
    if (whereCondition?.userId && typeof whereCondition?.userId === 'string') {
      whereCondition.userId = parseInt(whereCondition?.userId);
    }
    if (whereCondition?.courseId && typeof whereCondition?.courseId === 'string') {
      whereCondition.courseId = parseInt(whereCondition?.courseId);
    }
    if (whereCondition?.organisationId && typeof whereCondition?.organisationId === 'string') {
      whereCondition.organisationId = parseInt(whereCondition?.organisationId);
    }
    if (whereCondition?.sectionId && typeof whereCondition?.sectionId === 'string') {
      whereCondition.sectionId = parseInt(whereCondition?.sectionId);
    }
    if (whereCondition?.teamId && typeof whereCondition?.teamId === 'string') {
      whereCondition.teamId = parseInt(whereCondition?.teamId);
    }

    return whereCondition;
  };

  create = async () => {
    return await prisma[this.model].create({
      data: this.data
    });
  };

  get = async () => {
    console.log("this.options in get: ", this.data);
    // Handle both direct data and nested where conditions
    const whereCondition = this?.data?.where || this?.data;
    delete this.data.where;
    const options = this?.data || {};
    // Convert string IDs to integers for Prisma
    this.convertStringIdsToInt(whereCondition);

    return await prisma[this.model].findFirst({
      where: whereCondition,
      ...options
    });
  };

  getAll = async () => {
    // Handle both direct data and nested where conditions
    const whereCondition = this?.data?.where || this?.data;

    // Convert string IDs to integers for Prisma
    this.convertStringIdsToInt(whereCondition);

    return await prisma[this.model].findMany({
      where: whereCondition,
      ...this.options
    });
  };

  update = async () => {
    console.log("this.data in update: ", this.data);
    console.log("this.options in update: ", this.options);
    // Handle both direct options and nested where conditions
    const whereCondition = this.options.where || this.options;

    // Convert string IDs to integers for Prisma
    this.convertStringIdsToInt(whereCondition);

    return await prisma[this.model]
      .update({
        where: whereCondition,
        data: this.data
      })
      .catch((err) => console.log(err));
  };

  delete = async () => {
    console.log("this.data in delete: ", this.data);
    // Handle both direct data and nested where conditions
    const whereCondition = this?.data?.where || this?.data;
    console.log("whereCondition in delete: ", whereCondition);
    // Convert string IDs to integers for Prisma
    this.convertStringIdsToInt(whereCondition);

    return await prisma[this.model].delete({
      where: whereCondition
    });
  };

  findAllAndCount = async () => {
    console.log("this.data in findAllAndCount: ", this.data);
    const whereCondition = this.data.where || this.data || {};
    delete this.data.where;
    const options = this.data || {};
    console.log("options in findAllAndCount: ", options);
    // Convert string IDs to integers for Prisma
    this.convertStringIdsToInt(whereCondition);
    console.log("whereCondition: ", whereCondition);
    const [data, count] = await Promise.all([
      prisma[this.model].findMany({
        where: whereCondition,
        orderBy: {
          id: "desc"
        },
        ...options
      }),
      prisma[this.model].count({
        where: whereCondition
      })
    ]);
    console.log("data: ", data);
    return { rows: data, count };
  };

  count = async () => {
    console.log("this.data in count: ", this.data);
    // Handle both direct data and nested where conditions
    const whereCondition = this?.data?.where || this?.data;

    // Convert string IDs to integers for Prisma
    this.convertStringIdsToInt(whereCondition);

    return await prisma[this.model]?.count({
      where: whereCondition
    });
  };

  findOrCreate = async () => {
    // Handle both direct data and nested where conditions
    const whereCondition = this.data.where || this.data;

    // Convert string IDs to integers for Prisma
    this.convertStringIdsToInt(whereCondition);

    return await prisma[this.model].upsert({
      where: whereCondition,
      update: this.data.update || {},
      create: this.data.create || this.data
    });
  };

  bulkCreate = async () => {
    return await prisma[this.model]
      .createMany({
        data: this.data,
        skipDuplicates: true
      })
      .catch((err) => console.log(err));
  };

  findOrCreateOrUpdate = async () => {
    // Handle both direct options and nested where conditions
    const whereCondition = this.options.where || this.options;

    // Convert string IDs to integers for Prisma
    this.convertStringIdsToInt(whereCondition);

    const result = await prisma[this.model].findFirst({
      where: whereCondition
    });
    if (result) {
      return prisma[this.model].update({
        where: { id: result.id },
        data: this.data
      });
    } else {
      return prisma[this.model].create({
        data: this.data
      });
    }
  };
}

module.exports = CommonRepository;
