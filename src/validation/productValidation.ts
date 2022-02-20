import joi from "@hapi/joi";

export const productValidation = joi.object({
    product_name: joi.string().required(),
    product_description: joi.string(),
    product_varieties: joi.object()
})