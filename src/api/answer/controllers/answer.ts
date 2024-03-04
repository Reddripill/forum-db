/**
 * answer controller
 */

import { Strapi, factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::answer.answer",
  ({ strapi }: { strapi: Strapi }) => ({
    async findOne(ctx) {
      const customPopulate = [
        "replies",
        "post.author",
        "replies.author",
        "replies.parent",
        "replies.parent.author",
        "replies.replies",
        "replies.post",
      ];
      const data = await strapi.entityService.findOne(
        "api::answer.answer",
        ctx.request.params.id,
        {
          populate: ctx.request.query.populate ?? customPopulate,
        }
      );
      return data;
    },
  })
);
