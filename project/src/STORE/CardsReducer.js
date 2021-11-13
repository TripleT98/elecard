import reqs from "./../DAL/DAL";

let SET_PAGE = "SET_PAGE";
let SET_ALL_CARDS = "SET_ALL_CARDS";
let SET_FETCH = "SET_FETCH";
let BAN_THE_CARD = "BAN_THE_CARD";
let UNBAN_ALL = "UNBAN_ALL";
let SORT_BY_SUBJECT = "SORT_BY_SUBJECT";
let SORT_BY_PARAMS = "SORT_BY_PARAMS";
let RESET_SORT = "RESET_SORT";
let CHANGE_VIEW = "CHANGE_VIEW";

class SortVars{
  constructor({params, subjects}){
  this.sortVariants = {
    sortedCards:[],
    bySubject:subjects,
    byParams:params,
    currentSortSubject: "",
    currentSortParam: "",
    isSubjectSortOn: false,
    isParamsSortOn: false
  }
 }
}

let initialState = {
     baseURL:"http://contest.elecard.ru/frontend_data/",
     isFetching: true,
     view: "block",
     cards:[],
     originCards:[],
     bannedCards:[],
     sortedCards:[],
     currentPage:1,
     cardsAmountOnOnePage: 20,
     currentStack:[],
     amountOfCards:0,
     indexOfLastCards: 0,
     sortVariants:{
       sortedCards:[],
       bySubject:[],
       byParams:[],
       currentSortSubject: "",
       currentSortParam: "",
       isSubjectSortOn: false,
       isParamsSortOn: false
     }
}

function cardReducer(state = initialState, action){
  switch(action.type){
    case SET_ALL_CARDS:{
      let subjects = Array.from(action.data.reduce((acc,elem,i)=>{if(!acc.has(elem.category)){acc.add(elem.category)};return acc},new Set()));
      let cards = action.data.filter((e,i)=>!window.localStorage.getItem(e.timestamp));
      //let num = state.cardsAmountOnOnePage*state.currentPage - 1;
      //console.log(num);
      //let cardsCopy = [...action.data];
      /*let newCards = [];
      for(let i = 0; i < action.data.length/state.cardsAmountOnOnePage; i++){
        newCards.push(cardsCopy.splice(0,state.cardsAmountOnOnePage));
      };*/
      //let totalCardsAmount = cardsCopy.length;
      return {...state, cards: action.data, isFetching: false, currentStack: cards.slice(0, state.cardsAmountOnOnePage).map((e,i)=>{
        let date = new Date(e.timestamp);
        let year = date.getFullYear();
        let day = date.getDate();
        let month = date.getMonth();
        let fullDate = `${day<10?0+""+day:day}.${month<9?0+""+(month+1):(month+1)}.${year}`;
        let filesize = (e.filesize/(8*1024)).toFixed(2) + " kB";
        let category = e.category[0].toUpperCase() + e.category.slice(1,e.category.length);
        return {image:e.image, fullDate, filesize, category, timestamp: e.timestamp};
      }), amountOfCards: action.data.length, indexOfLastCards: (state.currentPage*state.cardsAmountOnOnePage) - 1,sortVariants:{...state.sortVariants, bySubject:subjects,byParams:["filesize", "timestamp"]}, originCards: action.data};
    };
    case SET_PAGE:{
      let cards = [];
      if(state.sortVariants.isSubjectSortOn || state.sortVariants.isParamSortOn){
        let page = action.page||state.currentPage;
        let num = state.cardsAmountOnOnePage*page - state.cardsAmountOnOnePage;

        for(let i = num, j = 0; j < state.cardsAmountOnOnePage; i++, j++){
           if(state.sortVariants.sortedCards[i] == undefined){break};
           if(window.localStorage.getItem(state.sortVariants.sortedCards[i].timestamp)){
             j--;
             continue;
           }else{
             cards.push(state.sortVariants.sortedCards[i])
           };
        }
      }else{
      let page = action.page||state.currentPage;
      let num = state.cardsAmountOnOnePage*page - state.cardsAmountOnOnePage;

      for(let i = num, j = 0; j < state.cardsAmountOnOnePage; i++, j++){
         if(state.cards[i] == undefined){break};
         if(window.localStorage.getItem(state.cards[i].timestamp)){
           j--;
           continue;
         }else{
           cards.push(state.cards[i])
         };
      }
    }

      return {...state, currentPage: action.page||state.currentPage, isFetching: false, currentStack: cards.map((e,i)=>{
        let date = new Date(e.timestamp);
        let year = date.getFullYear();
        let day = date.getDate();
        let month = date.getMonth();
        let fullDate = `${Number(day)<10?0+""+day:day}.${month<9?0+""+(month+1):(month+1)}.${year+1}`;
        let filesize = (e.filesize/(8*1024)).toFixed(2) + " kB";
        let category = e.category[0].toUpperCase() + e.category.slice(1,e.category.length);
        return {image:e.image, fullDate, filesize, category , timestamp: e.timestamp};
      })};
    };
    case SET_FETCH:{
      return {...state, isFetching: true};
    };
    case BAN_THE_CARD:{
      window.localStorage.setItem(action.id, "banned");
      return state;
    };
    case UNBAN_ALL:{
      window.localStorage.clear();
      return {...state, bannedCards:[], cards: state.originCards}

    };
    case SORT_BY_SUBJECT:{
      if(!action.subject){return {...state, sortVariants:new SortVars({params:state.sortVariants.byParams, subjects:state.sortVariants.bySubject}).sortVariants}};
      let sorted = state.cards.filter((e,i)=>e.category==action.subject&&!window.localStorage.getItem(e.timestamp)?true:false);
      return {...state, sortVariants:{...state.sortVariants, currentSortSubject: action.subject, isSubjectSortOn: true, sortedCards: sorted },currentPage: 1, amountOfCards: sorted.length}
    };
    case SORT_BY_PARAMS:{
      let sorted;
      function sorter(arr, param){
        let filtered = arr.reduce((acc,e,i)=>{if(!window.localStorage.getItem(e.timestamp)){acc.push(e)};return acc},[])
        return filtered.sort((a,b)=>{return a[param]-b[param]});
      }
      if(state.sortVariants.sortedCards.length == 0){
      sorted = sorter(state.cards, action.param);
   }else{
      sorted = sorter(state.sortVariants.sortedCards, action.param);
   }

      return {...state, sortVariants:{...state.sortVariants, currentSortSubject: action.subject, isParamSortOn: true, sortedCards: sorted},currentPage: 1, amountOfCards:sorted.length}
    };
    case RESET_SORT:{
      return {...state, sortVariants:new SortVars({params:state.sortVariants.byParams, subjects:state.sortVariants.bySubject}).sortVariants, currentPage:1, amountOfCards:state.cards.length}
    };
    case CHANGE_VIEW:{
      let map = new Map();
      state.cards.forEach((e,i)=>{
        if(map.get(e.category)){
          map.set(e.category, map.get(e.category).concat([e]));
        }else{
          map.set(e.category, [e])
        }
      });
      return {...state, view: action.view, treeViewCards: map}
    }
    default:return state;
  }
}

export function changeViewAC(view){
  return {
    type: CHANGE_VIEW,
    view: view
  }
}

export function setPageAC(page){
  return {
     type: SET_PAGE,
     page: page
  }
}

export function setAllCardsAC(data){
  return{
    type: SET_ALL_CARDS,
    data: data,
  }
}

export function setCardsThunk(data){
  return function(dispatch){
    reqs.getCards().then(({data})=>{
      /*let map = new Map();
       for(let i = 0; i < data.length; i++){
         if(map.get(data[i].timestamp)){
           map.set(data[i].timestamp, map.get(data[i].timestamp) + 1)
         }else{
           map.set(data[i].timestamp, 1)
         }
       };
       console.log(map.size);*/
      dispatch(setAllCardsAC(data))}, (err)=>{alert(err?.message || "Не удалось получить данные!")})
  }
}

export function banTheCardAC(id){
   return {
     type: BAN_THE_CARD,
     id: id
   }
}

export function setFetchAC(){
  return {
    type: SET_FETCH
  }
}

export function unbanCards(){
  return {
    type: UNBAN_ALL
  }
}


export function sortBySubjectAC(subject){
  return {
     type: SORT_BY_SUBJECT,
     subject: subject
  }
}

export function sortByParamsAC(param){
  return {
     type: SORT_BY_PARAMS,
     param: param
  }
}

export function unbanCardsThunk(dispatch) {
    dispatch(unbanCards());
    dispatch(setFetchAC());
    setTimeout(()=>{dispatch(setPageAC())},500);
}

export function resetSortAC(){
  return{
    type: RESET_SORT
  }
}

export function resetSortThunk(dispatch){
  dispatch(setFetchAC());
  setTimeout(()=>{dispatch(resetSortAC());dispatch(setPageAC(1))},500);
}

export function sortThunkCreator({param, subject}){
  return function(dispatch){
    if(!param && !subject){return true}
    dispatch(setFetchAC());
    setTimeout(()=>{
      dispatch(sortBySubjectAC(subject))
    if(param){
      dispatch(sortByParamsAC(param))
    };
    dispatch(setPageAC());},500);
  }
}

export function setPageThunk(page){
  return function(dispatch){
     dispatch(setFetchAC());
     setTimeout(()=>{dispatch(setPageAC(page))}, 400);
  }
}


export default cardReducer;
