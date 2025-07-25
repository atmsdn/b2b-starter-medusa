import { Module } from "@medusajs/framework/utils";
import CategoryImageService from "./service";

export const CATEGORY_IMAGE = "category_image";

export default Module(CATEGORY_IMAGE, {
    service: CategoryImageService,
});
