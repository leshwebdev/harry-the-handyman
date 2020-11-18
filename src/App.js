import React, { useState, useEffect } from "react";
import { withRouter, Route, Switch, useHistory} from 'react-router-dom'
import { Image } from "react-bootstrap";
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import mainService from "./components/Common/service/mainService";

import Topbar from "./components/Common/cmp/Topbar";
import Home from "./components/Home";
import About from "./components/About";
import Items from "./components/Item/pages/Items";
import ItemDetails from "./components/Item/pages/ItemDetails";
import Projects from "./components/Project/pages/Projects";
import ProjectDetails from "./components/Project/pages/ProjectDetails";
import NewProject from "./components/Project/cmp/NewProject";
import UserProfile from "./components/SignIn/pages/UserProfile";
import ManageUsers from "./components/SignIn/pages/ManageUsers";
import Cart from "./components/Common/pages/Cart";
import Banner from "./components/Common/cmp/Banner";
import "./App.css";

const App = ({ location }) => {
  const currentKey = location.pathname.split('/')[1] || '/'
  const [state, setState] = useState({
    items: [],
    projects: [],
    currUser: '',
    cart: [],
    isSignedIn: false,
    bannerIsShown: false,
    msg: ""
  });
  const history = useHistory();

  useEffect(() => {
    const items = mainService.query('items');
    const projects = mainService.query('projects');
    Promise.all([items, projects])
    .then((values) => setState(state => ({ ...state, items: values[0], projects: values[1] })));
  }, [])

  const signIn = ({username, password}) => {
    setState((state) => ({ ...state, msg:
      <div className="d-flex align-items-center justify-content-around">
        <div>Signing In, Please Wait...</div>
        <div><Image src="./img/common/loader.gif" alt="" /></div>
      </div>,
      bannerIsShown: true }));
    const authUser = mainService.authenticate(username.value, password.value)
    .then(result => {
      if (result === "no such user") {
        setState((state) => ({ ...state, msg: `No Such User. Perhaps you need to sign up ?`, bannerIsShown: true }));
        setTimeout(() => {
          setState((state) => ({ ...state, msg: '', bannerIsShown: false }));
        }, 3000);
      } else if (result === "wrong password") {
        setState((state) => ({ ...state, msg: `Wrong Password...`, bannerIsShown: true }));
        setTimeout(() => {
          setState((state) => ({ ...state, msg: '', bannerIsShown: false }));
        }, 3000);
      } else {
        setState((state) => ({ ...state, currUser: result, isSignedIn: true, msg: '', bannerIsShown: false }));
        setTimeout(() => {
          history.push("/projects")
        }, 3000);
      }
    });
    return authUser
  }

  const signUp = (details) => {
    const {fullName: { value: fullNameVal }, username: {value: usernameVal}, password: {value: passwordVal}, email: {value: emailVal}} = details;
    const newUser = {fullName: fullNameVal, username: usernameVal, password: passwordVal, email: emailVal}
    mainService.save("users", newUser)
    .then((result) => {
      const initialSignIn = {username: {value: result.username}, password: {value: result.password}}
      setTimeout(() => {
        signIn(initialSignIn)
      }, 4000);
      ;
    });
  }

  const signOut = () => {
    setState((state) => ({ ...state, msg: 
      <div className="d-flex align-items-center justify-content-around">
        <div>See You Soon, {state.currUser.fullName.split(' ').shift()}</div>
      </div>,
      bannerIsShown: true }));
      history.push("/")
    setTimeout(() => {
      setState((state) => ({ ...state, msg: '', isSignedIn: false, currUser: null, bannerIsShown: false }));
    }, 3000);
  }

  const addToCart = async (item) => {
    const itemId = item.id;
    const updatedCart = (state.currUser.cart.length > 0) ? state.currUser.cart : [];
    const idxOfItemInCart = updatedCart.findIndex(item => item.hasOwnProperty(itemId))
    if (idxOfItemInCart !== -1) {
      updatedCart[idxOfItemInCart][itemId]++;
    } else {
      updatedCart.push({[itemId] : 1});
    }
    await setState((state) => ({ ...state, currUser: {...state.currUser, cart: updatedCart}}));
    mainService.save('users', state.currUser) ;
    const updatedItem = {...item};
    updatedItem.quantity--;
    mainService.save('items', updatedItem)
    .then((res) => reloadFromDB('items'))
    .then((result) => result);
  }

  const removeFromCart = async (item) => {
    const itemId = item.id;
    const updatedCart = state.currUser.cart;
    const idxOfItemInCart = updatedCart.findIndex(item => item.hasOwnProperty(itemId))
    updatedCart[idxOfItemInCart][itemId]--;
    if (updatedCart[idxOfItemInCart][itemId] === 0) {
      updatedCart.splice(idxOfItemInCart,1);
    }
    await setState((state) => ({ ...state, currUser: {...state.currUser, cart: updatedCart}}));
    mainService.save('users', state.currUser);
    const updatedItem = {...item};
    updatedItem.quantity++;
    mainService.save('items', updatedItem)
    .then((res) => reloadFromDB('items'))
    .then((result) => result);
  }
  

  const addThing = (param, details) => {
    if (details) {
      const {projName: { value: nameVal }, projDesc: {value: descVal}, projInst: {value: instVal}, qty: {value: qtyVal}, img: {value: imgVal}, necItems: {value: necItemsVal}} = details;
      const newProj = {name: nameVal, description: descVal, instructions: instVal, quantity: qtyVal, imgUrl: imgVal, necItemIds: necItemsVal }
      mainService.save("projects", newProj)
      .then((res) => reloadFromDB(param))
      .then((result) => history.go(-1));
    } else {console.log('haha!')}
  }

  const toggleFavProj = async (projId) => {
    const updatedUser = {...state.currUser};
    if (state.currUser.favProjects.includes(projId)) {
      updatedUser.favProjects = await updatedUser.favProjects.filter(proj => proj !== projId);
      // console.log(updatedUser); // WHY IS THIS NOT UPDATING THE STATE OF THE PROJECT DETAILS !??!?!?
      setState((state) => ({ ...state, currUser: updatedUser}))
    } else {
      updatedUser.favProjects.push(projId);
      setState((state) => ({ ...state, currUser: updatedUser}))
    }
    mainService.save('users', updatedUser)
    .then((result) => {
      console.log('done...');
  })
  }

  const deleteThing = (param, id) => {
    if (id) {
      if (param === "users") {
        mainService.remove(param, id)
        .then((result) => result);  
      } else {
        mainService.remove(param, id)
        .then((res) => reloadFromDB(param))
        .then((result) => history.go(-1));
      }
    } else {console.log('haha!')}
  }

  const reloadFromDB = (param) => {
    mainService.query(param)
    .then((result) => setState(state => ({ ...state, [param]: result })));
  }

  const bannerHide = () => setState((state) => ({ ...state, bannerIsShown : false }));
  const bannerShow = () => setState((state) => ({ ...state, bannerIsShown : true }));

  return (
    <div className="App flex col">
      <Topbar loggedIn={state.isSignedIn} currUser={state.currUser} onSignOut={signOut} />
      <Banner isBannerShown={state.bannerIsShown} onShowBanner={bannerShow} onHideBanner={bannerHide} txt={state.msg} />
      <TransitionGroup>
        <CSSTransition key={currentKey} classNames="fade" timeout={{ enter: 500, exit: 500 }} appear>
          <Switch location={location}>
            {/* sending functions via this "render" method seems to be activating these function when navigating to the page...*/}
            {/* if i use the below "render" method, the "Link" in the Projects doesn't pass the State params to the ProjectDetails page... */}
            <Route exact path="/" render={() => (<Home isSignedIn={state.isSignedIn} currUser={state.currUser} onSignIn={signIn} onSignUp={signUp}/>)} /> 
            <Route exact path="/profile" render={() => (<UserProfile isSignedIn={state.isSignedIn} currUser={state.currUser}/>)} /> 
            <Route exact path='/projects' render={() => (<Projects projects={state.projects} isSignedIn={state.isSignedIn} currUser={state.currUser} items={state.items} onAddThing={addThing} onToggleFavProj={toggleFavProj} onDeleteThing={deleteThing}/>)} />
            <Route exact path="/projects/:id" component={ProjectDetails} />
            <Route exact path="/newproject/" render={() => (<NewProject onAddThing={addThing} items={state.items}/>)} /> 
            <Route exact path='/items' render={() => (<Items items={state.items} onAddToCart={addToCart}/>)} />
            <Route exact path="/items/:id" component={ItemDetails} />
            <Route exact path="/about" component={About} />
            <Route exact path="/mngusers" component={ManageUsers} />
            <Route exact path="/cart" render={() => (<Cart items={state.currUser.cart} onRemoveFromCart={removeFromCart} />)} />
            {/* <Route exact path="/checkout" render={() => (<Checkout items={state.currUser.cart} />)} /> */}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default withRouter(App)
