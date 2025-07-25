import { model } from "@medusajs/framework/utils"

export const CategoryImage = model.define("category_image", {
  id: model.id().primaryKey(),
  url: model.text(),
  category_id: model.text(), // or use a relation if extending the category model
})