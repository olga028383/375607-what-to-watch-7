import React from 'react';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import Form from './form/form';

function SingIn() {
  return (
    <div className="user-page">
      <Header className='page-header user-page__head'>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <Form />

      <Footer/>
    </div>
  );
}
export default SingIn;

