import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { CATEGORY_IMAGE } from "src/modules/category_image"
import CategoryImageService from "src/modules/category_image/service"

type CreateCategoryImageInput = {
    category_id: string
    url: string
}

const createCategoryImageStep = createStep(
    "create-category-image",
    async (input: CreateCategoryImageInput, { container }) => {

        const categoryImageService: CategoryImageService = container.resolve(CATEGORY_IMAGE)
       
        const exsits = await categoryImageService.listCategoryImages({
            category_id: input.category_id
        })
        if (exsits.length > 0) {
            const image = await categoryImageService.updateCategoryImages({ ...input, id: exsits[0].id })
           
            return new StepResponse(image, image.id)
        }
        const image = await categoryImageService.createCategoryImages(input)
       
        return new StepResponse(image, image.id)
    },
    async (imageId, { container }) => {
        if (!imageId) return
        const categoryImageService: CategoryImageService = container.resolve(CATEGORY_IMAGE)
        await categoryImageService.deleteCategoryImages(imageId)
    }
)

export {
    createCategoryImageStep
}