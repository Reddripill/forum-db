/**
 * post controller
 */

import { Strapi, factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::post.post",
  ({ strapi }: { strapi: Strapi }) => ({
    async findOne(ctx) {
      const customPopulate = [
        "answers.author",
        "answers.parent",
        "answers.replies",
        "answers.post",
        "answers.post.author",
        "answers.replies.author",
        "answers.replies.parent",
        "answers.replies.parent.author",
        "answers.replies.replies",
        "answers.replies.post",
        "answers.parent.author",
        "answers.parent.post",
      ];
      const data = await strapi.entityService.findOne(
        "api::post.post",
        ctx.request.params.id,
        {
          populate: ctx.request.query.populate ?? customPopulate,
        }
      );
      return data;
    },
  })
);
