import { createStore } from "vuex";
import { reactive, toRaw } from "vue";
const ArticleModule = {
  state: {
    Authors: [], //数组，存储当前所有的组织
    currentAuthorId: -1,
    title: "",
    id: "",
    cited_count: -1,
    abstract: "",
    domain: [],
    pdf_url: "",
    landing_page_url: "",
    source: [],
    publication_date: "",
    type_num: -1,
    counts_by_year: [],
    corresponding_author: [],
    corresponding_institutions: [],
    references: [],
    related_works: [],
    is_star: false,
    comments: [],
    comment_add_num: 0,
  },
  mutations: {
    changeCurrentArticle(state, articleId) {
      state.id = articleId;
    },
    updateCommentNum(state) {
      state.comment_add_num++;
    },
    updateCurrent(state, data) {
      state.Authors = data.author_all;
      state.title = data.title;
      state.cited_count = data.cited_count;
      state.abstract = data.abstract;
      state.domain = data.domain;
      state.pdf_url = data.pdf_url;
      state.landing_page_url = data.landing_page_url;
      state.source = data.source;
      state.publication_date = data.publication_date;
      state.type_num = data.type_num;
      state.counts_by_year = data.counts_by_year;
      state.corresponding_author = data.corresponding_author;
      state.corresponding_institutions = data.corresponding_institutions;
      state.references = data.referenced_works;
      state.related_works = data.related_works;
      state.is_star = data.is_star;
      state.id = data.id;
    },
    updateComment(state, data) {
      state.comments = data;
    },
    addComment(state, new_create) {
      let comments = state.comments;
      if (new_create.first_id === -1) {
        state.comments.push(JSON.parse(JSON.stringify(new_create.new_comment)));
        state.comment_add_num++;
      } else {
        let i = 0;
        for (let com of comments) {
          if (com.id === new_create.first_id) {
            state.comments[i].reply_list.push(
              JSON.parse(JSON.stringify(new_create.new_comment))
            );
            state.comment_add_num++;
          }
          i++;
        }
      }
    },
  },
  actions: {},
  getters: {
    get_currentAuthor(state) {
      const authors = state.Authors;
      for (let author of authors) {
        if (author.id === state.currentAuthorId) {
          return author;
        }
      }
    },
    get_references(state) {
      const references = state.references;
      let references_dis = [];
      for (let refer of references) {
        let single = {};
        let single_refer = "";
        for (let ref_author of refer.author_all) {
          if (ref_author === refer.author_all[refer.author_all.length - 1]) {
            single_refer = single_refer + ref_author.name + ". ";
          } else {
            single_refer = single_refer + ref_author.name + ", ";
          }
        }
        single_refer = single_refer + refer.title + ". ";
        single_refer = single_refer + refer.publication_date + ".";
        single.id = refer.id;
        single.dis = single_refer;
        references_dis.push(single);
      }
      return references_dis;
    },
    get_few_references(state) {
      const references = state.references;
      let references_dis = [];
      for (let refer of references) {
        let single = {};
        let single_refer = "";
        for (let ref_author of refer.author_all) {
          if (ref_author === refer.author_all[refer.author_all.length - 1]) {
            single_refer = single_refer + ref_author.name + ". ";
          } else {
            single_refer = single_refer + ref_author.name + ", ";
          }
        }
        single_refer = single_refer + refer.title + ". ";
        single_refer = single_refer + refer.publication_date + ".";
        single.id = refer.id;
        single.dis = single_refer;
        references_dis.push(single);
        if (refer === references[2]) {
          break;
        }
      }
      return references_dis;
    },
    get_source(state) {
      let source = state.source;
      let sou = "";
      if (source.length) {
        sou = sou + source[0].name + " ------ " + source[0].type;
      }
      return sou;
    },
    get_recommendations(state) {
      const recommendations = state.related_works;
      let recommendations_dis = [];
      for (let rec of recommendations) {
        let single = {};
        let single_rec = "";
        single_rec = single_rec + rec.title + ". ";
        for (let rec_author of rec.author_all) {
          if (rec_author === rec.author_all[rec.author_all.length - 1]) {
            single_rec = single_rec + rec_author.name + ". ";
          } else {
            single_rec = single_rec + rec_author.name + ", ";
          }
        }
        single_rec = single_rec + rec.publication_date + ".";
        single.id = rec.id;
        single.dis = single_rec;
        recommendations_dis.push(single);
      }
      return recommendations_dis;
    },
    get_few_recommendations(state) {
      const recommendations = state.related_works;
      let recommendations_dis = [];
      for (let rec of recommendations) {
        let single = {};
        let single_rec = "";
        single_rec = single_rec + rec.title + ". ";
        for (let rec_author of rec.author_all) {
          if (rec_author === rec.author_all[rec.author_all.length - 1]) {
            single_rec = single_rec + rec_author.name + ". ";
          } else {
            single_rec = single_rec + rec_author.name + ", ";
          }
        }
        single_rec = single_rec + rec.publication_date + ".";
        single.id = rec.id;
        single.dis = single_rec;
        recommendations_dis.push(single);
        if (rec === recommendations[2]) {
          break;
        }
      }
      return recommendations_dis;
    },
  },
};
export default ArticleModule;
