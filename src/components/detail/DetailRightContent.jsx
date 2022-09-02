import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import UserProfilePopup from '../UserProfilePopup';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import OtherPostItem from '../post/OtherPostItem';

const DetailRightContent = ({
   currentUserProfile,
   otherPosts,
   userId,
   display,
   isDraft,
   m,
   p,
}) => {
   const navigate = useNavigate();

   return (
      <Box
         m={m}
         flex='1'
         ms={{ xl: '1rem' }}
         pos='sticky'
         top='4rem'
         display={display}
      >
         <UserProfilePopup
            w='100%'
            p='1rem'
            contentMb='1rem'
            borderRadius={{ base: '0', md: '5px' }}
            boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
            backgroundHeight='50px'
            background={currentUserProfile.background}
            profile={currentUserProfile.profile}
            name={currentUserProfile.name}
            bio={currentUserProfile.bio}
            work={currentUserProfile.work}
            location={currentUserProfile.location}
            education={currentUserProfile.education}
            joined={currentUserProfile.createdAt}
            userId={userId}
         />

         {otherPosts.length !== 0 && !isDraft && (
            <Box
               borderRadius={{ base: '0', md: '5px' }}
               boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
               mt='1rem'
               overflow='hidden'
               bg='#fafafa'
               py='.5rem'
            >
               <Text fontSize='1.3rem' mb='1rem' fontWeight={600} ms='1rem'>
                  More from{' '}
                  <Text
                     as='span'
                     color='rgb(47 58 178)'
                     cursor='pointer'
                     onClick={() => navigate(`/profile/${userId}`)}
                  >
                     {currentUserProfile.name}
                  </Text>
               </Text>

               {otherPosts.map((postData) => (
                  <OtherPostItem
                     key={nanoid()}
                     title={postData.title}
                     tags={postData.tags}
                     postId={postData.id}
                  />
               ))}
            </Box>
         )}
      </Box>
   );
};

export default DetailRightContent;