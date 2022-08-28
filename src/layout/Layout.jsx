import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import Footer from './Footer';

const Layout = () => {
   return (
      <>
         <MainNavigation />

         <VStack as='main' minH='calc(100vh - 64px)'>
            <Outlet />

            <Footer />
         </VStack>
      </>
   );
};

export default Layout;
