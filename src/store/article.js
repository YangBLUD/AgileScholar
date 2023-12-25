import {createStore} from 'vuex'
import {reactive, toRaw} from "vue";
const ArticleModule ={
    state: {
        Authors:[
            {
              id: "001",
              name: "Yang DingHao",
              claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
        ],
        currentAuthorId: -1,
        title: "Wireless mesh networks: a survey",
        id: "2150825860",
        cited_count: 3708,
        abstract: "Wireless mesh networks (WMNs) consist of routers and clients, where have minimal mobility form the backbone WMNs. They provide network access for both conventional clients. The integration WMNs with other such as Internet, cellular, IEEE 802.11, 802.15, 802.16, sensor networks, etc., can be accomplished through gateway bridging functions in routers. Mesh clients either stationary or mobile, a client among themselves are anticipated to resolve limitations significantly improve performance ad hoc wireless local area (WLANs), personal (WPANs), metropolitan (WMANs). undergoing rapid progress inspiring numerous deployments. will deliver services large variety applications personal, local, campus, areas. Despite recent advances networking, many research challenges remain all protocol layers. This paper presents detailed study on open issues System architectures described, followed by discussing critical factors influencing design. Theoretical capacity state-of-the-art protocols explored an objective point out number issues. Finally, testbeds, industrial practice, current standard activities related highlighted.",
        domain: [],
        pdf_url: "",
        landing_page_url: "https://doi.org/10.1016/j.comnet.2004.12.001",
        source: [
            {
                "name": "Computer Networks",
                "type": "journal",
                "id": "4310320990"
            }
        ],
        publication_date: "2005-03-01",
        type_num: -1,
        counts_by_year: [],
        corresponding_author: [],
        corresponding_institutions: [],
        references: [
            {
                "title": "ATCP: TCP for mobile ad hoc networks",
                "id": "2167088953",
                "cited_count": 465,
                "author_all": [
                    {
                        "name": "J. Liu",
                        "id": "5075151331",
                        "claimed": false
                    },
                    {
                        "name": "S. Singh",
                        "id": "5068360596",
                        "claimed": false
                    }
                ],
                "publication_date": "2001-07-01"
            },
            {
                "title": "Medium access control in a network of ad hoc mobile nodes with heterogeneous power capabilities",
                "id": "1861616631",
                "cited_count": 71,
                "author_all": [
                    {
                        "name": "N. Poojary",
                        "id": "5023294043",
                        "claimed": false
                    },
                    {
                        "name": "S.V. Krishnamurthy",
                        "id": "5086268637",
                        "claimed": false
                    },
                    {
                        "name": "Son Dao",
                        "id": "5024134851",
                        "claimed": false
                    }
                ],
                "publication_date": "2002-11-13"
            },
            {
                "title": "Lifting the limits on high speed wireless data access using antenna arrays",
                "id": "2144257118",
                "cited_count": 112,
                "author_all": [
                    {
                        "name": "A. Lozano",
                        "id": "5078078596",
                        "claimed": false
                    },
                    {
                        "name": "F.R. Farrokhi",
                        "id": "5040273119",
                        "claimed": false
                    },
                    {
                        "name": "R.A. Valenzuela",
                        "id": "5068923154",
                        "claimed": false
                    }
                ],
                "publication_date": "2001-01-01"
            },
            {
                "title": "A software radio testbed for two-transmitter two-receiver space-time coding OFDM wireless LAN",
                "id": "2141942769",
                "cited_count": 30,
                "author_all": [
                    {
                        "name": "Weidong Xiang",
                        "id": "5080779901",
                        "claimed": false
                    },
                    {
                        "name": "T. Pratt",
                        "id": "5052471600",
                        "claimed": false
                    },
                    {
                        "name": "Xudong Wang",
                        "id": "5019290469",
                        "claimed": false
                    }
                ],
                "publication_date": "2004-06-01"
            },
            {
                "title": "On power efficient communication over multi-hop wireless networks: joint routing, scheduling and power control",
                "id": "2115651379",
                "cited_count": 143,
                "author_all": [
                    {
                        "name": "R. Bhatia",
                        "id": "5061739022",
                        "claimed": false
                    },
                    {
                        "name": "M. Kodialam",
                        "id": "5089757482",
                        "claimed": false
                    }
                ],
                "publication_date": "2005-02-22"
            },
            {
                "title": "A distributed power management policy for wireless ad hoc networks",
                "id": "2105989664",
                "cited_count": 49,
                "author_all": [
                    {
                        "name": "C.F. Chiasserini",
                        "id": "5005687767",
                        "claimed": false
                    },
                    {
                        "name": "R.R. Rao",
                        "id": "5018484898",
                        "claimed": false
                    }
                ],
                "publication_date": "2002-11-11"
            },
            {
                "title": "ARC: The Analytical Rate Control Scheme for Real-Time Traffic in Wireless Networks",
                "id": "2170009782",
                "cited_count": 56,
                "author_all": [
                    {
                        "name": "Özgür B. Akan",
                        "id": "5042130660",
                        "claimed": false
                    },
                    {
                        "name": "Ian F. Akyildiz",
                        "id": "5044396726",
                        "claimed": false
                    }
                ],
                "publication_date": "2004-08-01"
            },
            {
                "title": "Does the IEEE 802.11 MAC protocol work well in multihop wireless ad hoc networks?",
                "id": "1969349947",
                "cited_count": 869,
                "author_all": [
                    {
                        "name": "S. Xu",
                        "id": "5013874701",
                        "claimed": false
                    },
                    {
                        "name": "T. Saadawi",
                        "id": "5059022892",
                        "claimed": false
                    }
                ],
                "publication_date": "2001-06-01"
            },
            {
                "title": "Multipath Routing in Mobile Ad Hoc Networks: Issues and Challenges",
                "id": "1646091373",
                "cited_count": 388,
                "author_all": [
                    {
                        "name": "Stephen Mueller",
                        "id": "5063619827",
                        "claimed": false
                    },
                    {
                        "name": "Rose P. Tsang",
                        "id": "5028008484",
                        "claimed": false
                    },
                    {
                        "name": "Dipak Ghosal",
                        "id": "5003841285",
                        "claimed": false
                    }
                ],
                "publication_date": "2004-01-01"
            },
            {
                "title": "Rational Exchange - A Formal Model Based on Game Theory",
                "id": "1586327373",
                "cited_count": 27,
                "author_all": [
                    {
                        "name": "Levente Buttyán",
                        "id": "5063012203",
                        "claimed": false
                    },
                    {
                        "name": "Jean-Pierre Hubaux",
                        "id": "5080497445",
                        "claimed": false
                    }
                ],
                "publication_date": "2001-01-01"
            }
        ],
        related_works: [
            {
                "title": "Wireless Mesh Networks Architecture",
                "id": "2810292777",
                "cited_count": 2,
                "author_all": [
                    {
                        "name": "Madhusudan Singh",
                        "id": "5033662031",
                        "claimed": false
                    }
                ],
                "publication_date": "2018-05-13"
            },
            {
                "title": "IEEE 802.11-based Wireless Mesh Network Testbed",
                "id": "2016519881",
                "cited_count": 14,
                "author_all": [
                    {
                        "name": "Heecheol Song",
                        "id": "5021360141",
                        "claimed": false
                    },
                    {
                        "name": "Bong Chan Kim",
                        "id": "5047416825",
                        "claimed": false
                    },
                    {
                        "name": "Jae Young Lee",
                        "id": "5021257318",
                        "claimed": false
                    },
                    {
                        "name": "Hwang Soo Lee",
                        "id": "5057455130",
                        "claimed": false
                    }
                ],
                "publication_date": "2007-07-01"
            },
            {
                "title": "IEEE 802.11s Wireless Mesh Networks: Challenges and Perspectives",
                "id": "3215514091",
                "cited_count": 0,
                "author_all": [
                    {
                        "name": "Aggeliki Sgora",
                        "id": "5074054841",
                        "claimed": false
                    },
                    {
                        "name": "Dimitris D. Vergados",
                        "id": "5058708821",
                        "claimed": false
                    },
                    {
                        "name": "Periklis Chatzimisios",
                        "id": "5077616678",
                        "claimed": false
                    }
                ],
                "publication_date": "2009-01-01"
            },
            {
                "title": "Wireless Mesh Network Simulator for Studying Cross-Layer Jamming Effects",
                "id": "2087537623",
                "cited_count": 2,
                "author_all": [
                    {
                        "name": "Yu Seung Kim",
                        "id": "5036054006",
                        "claimed": false
                    },
                    {
                        "name": "Patrick Tague",
                        "id": "5033964933",
                        "claimed": false
                    }
                ],
                "publication_date": "2013-10-01"
            },
            {
                "title": "Study on Topology Control in Wireless MESH Network",
                "id": "2364844863",
                "cited_count": 0,
                "author_all": [
                    {
                        "name": "Zhang Wei",
                        "id": "5076352376",
                        "claimed": false
                    }
                ],
                "publication_date": "2010-01-01"
            },
            {
                "title": "Simulative analysis of the Hybrid Wireless Mesh Protocol (HWMP)",
                "id": "2056624217",
                "cited_count": 16,
                "author_all": [
                    {
                        "name": "Malte Cornils",
                        "id": "5078390805",
                        "claimed": false
                    },
                    {
                        "name": "Michael Bahr",
                        "id": "5012710034",
                        "claimed": false
                    },
                    {
                        "name": "Thomas Gamer",
                        "id": "5066237237",
                        "claimed": false
                    }
                ],
                "publication_date": "2010-01-01"
            },
            {
                "title": "Design &#x00026; implementation of IEEE 802.11s mesh nodes with enhanced features",
                "id": "2003342631",
                "cited_count": 9,
                "author_all": [
                    {
                        "name": "Pranjal Pandey",
                        "id": "5029228279",
                        "claimed": false
                    },
                    {
                        "name": "S. Satish",
                        "id": "5055747989",
                        "claimed": false
                    },
                    {
                        "name": "Joy Kuri",
                        "id": "5059874589",
                        "claimed": false
                    },
                    {
                        "name": "Haresh Dagale",
                        "id": "5014763980",
                        "claimed": false
                    }
                ],
                "publication_date": "2009-10-01"
            },
            {
                "title": "IEEE 802.11s Wireless Mesh Networks: Challenges and Perspectives",
                "id": "2152678511",
                "cited_count": 19,
                "author_all": [
                    {
                        "name": "Aggeliki Sgora",
                        "id": "5074054841",
                        "claimed": false
                    },
                    {
                        "name": "Dimitrios D. Vergados",
                        "id": "5058708821",
                        "claimed": false
                    },
                    {
                        "name": "Periklis Chatzimisios",
                        "id": "5077616678",
                        "claimed": false
                    }
                ],
                "publication_date": "2009-01-01"
            },
            {
                "title": "Path selection protocols for IEEE 802.11s wlan meshnetworks",
                "id": "603211010",
                "cited_count": 0,
                "author_all": [
                    {
                        "name": "S. M. Sadakatil Bari",
                        "id": "5060323980",
                        "claimed": false
                    },
                    {
                        "name": "Farhat Anwar",
                        "id": "5066678812",
                        "claimed": false
                    }
                ],
                "publication_date": "2011-01-01"
            },
            {
                "title": "Performance Of Wireless Mesh Networks",
                "id": "2511304770",
                "cited_count": 0,
                "author_all": [
                    {
                        "name": "Nicola Scalabrino",
                        "id": "5026648327",
                        "claimed": false
                    }
                ],
                "publication_date": "2009-09-20"
            }
        ],
        is_star: false,
        comments: [
            {
                "id": 1,
                "user": "谢秉书没牛牛2",
                "user_id": 3,
                "comment_time": "2023-12-11 01:08:51",
                "reply_to": "",
                "content": "11121",
                "is_scholar": false,
                "author_id": "",
                "reply_list": []
            },
            {
                "id": 2,
                "user": "谢秉书没牛牛2",
                "user_id": 3,
                "comment_time": "2023-12-11 01:08:53",
                "reply_to": "",
                "content": "11121",
                "is_scholar": false,
                "author_id": "",
                "reply_list": []
            },
            {
                "id": 4,
                "user": "谢秉书没牛牛",
                "user_id": 1,
                "comment_time": "2023-12-12 20:25:55",
                "reply_to": "",
                "content": "你知道谢秉书吗？",
                "is_scholar": true,
                "author_id": "5087082349",
                "reply_list": [
                    {
                        "id": 11,
                        "user": "谢秉书没牛牛1",
                        "user_id": 1,
                        "comment_time": "2023-12-12 20:29:49",
                        "reply_to": "谢秉书没牛牛",
                        "content": "知道知道，就那个谢秉书没牛牛吗",
                        "is_scholar": false,
                        "author_id": "5087082349"
                    },
                    {
                        "id": 12,
                        "user": "谢秉书没牛牛",
                        "user_id": 1,
                        "comment_time": "2023-12-12 20:29:50",
                        "reply_to": "谢秉书没牛牛1",
                        "content": "这你都知道？",
                        "is_scholar": true,
                        "author_id": "5087082349"
                    }
                ]
            },
            {
                "id": 5,
                "user": "谢秉书没牛牛",
                "user_id": 1,
                "comment_time": "2023-12-12 20:26:31",
                "reply_to": "",
                "content": "11121",
                "is_scholar": true,
                "author_id": "5087082349",
                "reply_list": []
            },
            {
                "id": 6,
                "user": "谢秉书没牛牛",
                "user_id": 1,
                "comment_time": "2023-12-12 20:26:35",
                "reply_to": "",
                "content": "11121",
                "is_scholar": true,
                "author_id": "5087082349",
                "reply_list": []
            }
        ],
        comment_add_num: 0
    },
    mutations: {
        changeCurrentArticle(state, articleId){
            state.id = articleId
        },
        updateCommentNum(state){
            state.comment_add_num++
        },
        updateCurrent(state, data){
            state.Authors = data.author_all
            state.title = data.title
            state.cited_count = data.cited_count
            state.abstract = data.abstract
            state.domain = data.domain
            state.pdf_url = data.pdf_url
            state.landing_page_url = data.landing_page_url
            state.source = data.source
            state.publication_date = data.publication_date
            state.type_num = data.type_num
            state.counts_by_year = data.counts_by_year
            state.corresponding_author = data.corresponding_author
            state.corresponding_institutions = data.corresponding_institutions
            state.references = data.referenced_works
            state.related_works = data.related_works
            state.is_star = data.is_star
            state.id = data.id
        },
        updateComment(state, data){
            state.comments = data
        },
        addComment(state, new_create){
            let comments = state.comments
            if(new_create.first_id === -1){
                state.comments.push(JSON.parse(JSON.stringify(new_create.new_comment)))
                state.comment_add_num++
            } else {
                let i = 0
                for(let com of comments) {
                    if (com.id === new_create.first_id) {
                        state.comments[i].reply_list.push(JSON.parse(JSON.stringify(new_create.new_comment)))
                        state.comment_add_num++
                    }
                    i++
                }
            }
        }
    },
    actions: {

    },
    getters: {
        get_currentAuthor(state){
            const authors = state.Authors
            for(let author of authors){
                if(author.id===state.currentAuthorId){
                    return author
                }
            }
        },
        get_references(state){
            const references = state.references
            let references_dis = []
            for (let refer of references) {
                let single = {}
                let single_refer = ""
                for (let ref_author of refer.author_all){
                    if (ref_author === refer.author_all[refer.author_all.length - 1]){
                        single_refer = single_refer + ref_author.name + ". "
                    } else {
                        single_refer = single_refer + ref_author.name + ", "
                    }
                }
                single_refer = single_refer + refer.title + ". "
                single_refer = single_refer + refer.publication_date + "."
                single.id = refer.id
                single.dis = single_refer
                references_dis.push(single)
            }
            return references_dis
        },
        get_few_references(state){
            const references = state.references
            let references_dis = []
            for (let refer of references) {
                let single = {}
                let single_refer = ""
                for (let ref_author of refer.author_all){
                    if (ref_author === refer.author_all[refer.author_all.length - 1]){
                        single_refer = single_refer + ref_author.name + ". "
                    } else {
                        single_refer = single_refer + ref_author.name + ", "
                    }
                }
                single_refer = single_refer + refer.title + ". "
                single_refer = single_refer + refer.publication_date + "."
                single.id = refer.id
                single.dis = single_refer
                references_dis.push(single)
                if (refer === references[2]){
                    break;
                }
            }
            return references_dis
        },
        get_source(state){
            let source = state.source
            let sou = ""
            if (source.length) {
                sou = sou + source[0].name + " ------ " + source[0].type
            }
            return sou
        },
        get_recommendations(state){
            const recommendations = state.related_works
            let recommendations_dis = []
            for (let rec of recommendations) {
                let single = {}
                let single_rec = ""
                single_rec = single_rec + rec.title + ". "
                for (let rec_author of rec.author_all){
                    if (rec_author === rec.author_all[rec.author_all.length - 1]){
                        single_rec = single_rec + rec_author.name + ". "
                    } else {
                        single_rec = single_rec + rec_author.name + ", "
                    }
                }
                single_rec = single_rec + rec.publication_date + "."
                single.id = rec.id
                single.dis = single_rec
                recommendations_dis.push(single)
            }
            return recommendations_dis
        },
        get_few_recommendations(state){
            const recommendations = state.related_works
            let recommendations_dis = []
            for (let rec of recommendations) {
                let single = {}
                let single_rec = ""
                single_rec = single_rec + rec.title + ". "
                for (let rec_author of rec.author_all){
                    if (rec_author === rec.author_all[rec.author_all.length - 1]){
                        single_rec = single_rec + rec_author.name + ". "
                    } else {
                        single_rec = single_rec + rec_author.name + ", "
                    }
                }
                single_rec = single_rec + rec.publication_date + "."
                single.id = rec.id
                single.dis = single_rec
                recommendations_dis.push(single)
                if (rec === recommendations[2]){
                    break;
                }
            }
            return recommendations_dis
        },
    }
}
export default ArticleModule
