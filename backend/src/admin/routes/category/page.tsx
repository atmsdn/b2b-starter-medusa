import { defineRouteConfig } from "@medusajs/admin-sdk";
import { BuildingStorefront } from "@medusajs/icons";


const Category = () => {

    return (
        <>
            Hello 
        </>
    );
};

export const config = defineRouteConfig({
    label: "Category",
    icon: BuildingStorefront,
});

export default Category;
