export const generateOptions = (req) => {
  return {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.count) || 15,
    customLabels: { docs: "data", totalDocs: "totalData" },
  };
};

export const GenerateSearchQuery = (req, query) => {
  const { search } = req.query;

  if (search) {
    return {
      ...query,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { filename: { $regex: search, $options: "i" } },
      ],
    };
  } else {
    return query;
  }
};
