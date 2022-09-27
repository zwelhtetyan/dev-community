import { Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { Link } from 'react-router-dom';
import {
   calcTotalDiscussion,
   calculateReaction,
} from '../../helper/calculateTotal';
import { titleRoute } from '../../helper/titleRoute';

const Item = styled(Link)`
   display: block;
   padding: 0.5rem 1rem;

   &:hover {
      background: white;
      p:first-of-type {
         color: rgb(47 58 178);
      }
   }
`;

const TopPostItem = ({ route, title, commentCount }) => {
   return (
      <Item to={route}>
         <Box>
            <Text mb={1}>{title}</Text>
            <Text fontSize='14px' color='#717171'>
               {commentCount} comments
            </Text>
         </Box>
      </Item>
   );
};

const HomeRightCard = ({ tagName, transformedData }) => {
   let allPostData = [];
   if (transformedData) {
      allPostData = transformedData.filter(
         (postData) =>
            !postData.draft &&
            postData.tags.length &&
            postData.tags.find((tag) => tag.tagName === tagName)
      );
   }

   const currentPosts = allPostData
      ?.sort(
         (a, b) =>
            calculateReaction(b.heart, b.unicorn, b.saved) -
            calculateReaction(a.heart, a.unicorn, a.saved)
      )
      .slice(0, 3);

   return (
      <Box
         boxShadow='0 0 0 1px rgb(23 23 23 / 5%)'
         bg='#FAFAFA'
         borderRadius='5px'
         mb={3}
         overflow='hidden'
      >
         <Text fontSize='19px' fontWeight={700} mb={3} padding='1rem 1rem 0'>
            #{tagName}
         </Text>

         <Box>
            {currentPosts.map((topPost) => (
               <TopPostItem
                  key={nanoid()}
                  route={`/${titleRoute(
                     topPost.name,
                     topPost.title,
                     topPost.id
                  )}`}
                  title={topPost.title}
                  commentCount={calcTotalDiscussion(topPost.comments)}
               />
            ))}
         </Box>
      </Box>
   );
};

export default HomeRightCard;
