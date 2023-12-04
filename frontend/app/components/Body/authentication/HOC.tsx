import React from 'react';
import { useAuth } from './AuthContext';
import DummyLogin from '../../../login/page';

const withAuthProtection = (WrappedComponent) => {
  return function ProtectedComponent(props) {
    const { user } = useAuth();

    if (!user) {
      return <DummyLogin />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuthProtection;
