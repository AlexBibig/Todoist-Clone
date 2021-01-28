import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  createTodo,
  showModal,
  closeModal,
  showNav,
  closeNav,
} from '../../redux/actions/actions';

import './App.scss';
import Header from '../Header';
import Nav from '../Nav';
import Main from '../../pages/Main';
import All from '../../pages/All';
import Today from '../../pages/Today';
import Upcoming from '../../pages/Upcoming';
import Modal from '../Modal';
import Login from '../Login';
import Register from '../Register';
import { todosData } from '../../persistance/network';

require('dotenv').config();

export const { REACT_APP_USER_ID, REACT_APP_BASE_URL } = process.env;

function App(props) {
  const {
    todos,
    createTodo,
    modalClassName,
    navClassName,
    showModal,
    closeModal,
    showNav,
    closeNav,
  } = props;

  useEffect(() => {
    const getDB = async () => {
      try {
        const res = await todosData.get();
        console.log('todos', res);
        const prevTodos = res || [];
        prevTodos.forEach((el) => createTodo(el));
      } catch (e) {
        console.log(e.message);
      }
    };
    getDB();
  }, [createTodo]);

  const groupProps = {
    appear: true,
    enter: true,
    exit: true,
  };

  const getToday = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return (today = `${yyyy}-${mm}-${dd}`);
  };

  return (
    <React.Fragment>
      <BrowserRouter>
        <div className='App'>
          <Header showNav={showNav} showModal={showModal} />
          <Nav navClassName={navClassName} closeNav={closeNav} />
          <Modal
            modalClassName={modalClassName}
            closeModal={closeModal}
            getToday={getToday}
          />
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route path='/all'>
              <All todos={todos} groupProps={groupProps} />
            </Route>
            <Route path='/today'>
              <Today todos={todos} getToday={getToday} />
            </Route>
            <Route path='/upcoming'>
              <Upcoming todos={todos} getToday={getToday} />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
      <div className='overlay'></div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.todos,
    modalClassName:
      state.domElementsClassNames.domElementsClassNames.modal,
    navClassName:
      state.domElementsClassNames.domElementsClassNames.nav,
  };
};

const mapDispatchToProps = {
  createTodo,
  showModal,
  closeModal,
  showNav,
  closeNav,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
