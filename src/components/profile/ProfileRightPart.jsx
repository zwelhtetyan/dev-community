import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../context/auth';
import {
   calcTotalDiscussion,
   calculateReaction,
} from '../../helper/calculateTotal';
import PostItem from '../post/PostItem';
import { BsFillPinAngleFill } from 'react-icons/bs';
import { PrimaryBtn } from '../../utils/Buttons';

const ProfileRightPart = ({ pinnedPosts, otherPosts, setAlreadyInProfile }) => {
   const user = useAuth();
   const userId = user?.userId;

   return (
      <Box
         flex={{ base: 'unset', md: '2' }}
         borderRadius='5px'
         w={{ base: '100%' }}
      >
         {pinnedPosts && pinnedPosts.length !== 0 && (
            <Box
               border='2px solid rgb(59 73 223)'
               borderRadius='5px'
               mb='.5rem'
               p={{ base: '.7rem .7rem .3rem', md: '1rem 1rem .5rem' }}
            >
               <Box as='header'>
                  <PrimaryBtn
                     bg='rgb(59 73 223)'
                     m={{ base: '-2rem 0 0 0', md: '-2.5rem 0 0' }}
                  >
                     <BsFillPinAngleFill size={20} />
                     <Text fontWeight={700} ms='.5rem'>
                        Pinned
                     </Text>
                  </PrimaryBtn>
               </Box>

               {pinnedPosts.map((postData) => (
                  <PostItem
                     key={postData.id}
                     name={postData.name}
                     profile={postData.profile}
                     id={postData.id}
                     createdAt={postData.createdAt}
                     title={postData.title}
                     tags={postData.tags}
                     readTime={postData.readTime}
                     isUpdated={postData?.updated}
                     userId={postData.userId}
                     currentUserId={userId} // authenticated userId
                     setAlreadyInProfile={setAlreadyInProfile}
                     totalDiscussion={calcTotalDiscussion(postData.comments)}
                     totalReaction={calculateReaction(
                        postData.heart,
                        postData.unicorn,
                        postData.saved
                     )}
                     baseRadius='5px'
                  />
               ))}
            </Box>
         )}

         {otherPosts &&
            otherPosts.map((postData) => (
               <PostItem
                  key={postData.id}
                  name={postData.name}
                  profile={postData.profile}
                  id={postData.id}
                  createdAt={postData.createdAt}
                  title={postData.title}
                  tags={postData.tags}
                  readTime={postData.readTime}
                  isUpdated={postData?.updated}
                  userId={postData.userId}
                  currentUserId={userId} // authenticated userId
                  setAlreadyInProfile={setAlreadyInProfile}
                  totalDiscussion={calcTotalDiscussion(postData.comments)}
                  totalReaction={calculateReaction(
                     postData.heart,
                     postData.unicorn,
                     postData.saved
                  )}
               />
            ))}
      </Box>
   );
};

export default ProfileRightPart;
