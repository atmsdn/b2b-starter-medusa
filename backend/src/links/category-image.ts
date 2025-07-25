import { defineLink } from "@medusajs/framework/utils"
import ProductModule from "@medusajs/medusa/product"
import CategoryImage from "../modules/category_image";


export default defineLink(
    ProductModule.linkable.productCategory, // link to the existing ProductCategory
    CategoryImage.linkable.categoryImage
)