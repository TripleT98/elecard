import axios from "axios";
let reqs = {
   getCards(){
  return axios.get("http://contest.elecard.ru/frontend_data/catalog.json")
   },
}

export default reqs;
