import mongoose, { isValidObjectId } from "mongoose";
import { adminsLogsHelper } from "../../helpers/adminsLogsHelper.js";
import {
  generateOptions,
  GenerateSearchQuery,
} from "../../helpers/mongooseHelper.js";
import { slugGenerator } from "../../helpers/slugGenerator.js";
import Faq from "../../models/cms/faq.schema.js";
import Item from "../../models/ecommerce/item.schema.js";
import Varient from "../../models/ecommerce/varient.schema.js";
import Post from "../../models/cms/post.schema.js";
import Categories from "../../models/configuration/master/categories.schema.js";

export const getItems = async (req, res) => {
  try {
    const query = GenerateSearchQuery(req, {
      deletedAt: null,
    });
    const options = generateOptions(req);
    const items = await Item.paginate(query, {
      ...options,
      sort: { createdAt: -1 },
    });

    return res.status(200).json({
      status: "success",
      message: "fetch Items successfully",
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTrashItem = async (req, res) => {
  try {
    const query = GenerateSearchQuery(req, {
      deletedAt: { $ne: null },
    });
    const options = generateOptions(req);
    const Items = await Item.paginate(query, options);

    return res.status(200).json({
      status: "success",
      message: "fetch Trash Items successfully",
      data: Items,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getItemByID = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      _id: id,
    };

    const response = await Item.findOne(query);
    return res.status(201).json({
      status: "success",
      message: "Item fetch successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createItem = async (req, res) => {
  try {
    const data = req.body;

    data.slug = await slugGenerator(data?.name, Item);

    if (
      data?.faqs?.values &&
      data?.faqs?.values?.length > 0 &&
      data?.faqs?.values[0]?.ques
    ) {
      const slug = await slugGenerator(data?.name, Faq);
      const faqPayload = {
        slug: slug,
        type: "item",
        values: data?.faqs?.values,
      };

      const faqs = await Faq.create(faqPayload);
      data.faqs = faqs?._id;
    } else {
      delete data.faqs;
    }
    data.brand = data?.brand?.value;
    data.tages = data?.tages?.map((tag) => tag?.value);
    data.categories = data?.categories?.map((cat) => cat?.id);

    const variantsData = data.varients;
    delete data.varients;

    const item = await Item.create({
      ...data,
    });

    if (data.type === "variants" && Array.isArray(variantsData)) {
      const variantsWithItemId = await Promise.all(
        variantsData.map(async (v) => {
          const variantSlug = await slugGenerator(v.name, Varient);
          return {
            ...v,
            slug: variantSlug,
            itemId: item._id,
          };
        }),
      );
      const variants = await Varient.create(variantsWithItemId);

      const variantIds = variants.map((v) => v._id);

      await Item.findByIdAndUpdate(item._id, {
        $set: { varients: variantIds },
      });
    }
    await adminsLogsHelper(req, "Item create successfully");
    return res.status(201).json({
      status: "success",
      message: "Item create successfully",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const query = {
      _id: id,
    };
    if (data?.faqs && data?.faqs?._id) {
      const faqPayload = {
        values: data.faqs.values,
      };
      const faqs = await Faq.updateOne({ _id: data.faqs._id }, faqPayload);
      data.faqs = faqs?._id;
    } else {
      if (
        data?.faqs?.values &&
        data?.faqs?.values?.length > 0 &&
        data?.faqs?.values[0]?.ques
      ) {
        const slug = await slugGenerator(data?.name, Faq);
        const faqPayload = {
          slug: slug,
          values: data?.faqs?.values,
        };
        const faqs = await Faq.create(faqPayload);
        data.faqs = faqs?._id;
      } else {
        delete data.faqs;
      }
    }
    data.brand = data?.brand?.value;
    data.tages = data?.tages?.map((tag) => tag?.value);
    data.categories = [
      ...new Set(data?.categories?.map((cat) => cat?.id || cat?._id)),
    ];

    if (data.type === "variants") {
      if (data?.varients.length > 0) {
        const result = await Promise.all(
          data.varients.map(async (varient) => {
            if (!varient.slug) {
              varient.slug = await slugGenerator(varient.name, Varient);
            }
            return await Varient.findOneAndUpdate(
              { _id: new mongoose.Types.ObjectId(varient?._id) },
              { ...varient },
              { upsert: true, new: true },
            ).select("_id");
          }),
        );
        data.varients = result;
      } else {
        delete data.varients;
      }

      const itemVarients = await Item.findOne(query);
      const existingVarients = itemVarients?.varients?.map(
        (varient) => varient?._id,
      );
      const currentVarients = data?.varients?.map((varient) => varient?._id);
      const deletedVarients = existingVarients?.filter(
        (id) =>
          !currentVarients.some((cid) => cid.toString() === id.toString()),
      );

      if (deletedVarients) {
        await Varient.deleteMany({ _id: { $in: deletedVarients } });
      }
    }

    await Item.updateOne(query, { ...data });
    await adminsLogsHelper(req, "Item update successfully");
    return res.status(201).json({
      status: "success",
      message: "Item update successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id, deletedAt: { $ne: null } };

    const item = await Item.findById(id);

    if (item.type === "variants") {
      const varientsId = item?.varients?.map((item) => item?._id);
      await Varient.deleteMany({ _id: { $in: varientsId } });
    }

    if (item?.faqs && item?.faqs.values.length > 0) {
      await Faq.deleteOne({ _id: item.faqs._id });
    }

    const deleteItem = await Item.deleteOne(query);

    if (!deleteItem) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }
    await adminsLogsHelper(req, "Item deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "Item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const trashItem = async (req, res) => {
  try {
    const { id } = req.params;

    const query = { _id: id, deletedAt: null };
    const deleteItem = await Item.findOne(query);

    if (!deleteItem) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }

    await Item.findByIdAndUpdate(
      { _id: id },
      { deletedAt: new Date() },
      {
        new: true,
      },
    );
    await adminsLogsHelper(req, "Item trash successfully");
    return res.status(200).json({
      status: "success",
      message: "Item trash successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiDeleteItem = async (req, res) => {
  try {
    const ids = req.body;
    const query = {
      deletedAt: { $ne: null },
      _id: { $in: ids },
    };
    const AllItem = await Item.find(query);

    AllItem.map(async (item) => {
      if (item.type === "variants") {
        const varientsId = item?.varients?.map((item) => item?._id);
        await Varient.deleteMany({ _id: { $in: varientsId } });
      }
    });

    AllItem.map(async (item) => {
      if (item?.faqs && item?.faqs.values.length > 0) {
        await Faq.deleteOne({ _id: item.faqs._id });
      }
    });

    if (!AllItem.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }

    await Item.deleteMany(query);
    await adminsLogsHelper(req, "All Item deleted successfully");
    return res.status(200).json({
      status: "success",
      message: "All Item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const multiTrashItem = async (req, res) => {
  try {
    const ids = req.body;
    const query = {
      deletedAt: null,
      _id: { $in: ids },
    };
    const AllItem = await Item.find(query);

    if (!AllItem.length > 0) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }

    await Item.updateMany(query, {
      $set: { deletedAt: new Date(), updatedAt: new Date() },
    });
    await adminsLogsHelper(req, "All Item trashed successfully");
    return res.status(200).json({
      status: "success",
      message: "All Item trashed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const restoreTrashItem = async (req, res) => {
  try {
    const { id } = req.params;

    const query = { _id: id, deletedAt: { $ne: null } };
    const Items = await Item.findOne(query);
    if (!Items) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }

    await Item.updateOne(query, { $set: { deletedAt: null } });
    await adminsLogsHelper(req, "Item restore successfully");
    return res.status(200).json({
      status: "success",
      message: "Item restore successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const itemsCounts = async (req, res) => {
  try {
    const response = await Item.aggregate([
      {
        $match: {
          admin: new mongoose.Types.ObjectId(_id),
          deletedAt: null,
        },
      },
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 },
          outOfStockCount: {
            $sum: {
              $cond: [
                {
                  $or: [{ $eq: ["$quantity", 0] }, { $eq: ["$quantity", "0"] }],
                },
                1,
                0,
              ],
            },
          },
          unlimitedCount: {
            $sum: {
              $cond: [{ $eq: ["$quantity", "unlimited"] }, 1, 0],
            },
          },
          onSaleCount: {
            $sum: {
              $cond: [{ $lt: ["$sale_price", "$price"] }, 1, 0],
            },
          },
        },
      },
    ]);
    return res.status(200).json({
      status: "success",
      message: "Item counts successfully",
      data: response[0],
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Frontend APIs

export const getPublicItems = async (req, res) => {
  try {
    const {
      tranding,
      hot,
      featured,
      category,
      brand,
      color,
      size,
      minPrice,
      maxPrice,
    } = req?.query;
    const query = {
      deletedAt: null,
    };

    if (tranding == "true" || tranding == true) {
      query.tranding = true;
    }

    if (featured == "true" || featured == true) {
      query.featured = true;
    }

    if (hot == "true" || hot == true) {
      query.hot = true;
    }

    if (category) {
      const cat = await Categories.findOne({ slug: category });
      if (cat) {
        query.categories = { $in: [cat._id] };
      }
    }

    if (brand) {
      const brandIds = brand.split(",").filter((id) => isValidObjectId(id));
      if (brandIds.length > 0) {
        query.brand = { $in: brandIds };
      }
    }

    let itemIdsFromVariants = null;
    let variantQueryNeeded = false;
    const variantQuery = {};
    const variantConditions = [];

    if (color) {
      variantQueryNeeded = true;
      const colors = color.split(",").map((c) => new RegExp(c.trim(), "i"));
      variantConditions.push({ name: { $in: colors } });
    }

    if (size) {
      variantQueryNeeded = true;
      const sizes = size
        .split(",")
        .map((s) => new RegExp(`\\b${s.trim()}\\b`, "i"));
      variantConditions.push({ name: { $in: sizes } });
    }

    let priceOr = null;
    if (minPrice || maxPrice) {
      const pCond = {};
      if (minPrice) pCond.$gte = Number(minPrice);
      if (maxPrice) pCond.$lte = Number(maxPrice);
      
      priceOr = [
        { price: pCond, sale_price: { $in: [null, 0] } },
        { sale_price: pCond, sale_price: { $gt: 0 } }
      ];
      
      variantQueryNeeded = true;
      variantConditions.push({ $or: priceOr });
    }

    if (variantQueryNeeded) {
      if (variantConditions.length > 0) {
        variantQuery.$and = variantConditions;
      }
      const matchingVariants =
        await Varient.find(variantQuery).select("itemId");
      itemIdsFromVariants = matchingVariants.map((v) => v.itemId);
    }

    if (color || size) {
      // Must match variant color/size
      if (itemIdsFromVariants !== null) {
        query._id = { $in: itemIdsFromVariants };
      }
    } else if (priceOr) {
      // If only price is filtered, item can match its own price OR via variants
      query.$or = [
        { _id: { $in: itemIdsFromVariants || [] } },
        ...priceOr
      ];
    }

    console.log("=== FILTER BY PRICE DEBUG LOGS ===");
    console.log("minPrice:", minPrice, "maxPrice:", maxPrice);
    console.log("priceOr:", JSON.stringify(priceOr, null, 2));
    console.log("itemIdsFromVariants:", itemIdsFromVariants);
    console.log("Final Query:", JSON.stringify(query, null, 2));
    console.log("==================================");

    const options = generateOptions(req);
    const response = await Item.paginate(query, {
      ...options,
      sort: { createdAt: -1 },
    });

    return res.status(200).json({
      status: "success",
      message: "item fetch successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "erorr",
      message: "Internal server erorr",
      error: error.message,
    });
  }
};

export const getPublicItemBySlugOrId = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = isValidObjectId(id);
    const query = isValidId ? { _id: id } : { slug: id };
    const response = await Item.findOne({ ...query, deletedAt: null });
    return res.status(200).json({
      ststus: "success",
      message: "fetch item by slug/id successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "erorr",
      message: "Internal server erorr",
      error: error.message,
    });
  }
};

export const getRelatedItems = async (req, res) => {
  try {
    const { id } = req.params;
    const isValidId = isValidObjectId(id);
    const query = isValidId ? { _id: id } : { slug: id };
    const currentItem = await Item.findOne({ ...query, deletedAt: null });

    if (!currentItem) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }

    const categories = currentItem.categories || [];

    const relatedQuery = {
      _id: { $ne: currentItem._id },
      categories: { $in: categories },
      deletedAt: null,
    };

    const options = generateOptions(req);
    const response = await Item.paginate(relatedQuery, {
      ...options,
      sort: { createdAt: -1 },
    });

    return res.status(200).json({
      status: "success",
      message: "fetch related items successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const globalSearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(200).json({
        status: "success",
        data: {
          items: [],
          posts: [],
          categories: [],
        },
      });
    }

    const searchRegex = new RegExp(q, "i");

    const [items, posts, categories] = await Promise.all([
      Item.find({
        deletedAt: null,
        $or: [
          { name: searchRegex },
          { short_content: searchRegex },
          { long_content: searchRegex },
        ],
      }).limit(5),
      Post.find({
        deletedAt: null,
        $or: [{ title: searchRegex }, { content: searchRegex }],
      }).limit(5),
      Categories.find({
        deletedAt: null,
        name: searchRegex,
      }).limit(5),
    ]);

    return res.status(200).json({
      status: "success",
      message: "Global search completed",
      data: {
        items,
        posts,
        categories,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
