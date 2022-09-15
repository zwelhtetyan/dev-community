import { Box, Heading, Image, Wrap, WrapItem } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { useSelector } from 'react-redux';
import converter from '../../helper/converter';
import { htmlToJsx } from '../../helper/htmlToJsx';
import LangTag from '../../utils/LangTag';
import NoTitleMessage from '../../utils/NoTitleMessage';
import '../../styles/postdetail.scss';

const PostPreview = () => {
   const { cvImg, title, tags, MDEValue } = useSelector(
      (state) => state.postData
   );

   return (
      <Box
         h={{ base: 'calc(100vh - 125px)', md: 'calc(100vh - 150px)' }}
         overflowY='auto'
         fontFamily='monospace'
         fontSize={{ base: '1rem', sm: '1.1rem' }}
         className='mde-preview'
      >
         {cvImg && (
            <Image
               src={cvImg}
               alt='cover_image'
               w='100%'
               maxH='300px'
               objectFit='cover'
            />
         )}

         {title ? (
            <Heading my={2} color='rgb(23 23 23)'>
               {title}
            </Heading>
         ) : (
            <NoTitleMessage />
         )}

         <Wrap py={2} spacing={2} fontFamily='sans-serif'>
            {tags.map((tag) => (
               <WrapItem key={nanoid()}>
                  <LangTag tag={tag} />
               </WrapItem>
            ))}
         </Wrap>

         <Box
            className='mde-preview-content'
            fontSize={['16px', '17px', '19px']}
         >
            {htmlToJsx(converter().makeHtml(MDEValue))}
         </Box>
      </Box>
   );
};

export default PostPreview;