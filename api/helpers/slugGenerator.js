import slug from "slug";

export async function slugGenerator(name, model) {
  let baseSlug = slug(name, "-");
  let newSlug = baseSlug;
  let counter = 1;

  while (await model.findOne({ slug: newSlug })) {
    newSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return newSlug;
}