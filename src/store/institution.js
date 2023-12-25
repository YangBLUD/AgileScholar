import {createStore} from 'vuex'
import {reactive, toRaw} from "vue";
import institution from "./institution.js";
const InstitutionModule ={
    state: {
        id: -1,
        institution: {
            "display_name": "",
            "display_name_acronyms": [],
            "country_code": "CA",
            "image_url": "",
            "id": "",
            "summary_stats": {
                "cited_by_count": 331,
                "yr2_i10_index": 0,
                "h_index": 7,
                "i10_index": 6,
                "oa_percent": 12.5,
                "yr2_mean_citedness": 0,
                "works_count": 8,
                "yr2_works_count": 0,
                "yr2_h_index": 0,
                "yr2_cited_by_count": 6
            },
            "homepage_url": "",
            "type": "",
            "domain": [
                {
                    "name": "Computer science",
                    "id": "41008148",
                    "level": "0",
                    "activity_level": "100.0"
                },
                {
                    "name": "Computer hardware",
                    "id": "9390403",
                    "level": "1",
                    "activity_level": "75.0"
                },
                {
                    "name": "Engineering",
                    "id": "127413603",
                    "level": "0",
                    "activity_level": "75.0"
                },
                {
                    "name": "Operating system",
                    "id": "111919701",
                    "level": "1",
                    "activity_level": "75.0"
                },
                {
                    "name": "Embedded system",
                    "id": "149635348",
                    "level": "1",
                    "activity_level": "75.0"
                },
                {
                    "name": "Field-programmable gate array",
                    "id": "42935608",
                    "level": "2",
                    "activity_level": "75.0"
                },
                {
                    "name": "Computer architecture",
                    "id": "118524514",
                    "level": "1",
                    "activity_level": "50.0"
                },
                {
                    "name": "Physics",
                    "id": "121332964",
                    "level": "0",
                    "activity_level": "50.0"
                },
                {
                    "name": "Quantum mechanics",
                    "id": "62520636",
                    "level": "1",
                    "activity_level": "50.0"
                },
                {
                    "name": "Archaeology",
                    "id": "166957645",
                    "level": "1",
                    "activity_level": "37.5"
                },
                {
                    "name": "Electronic engineering",
                    "id": "24326235",
                    "level": "1",
                    "activity_level": "37.5"
                },
                {
                    "name": "Transistor",
                    "id": "172385210",
                    "level": "3",
                    "activity_level": "37.5"
                },
                {
                    "name": "Voltage",
                    "id": "165801399",
                    "level": "2",
                    "activity_level": "37.5"
                },
                {
                    "name": "Algorithm",
                    "id": "11413529",
                    "level": "1",
                    "activity_level": "37.5"
                },
                {
                    "name": "History",
                    "id": "95457728",
                    "level": "0",
                    "activity_level": "37.5"
                },
                {
                    "name": "Geography",
                    "id": "205649164",
                    "level": "0",
                    "activity_level": "37.5"
                },
                {
                    "name": "Electrical engineering",
                    "id": "119599485",
                    "level": "1",
                    "activity_level": "37.5"
                },
                {
                    "name": "Routing (electronic design automation)",
                    "id": "74172769",
                    "level": "2",
                    "activity_level": "37.5"
                },
                {
                    "name": "Computer network",
                    "id": "31258907",
                    "level": "1",
                    "activity_level": "37.5"
                },
                {
                    "name": "Mathematics",
                    "id": "33923547",
                    "level": "0",
                    "activity_level": "37.5"
                },
                {
                    "name": "Geometry",
                    "id": "2524010",
                    "level": "1",
                    "activity_level": "25.0"
                },
                {
                    "name": "Logic optimization",
                    "id": "28449271",
                    "level": "4",
                    "activity_level": "25.0"
                },
                {
                    "name": "Optoelectronics",
                    "id": "49040817",
                    "level": "1",
                    "activity_level": "25.0"
                },
                {
                    "name": "Digital electronics",
                    "id": "81843906",
                    "level": "3",
                    "activity_level": "25.0"
                },
                {
                    "name": "Thermodynamics",
                    "id": "97355855",
                    "level": "1",
                    "activity_level": "25.0"
                }
            ],
            "geo": {
                "country_code": "CA",
                "country": "Canada",
                "city": "Montreal",
                "geonames_city_id": "6077243",
                "latitude": 45.462406,
                "region": "Quebec",
                "longitude": -73.825584
            },
            "ror": "https://ror.org/03qn4hk51",
            "counts_by_year": [
                {
                    "cited_by_count": 2,
                    "year": 2023,
                    "works_count": 0,
                    "oa_works_count": 0
                },
                {
                    "cited_by_count": 6,
                    "year": 2021,
                    "works_count": 0,
                    "oa_works_count": 0
                },
                {
                    "cited_by_count": 3,
                    "year": 2020,
                    "works_count": 0,
                    "oa_works_count": 0
                },
                {
                    "cited_by_count": 5,
                    "year": 2019,
                    "works_count": 0,
                    "oa_works_count": 0
                },
                {
                    "cited_by_count": 8,
                    "year": 2018,
                    "works_count": 0,
                    "oa_works_count": 0
                },
                {
                    "cited_by_count": 4,
                    "year": 2017,
                    "works_count": 0,
                    "oa_works_count": 0
                },
                {
                    "cited_by_count": 5,
                    "year": 2016,
                    "works_count": 0,
                    "oa_works_count": 0
                },
                {
                    "cited_by_count": 9,
                    "year": 2015,
                    "works_count": 0,
                    "oa_works_count": 0
                },
                {
                    "cited_by_count": 15,
                    "year": 2014,
                    "works_count": 0,
                    "oa_works_count": 0
                },
                {
                    "cited_by_count": 15,
                    "year": 2013,
                    "works_count": 0,
                    "oa_works_count": 0
                },
                {
                    "cited_by_count": 17,
                    "year": 2012,
                    "works_count": 0,
                    "oa_works_count": 0
                }
            ],
            "associated_institutions": {
                "parent": [
                    {
                        "country_code": "US",
                        "ror": "https://ror.org/01rb7bk56",
                        "id": "32923980",
                        "display_name": "Xilinx (United States)",
                        "type": "company",
                        "relationship": "parent"
                    }
                ],
                "child": [],
                "related": []
            },
            "is_star": false
        },
    },
    mutations: {
        initAuthors(state){
            state.Authors = []
        },
        updateInstitution(state, institution){
            state.institution = institution
            state.id = institution.id
        }
    },
    actions: {

    },
    getters: {
        getGeo(state){
            let geo = ""
            if(state.institution.geo){
                if (state.institution.geo.city === ""){
                    geo = geo + state.institution.geo.country
                } else if (state.institution.geo.country !== ""){
                    geo = geo + state.institution.geo.city + ", " + state.institution.geo.country
                }
            } else {
                geo = geo + "------"
            }
            if (geo === "")
                geo = geo + "------"
            return geo;
        },
        getFewDomain(state){
            let four = 4
            let domains = []
            if (state.institution.domain.length > 4){
                domains = state.institution.domain.slice(0, four)
            }
            else domains = state.institution.domain
            return domains
        },
        getHaveMore(state){
            let have = false
            if (state.institution.domain.length > 4)
                have = true
            return have
        },
        getYears(state){
            let years = []
            for (let c of state.institution.counts_by_year){
                years.push(c.year)
            }
            return years.reverse()
        },
        getCitedCount(state){
            let cited_counts = []
            for (let c of state.institution.counts_by_year){
                cited_counts.push(c.cited_by_count)
            }
            return cited_counts.reverse()
        },
        getWorkCount(state){
            let work_counts = []
            for (let c of state.institution.counts_by_year){
                work_counts.push(c.works_count)
            }
            return work_counts.reverse()
        },
        getOaWorkCount(state){
            let oa_work_count = []
            for (let c of state.institution.counts_by_year){
                oa_work_count.push(c.oa_works_count)
            }
            return oa_work_count.reverse()
        }

    }
}
export default InstitutionModule
