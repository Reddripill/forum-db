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
        "answers.post.author.avatar",
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
    async find(ctx) {
      const sortParam = ctx.request.query.sort;
      const response = await strapi.entityService.findMany("api::post.post", {
        populate: ctx.request.query.populate,
        sort: sortParam !== "votes" ? sortParam + ":desc" : "",
      });
      if (sortParam === "votes") {
        (response as any).sort((a, b) => b.votes.length - a.votes.length);
      }
      return { data: response };
    },
  })
);
