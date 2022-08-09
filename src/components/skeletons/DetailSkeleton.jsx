import {
   Box,
   HStack,
   Skeleton,
   SkeletonCircle,
   SkeletonText,
} from '@chakra-ui/react';
import React from 'react';

const DetailSkeleton = () => {
   return (
      <Box bg='transparent' pt={5} my='3rem' mx='.5rem'>
         <HStack>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={2} spacing='2' w='30%' />
         </HStack>
         <Skeleton h='35px' mt={3} />
      </Box>
   );
};

export default DetailSkeleton;
