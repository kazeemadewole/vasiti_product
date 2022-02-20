import Joi from "@hapi/joi";



export abstract class BaseController {
  protected async validateRequest(requestBody: any, validationSchema: Joi.Schema) {
    const error = validationSchema.validate(requestBody);

    if (error?.error) {
      return Promise.resolve(error.error?.details[0].message);
    }
  }

  
}
