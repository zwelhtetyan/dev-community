import React from 'react';
import {
   Box,
   Divider,
   Flex,
   Heading,
   HStack,
   Image,
   Text,
   Wrap,
   WrapItem,
} from '@chakra-ui/react';
import CustomAvatar from '../../utils/CustomAvatar';
import ManangePost from './ManangePost';
import { nanoid } from 'nanoid';
import LangTag from '../../utils/LangTag';
import { htmlToJsx } from '../../helper/htmlToJsx';
import converter from '../../helper/converter';
import Discussion from '../discussion/Discussion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import AllComment from '../comment/AllComment';
import { dateFormat } from '../../helper/calcTimestamp';

const MainContent = ({ postDetail }) => {
   const navigate = useNavigate();

   const user = useAuth();

   const isAuthor = user?.userId === postDetail?.userId;

   let showEditedDate;
   if (postDetail.updatedAt) {
      const reg = /\d+/;
      const postedDate = dateFormat(postDetail?.createdAt);
      const editedDate = dateFormat(postDetail?.updatedAt);
      showEditedDate = postedDate.match(reg)[0] < editedDate.match(reg)[0];
   }

   return (
      <Box
         m={{ base: '0', md: '1px' }}
         bg='white'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         borderRadius={{ base: '0', md: '5px' }}
      >
         {/* coverImgae */}
         {postDetail.cvImg && (
            <Image
               src={postDetail.cvImg}
               alt='cover_image'
               maxH='300px'
               width='100%'
               borderTopLeftRadius={{ base: 'none', md: '5px' }}
               borderTopRightRadius={{ base: 'none', md: '5px' }}
               objectFit='cover'
            />
         )}

         {/* content */}
         <Box px={{ base: '.7rem', md: '2.5rem' }} pb='1rem' pt={3}>
            <Box className='mde-preview'>
               <Flex
                  align='center'
                  justify='space-between'
                  gap='.5rem'
                  wrap='wrap-reverse'
               >
                  <HStack align='flex-start'>
                     <CustomAvatar
                        profile={postDetail.profile}
                        size='40px'
                        onClick={() =>
                           navigate(`/profile/${postDetail.userId}`)
                        }
                     />

                     <Box flex='1' pt='3px'>
                        <Text
                           fontWeight={600}
                           cursor='pointer'
                           lineHeight={1}
                           _hover={{ color: 'rgb(47 58 178)' }}
                           onClick={() =>
                              navigate(`/profile/${postDetail.userId}`)
                           }
                        >
                           {postDetail.name}
                        </Text>

                        {postDetail.draft && (
                           <Text
                              bg='#FCD34D'
                              px='5px'
                              fontSize='12px'
                              rounded='sm'
                              display='inline-block'
                           >
                              Draft
                           </Text>
                        )}

                        {postDetail.createdAt && (
                           <Text fontSize='12px' color='#717171'>
                              Posted on {dateFormat(postDetail.createdAt)}{' '}
                              {postDetail.updatedAt && (
                                 <Text as='span'>
                                    {showEditedDate
                                       ? `• Updated on ${dateFormat(
                                            postDetail.updatedAt
                                         )}`
                                       : '• updated'}
                                 </Text>
                              )}
                           </Text>
                        )}
                     </Box>
                  </HStack>

                  {/* manage post */}
                  {isAuthor && postDetail && (
                     <ManangePost postId={postDetail.id} m='0 0 0 auto' />
                  )}
               </Flex>

               <Heading mt={2}>{postDetail.title}</Heading>

               <Wrap py={2} spacing={2}>
                  {postDetail.tags.map((tag) => (
                     <WrapItem key={nanoid()}>
                        <LangTag tag={tag} />
                     </WrapItem>
                  ))}
               </Wrap>

               <Box
                  className='mde-preview-content'
                  fontSize={['16px', '17px', '19px']}
                  fontFamily='monospace'
               >
                  {htmlToJsx(converter().makeHtml(postDetail.MDEValue))}
               </Box>

               <Divider mt={7} h='1px' background='#efefef' mx='auto' />

               {!postDetail.draft && (
                  <Discussion
                     postId={postDetail.id}
                     comments={postDetail.comments}
                  />
               )}

               <AllComment postDetail={postDetail} />
            </Box>
         </Box>
      </Box>
   );
};

export default MainContent;
