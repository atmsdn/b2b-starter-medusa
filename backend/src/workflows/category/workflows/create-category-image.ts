import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { createCategoryImageStep } from "../steps/create-category-image"

type WorkflowInput = {
  category_id: string
  url: string
}

export const createCategoryImageWorkflow = createWorkflow(
  "create-category-image-workflow",
  function (input: WorkflowInput) {
    const image = createCategoryImageStep(input)
    return new WorkflowResponse(image)
  }
)