import { AuthenticatedMedusaRequest, MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";



export const GET = async (req: AuthenticatedMedusaRequest, res: MedusaResponse) => {
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
            "handle","id", "name", "parent_category.name", "parent_category.id",
            "category_image.category_id","rank"
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
    res.send(product_category)
}