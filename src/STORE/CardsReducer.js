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
     amountOfPages: 0,
     isSorted: false,
     exchange_cards_index:0,
     sortVariants:{
       bySubject:[],
       byParams:[]
     }
}

function cardReducer(state = initialState, action){
  switch(action.type){
    case SET_ALL_CARDS:{
      let subjects = Array.from(action.data.reduce((acc,elem,i)=>{if(!acc.has(elem.category)){acc.add(elem.category)};return acc},new Set()));
      let cards = action.data.filter((e,i)=>!window.localStorage.getItem(e.timestamp));
      let amountOfPages = Math.ceil(cards.length/state.cardsAmountOnOnePage);
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
      }), amountOfCards: action.data.length, indexOfLastCards: (state.currentPage*state.cardsAmountOnOnePage) - 1,sortVariants:{...state.sortVariants, bySubject:subjects,byParams:["filesize", "timestamp"]}, originCards: action.data, amountOfPages};
    };
    case SET_PAGE:{
      let cards = [];
      if(state.isSorted){
        let page = action.page||state.currentPage;
        let num = state.cardsAmountOnOnePage*page - state.cardsAmountOnOnePage;
        let newSortedCards = state.sortedCards.filter((e,i)=>window.localStorage.getItem(e.timestamp)?false:true)
        for(let i = num, j = 0; j < state.cardsAmountOnOnePage; i++, j++){
           if(newSortedCards[i] === undefined){break};
           if(window.localStorage.getItem(newSortedCards[i].timestamp)){
             console.log("banned");
             j--;
             continue;
           }else{
             cards.push(newSortedCards[i])
           };
        }
      }else{
      let page = action.page||state.currentPage;
      let num = state.cardsAmountOnOnePage*page - state.cardsAmountOnOnePage;
      let newCards = state.cards.filter((e,i)=>window.localStorage.getItem(e.timestamp)?false:true);
      for(let i = num, j = 0; j < state.cardsAmountOnOnePage; i++, j++){
         if(newCards[i] === undefined){break};
         if(window.localStorage.getItem(newCards[i].timestamp)){
           j--;
           continue;
         }else{
           cards.push(newCards[i])
         };
      }
    }

      return {...state,exchange_cards_index:0, currentPage: action.page||state.currentPage, isFetching: false, currentStack: cards.map((e,i)=>{
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
    case SET_FETCH:
      return {...state, isFetching: true};
    case BAN_THE_CARD:{
      window.localStorage.setItem(action.id, "banned");
      //let stack = state.currentStack.filter((e,i)=>{if(e.timestamp == action.id){return false};return true});
      let pages = Math.ceil((state.amountOfCards - 1)/state.cardsAmountOnOnePage);

      /*let stack = [...state.currentStack];
      let index = null;
      for(let i=0; i < stack.length; i++){
        if(stack[i].timestamp === action.id){
          index = i;
        }
      }
      let exchange_cards_index = state.exchange_cards_index + (state.cardsAmountOnOnePage*state.currentPage);
      stack.splice(index,1,state.isSorted?state?.sortedCards?.[exchange_cards_index]:state?.cards?.[exchange_cards_index]);
      exchange_cards_index = state.exchange_cards_index + 1;*/
      return {...state, amountOfCards:state.amountOfCards - 1, amountOfPages: pages};
    };
    case UNBAN_ALL:{
      window.localStorage.clear();
      let amountOfCards = state.originCards.length;
      let amountOfPages = amountOfCards/state.cardsAmountOnOnePage;
      return {...state, cards: state.originCards, amountOfCards, amountOfPages}

    };
    case SORT_BY_SUBJECT:{
      let sortedCards = state.cards.reduce((acc,el,i)=>{if(el.category === action.subject){acc.unshift(el)}else{acc.push(el)};return acc},[])
      return {...state, sortedCards ,currentPage: 1, isSorted: true}
    };
    case SORT_BY_PARAMS:{
      let sorted;
      function sorter(arr, param){
        let filtered = arr.reduce((acc,e,i)=>{if(!window.localStorage.getItem(e.timestamp)){acc.push(e)};return acc},[])
        return filtered.sort((a,b)=>{return a[param]-b[param]});
      }
      sorted = sorter(state.cards, action.param);

      return {...state,currentPage: 1,sortedCards: sorted, isSorted: true}
    };
    case RESET_SORT:
      return {...state, currentPage:1, isSorted: false}
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

export function sortThunkCreator(param){
  return function(dispatch){
    if(!param){return true};
    dispatch(setFetchAC());
    if(param==="timestamp" || param==="filesize"){
      setTimeout(()=>{dispatch(sortByParamsAC(param));dispatch(setPageAC())},200);
    }else{
      setTimeout(()=>{dispatch(sortBySubjectAC(param));;dispatch(setPageAC())},200);
    }

  }
}

export function setPageThunk(page){
  return function(dispatch){
     dispatch(setFetchAC());
     setTimeout(()=>{dispatch(setPageAC(page))}, 400);
  }
}

export function banTheCardThunk(id,page){
  return function(dispatch){
    dispatch(banTheCardAC(id));
    dispatch(setPageAC(page));
  }
}

export default cardReducer;
