import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createCategoryImageWorkflow } from "../../../workflows/category/workflows/create-category-image";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import CategoryImageLinks from '../../../links/category-image'
export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const body = req.body as { category_id: string; url: string };
    console.log(body, 'body')
    const { result } = await createCategoryImageWorkflow.run({
        input: {
            category_id: body.category_id,
            url: body.url,
        },
        container: req.scope
    })
    res.send(result)
}



export const GET = async (
    req: MedusaRequest, res: MedusaResponse
) => {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
    const { data: categorys } = await query.graph({
        entity: "category_image",
        fields: [
            "*",
            "product_category.id", "product_category.name"
        ]
    });
    const { data: product_category } = await query.graph({
        entity: "product_category",
        fields: [
            "id", "name", "parent_category.name", "parent_category.id",
            "category_image.category_id"
        ]
    });
    product_category.map(pc => {
        const cc = categorys.find(c => c.category_id == pc.id);
        console.log(cc, 'cc')
        pc["image"] = cc?.url || ""
        if (pc.parent_category?.id) {
            const cc1 = categorys.find(c => c.category_id == pc.parent_category?.id);
            pc["parent_category"]["image"] = cc1?.url || ""
        }
    })
    res.json({
        product_category
    });
};
