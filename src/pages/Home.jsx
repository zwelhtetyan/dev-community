import { Flex } from '@chakra-ui/react';
import React from 'react';
import AllPost from '../components/post/AllPost';
import { useSelector } from 'react-redux';
import HomeMenu from '../components/home/HomeMenu';
import HomeRight from '../components/home/HomeRight';

const Home = () => {
   const {
      transformedData,
      transfromedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   return (
      <Flex
         px={{ base: '0', md: '1rem' }}
         maxW='1280px'
         w='100%'
         pos='relative'
         align='flex-start'
         flex='1'
      >
         {/* home menu */}
         <HomeMenu />

         {/* all post */}
         <AllPost
            transformedData={transformedData}
            loading={loading}
            err={err}
         />

         {/* homeRight */}
         <HomeRight />
      </Flex>
   );
};

export default Home;
