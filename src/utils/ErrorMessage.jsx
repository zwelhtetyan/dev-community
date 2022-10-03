import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { TbWifiOff } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { PrimaryBtn } from './Buttons';

const ErrorMessage = ({ offline, urlNotFound }) => {
   const reload = () => window.location.reload();

   const navigate = useNavigate();

   return (
      <VStack justify='center' flex='1' fontSize={['16px', '17px']} py='7rem'>
         {offline && (
            <VStack>
               <HStack m='auto'>
                  <TbWifiOff size={22} />
                  <Text letterSpacing='1px'>No internet connection !</Text>
               </HStack>
               <PrimaryBtn onClick={reload}>Try again</PrimaryBtn>
            </VStack>
         )}

         {urlNotFound && (
            <VStack>
               <Text>something's wrong !</Text>
               <Text>we're having issue fetching your data 😟</Text>
               <Text
                  fontSize='15px'
                  color='light.primary'
                  _hover={{ color: 'rgb(103 115 237 / 91%)' }}
                  cursor='pointer'
                  mt='1rem !important'
                  onClick={() => navigate('/')}
               >
                  Back to home
               </Text>
            </VStack>
         )}
      </VStack>
   );
};

export default ErrorMessage;
